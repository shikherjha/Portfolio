import asyncio
import os
import re
import json
import time
import logging
from typing import Dict, Any, List
from urllib.parse import urlparse
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

import psycopg2
from psycopg2.extras import RealDictCursor

load_dotenv()
logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Portfolio Backend - CP Stats")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")

# Railway Postgres is the source of truth. Locally, prefer DATABASE_PUBLIC_URL
# because Railway's private DATABASE_URL host is only reachable inside Railway.
IS_RAILWAY = bool(os.getenv("RAILWAY_ENVIRONMENT") or os.getenv("RAILWAY_PROJECT_ID"))
def clean_db_url(value: str):
    if not value or "${{" in value or "}" in value:
        return None
    parsed = urlparse(value)
    if parsed.scheme not in {"postgresql", "postgres"} or not parsed.hostname:
        return None
    try:
        _ = parsed.port
    except ValueError:
        return None
    return value

DB_CANDIDATES = (
    [os.getenv("DATABASE_URL"), os.getenv("DATABASE_PUBLIC_URL")]
    if IS_RAILWAY
    else [os.getenv("DATABASE_PUBLIC_URL"), os.getenv("DATABASE_URL")]
)
DB_URL = next((url for url in (clean_db_url(candidate) for candidate in DB_CANDIDATES) if url), None)
CRON_SECRET = os.getenv("CRON_SECRET")

ACCOUNTS = {
    "Codeforces": {"main": "jhashikher", "alt": "jhasahab1906"},
    "LeetCode":   {"main": "jhashikher", "alt": "FAewksklrK"},
    "CodeChef":   {"main": "jha_sahab_19", "alt": "gleam_web_27"},
    "AtCoder":    {"main": "JhaSahab", "alt": None},
    "GFG":        {"main": "jhasahaxwr9", "alt": None}
}

# Profile scrapers are useful, but CP sites often block/timeout. These floors
# keep the portfolio honest to your known totals instead of displaying a lower
# number just because GFG/AtCoder/LeetCode blocked a fetch.
SOLVED_FLOORS = {
    "main": int(os.getenv("SOLVED_FLOOR_MAIN", "0")),
    "alt": int(os.getenv("SOLVED_FLOOR_ALT", "0")),
}

REQUEST_HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; ShikherPortfolio/1.0; +https://github.com/shikherjha)"
}

def get_db_connection():
    if not DB_URL:
        return None
    try:
        conn = psycopg2.connect(DB_URL)
        return conn
    except Exception as e:
        logging.error(f"DB connection failed: {e}")
        return None
        
def init_db():
    conn = get_db_connection()
    if conn:
        try:
            with conn.cursor() as cur:
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS cp_stats_cache (
                        account_view VARCHAR(50) PRIMARY KEY,
                        payload JSONB NOT NULL,
                        status VARCHAR(20) NOT NULL DEFAULT 'ok',
                        error TEXT,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                """)
                cur.execute("ALTER TABLE cp_stats_cache ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'ok';")
                cur.execute("ALTER TABLE cp_stats_cache ADD COLUMN IF NOT EXISTS error TEXT;")
            conn.commit()
        except Exception as e:
            logging.error(f"DB Init error: {e}")
        finally:
            conn.close()

init_db()

def rating_to_score(rating: int, platform: str) -> str:
    if rating <= 0: return "N/A"
    targets = {"Codeforces": 2800, "LeetCode": 2800, "AtCoder": 2400, "CodeChef": 2800}
    target = targets.get(platform, 3000)
    score = int((rating / target) * 100)
    return str(min(99, max(30, score))) + "%"

def cf_api_call(method: str, params: dict) -> Dict:
    try:
        query_string = "&".join(f"{k}={v}" for k, v in params.items())
        res = requests.get(f"https://codeforces.com/api/{method}?{query_string}", timeout=15, headers=REQUEST_HEADERS)
        return res.json()
    except Exception as e:
        logging.error(f"CF Error {method}: {e}")
        return {}

def fetch_codeforces(handle: str) -> Dict:
    if not handle: return {"rating": 0, "solved": 0, "contests": 0, "max_rating": 0, "changes": [], "badge": "", "latest_contest": None}
    info = cf_api_call("user.info", {"handles": handle})
    rating = 0
    max_rating = 0
    if "result" in info and len(info["result"]) > 0:
        rating = info["result"][0].get("rating", 0)
        max_rating = info["result"][0].get("maxRating", 0)
        
    rating_history = cf_api_call("user.rating", {"handle": handle})
    changes = []
    contests = 0
    latest_contest = None
    if "result" in rating_history and isinstance(rating_history["result"], list) and len(rating_history["result"]) > 0:
        contests = len(rating_history["result"])
        for r in rating_history["result"][-5:]:
            diff = r["newRating"] - r["oldRating"]
            changes.append(f"+{diff}" if diff > 0 else str(diff))
            
        r_last = rating_history["result"][-1]
        diff_last = r_last["newRating"] - r_last["oldRating"]
        latest_contest = {
            "name": r_last.get("contestName", "Codeforces Round"),
            "rank": str(r_last.get("rank", "N/A")),
            "delta": f"+{diff_last}" if diff_last > 0 else str(diff_last),
            "date": "recently",
            "color": "text-amber-500",
            "ts": r_last.get("ratingUpdateTimeSeconds", 0)
        }
            
    solved = 0
    try:
        subs = cf_api_call("user.status", {"handle": handle})
        if "result" in subs and isinstance(subs["result"], list):
            ac = {sub["problem"]["name"] for sub in subs["result"] if sub.get("verdict") == "OK"}
            solved = len(ac)
    except Exception:
        pass
        
    return {
        "rating": rating, 
        "max_rating": max_rating,
        "solved": solved, 
        "contests": contests,
        "changes": changes,
        "badge": "Expert" if rating >= 1600 else "Specialist" if rating >= 1400 else "Pupil" if rating > 0 else "Newbie",
        "latest_contest": latest_contest
    }

def fetch_leetcode(handle: str) -> Dict:
    if not handle: return {"rating": 0, "solved": 0, "contests": 0, "max_rating": 0, "changes": [], "badge": "", "latest_contest": None}
    url = "https://leetcode.com/graphql"
    
    solved = 0
    try:
        q1 = {"query": "query getUserProfile($username: String!) { matchedUser(username: $username) { submitStats { acSubmissionNum { count difficulty } } } }", "variables": {"username": handle}}
        r1 = requests.post(url, json=q1, timeout=15, headers=REQUEST_HEADERS).json()
        ac = r1.get("data", {}).get("matchedUser", {}).get("submitStats", {}).get("acSubmissionNum", [])
        if ac: solved = ac[0].get("count", 0)
    except: pass

    rating = 0
    contests = 0
    changes = []
    badge = "Knight"
    latest_contest = None
    try:
        q2 = {"query": "query userContestRankingInfo($username: String!) { userContestRanking(username: $username) { rating topPercentage badge { name } } userContestRankingHistory(username: $username) { rating contest { title startTime } } }", "variables": {"username": handle}}
        r2 = requests.post(url, json=q2, timeout=15, headers=REQUEST_HEADERS).json()
        db = r2.get("data", {})
        cr = db.get("userContestRanking")
        if cr:
            rating = int(cr.get("rating", 0))
            if cr.get("badge"): badge = cr["badge"]["name"]
            
        hist = db.get("userContestRankingHistory") or []
        hist = [h for h in hist if h.get("attended", True) or h.get("rating", 0) > 0]
        if hist:
            contests = len(hist)
            last_few = hist[-6:]
            for i in range(1, len(last_few)):
                diff = int(last_few[i]["rating"] - last_few[i-1]["rating"])
                changes.append(f"+{diff}" if diff > 0 else str(diff))
            
            last_event = hist[-1]
            if len(hist) > 1:
                diff_last = int(hist[-1]["rating"] - hist[-2]["rating"])
            else:
                diff_last = 0
            latest_contest = {
                "name": last_event.get("contest", {}).get("title", "LeetCode Contest"),
                "rank": "Rank Hidden",
                "delta": f"+{diff_last}" if diff_last > 0 else str(diff_last),
                "date": "recently",
                "color": "text-emerald-500",
                "ts": last_event.get("contest", {}).get("startTime", 0)
            }
    except Exception as e:
        logging.error(f"LC error {e}")
        
    return {
        "rating": rating,
        "max_rating": rating,
        "solved": solved,
        "contests": contests,
        "changes": changes[-5:],
        "badge": badge,
        "latest_contest": latest_contest
    }

def fetch_codechef(handle: str) -> Dict:
    if not handle: return {"rating": 0, "solved": 0, "contests": 0, "max_rating": 0, "changes": [], "badge": "", "latest_contest": None}
    try:
        res = requests.get(f"https://www.codechef.com/users/{handle}", timeout=15, headers=REQUEST_HEADERS)
        soup = BeautifulSoup(res.text, "html.parser")
        
        rating_div = soup.find('div', class_='rating-number')
        rating = int(rating_div.text.split('?')[0].strip()) if rating_div else 0
        
        solved = 0
        solved_h5 = soup.find("h5", string=lambda t: t and 'Fully Solved' in t)
        if solved_h5:
            m = re.search(r'\d+', solved_h5.text)
            if m: solved = int(m.group())
            
        badge_div = soup.find('span', class_='rating')
        badge = badge_div.text if badge_div else "1 Star"
        
        contests = 0
        changes = []
        max_rating = rating
        latest_contest = None
        match = re.search(r'var all_rating = (\[.*?\]);', res.text)
        if match:
            hist = json.loads(match.group(1))
            contests = len(hist)
            for h in hist:
                if int(h["rating"]) > max_rating: max_rating = int(h["rating"])
            # CC does not explicitly supply "old rating" matching directly for easy diffing, skipping delta logic
            if contests > 0:
                last_event = hist[-1]
                latest_contest = {
                    "name": last_event.get("name", "CodeChef Round"),
                    "rank": str(last_event.get("rank", "N/A")),
                    "delta": last_event.get("rating", ""),
                    "date": f"{last_event.get('getmonth','')} {last_event.get('getyear','')}",
                    "color": "text-purple-500",
                    "ts": time.time()
                }

        return {
            "rating": rating,
            "max_rating": max_rating,
            "solved": solved,
            "contests": contests,
            "changes": [],
            "badge": badge,
            "latest_contest": latest_contest
        }
    except Exception as e:
        logging.error(f"CC error {e}")
        return {"rating": 0, "solved": 0, "contests": 0, "max_rating": 0, "changes": [], "badge": "", "latest_contest": None}

def fetch_atcoder(handle: str) -> Dict:
    if not handle: return {"rating": 0, "solved": 0, "contests": 0, "max_rating": 0, "changes": [], "badge": "", "latest_contest": None}
    rating = 0
    max_rating = 0
    contests = 0
    changes = []
    latest_contest = None
    solved = 0

    try:
        hist = requests.get(
            f"https://atcoder.jp/users/{handle}/history/json",
            timeout=20,
            headers=REQUEST_HEADERS
        ).json()
        if isinstance(hist, list) and len(hist) > 0:
            contests = len(hist)
            rating = int(hist[-1].get("NewRating", 0))
            max_rating = max([int(h.get("NewRating", 0)) for h in hist])
            for i in range(max(1, len(hist)-5), len(hist)):
                diff = int(hist[i].get("NewRating", 0)) - int(hist[i-1].get("NewRating", 0))
                changes.append(f"+{diff}" if diff > 0 else str(diff))
                
            last_event = hist[-1]
            diff_last = int(last_event.get("NewRating", 0)) - int(last_event.get("OldRating", 0))
            
            latest_contest = {
                "name": last_event.get("ContestNameEn") or last_event.get("ContestName", "AtCoder Contest"),
                "rank": str(last_event.get("Place", "N/A")),
                "delta": f"+{diff_last}" if diff_last > 0 else str(diff_last),
                "date": "recently",
                "color": "text-blue-500",
                "ts": time.time()
            }
    except Exception as e:
        logging.error(f"AC rating error {e}")

    try:
        ac_count = requests.get(
            f"https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user={handle}",
            timeout=20,
            headers=REQUEST_HEADERS
        ).json()
        solved = ac_count.get("count", 0) if isinstance(ac_count, dict) else 0
    except Exception as e:
        logging.error(f"AC solved error {e}")

    return {
        "rating": rating,
        "max_rating": max_rating,
        "solved": solved,
        "contests": contests,
        "changes": changes,
        "badge": "Brown" if rating >= 400 else "Gray" if rating > 0 else "",
        "latest_contest": latest_contest
    }

def fetch_gfg(handle: str) -> Dict:
    if not handle: return {"rating": 0, "solved": 0, "contests": 0, "max_rating": 0, "changes": [], "badge": "", "latest_contest": None}
    solved = 0
    try:
        res = requests.get(
            f"https://www.geeksforgeeks.org/user/{handle}/",
            timeout=15,
            headers=REQUEST_HEADERS
        )
        if res.ok:
            patterns = [
                r'"total_problems_solved"\s*:\s*(\d+)',
                r'Total\s+Problems\s+Solved[^0-9]*(\d+)',
                r'Problems\s+Solved[^0-9]*(\d+)',
            ]
            for pattern in patterns:
                match = re.search(pattern, res.text, flags=re.IGNORECASE)
                if match:
                    solved = int(match.group(1))
                    break

        if FIRECRAWL_API_KEY:
            try:
                from firecrawl import FirecrawlApp
                app = FirecrawlApp(api_key=FIRECRAWL_API_KEY)
                scrape = getattr(app, "scrape_url", None) or getattr(app, "scrape", None)
                if scrape:
                    logging.info("Firecrawling GFG...")
                    data = scrape(f'https://www.geeksforgeeks.org/user/{handle}/', formats=["markdown"])
                    text = getattr(data, "markdown", "") or str(data)
                    match = re.search(r'(?:Solved|Problems)[^0-9]{0,40}(\d+)', text, flags=re.IGNORECASE)
                    if match:
                        solved = max(solved, int(match.group(1)))
            except Exception as e:
                logging.error(f"GFG Firecrawl error {e}")
            
        return {
            "rating": 0, "solved": solved, "contests": 0, "max_rating": 0, "changes": [], "badge": "Active", "latest_contest": None
        }
    except Exception as e:
        logging.error(f"GFG error {e}")
        return {"rating": 0, "solved": solved, "contests": 0, "max_rating": 0, "changes": [], "badge": "", "latest_contest": None}

def fetch_all(accountType: str):
    cf_handle = ACCOUNTS["Codeforces"].get(accountType)
    lc_handle = ACCOUNTS["LeetCode"].get(accountType)
    cc_handle = ACCOUNTS["CodeChef"].get(accountType)
    ac_handle = ACCOUNTS["AtCoder"].get(accountType)
    gfg_handle = ACCOUNTS["GFG"].get(accountType)

    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=5) as executor:
        f_cf = executor.submit(fetch_codeforces, cf_handle)
        f_lc = executor.submit(fetch_leetcode, lc_handle)
        f_cc = executor.submit(fetch_codechef, cc_handle)
        f_ac = executor.submit(fetch_atcoder, ac_handle)
        f_gfg = executor.submit(fetch_gfg, gfg_handle)
        
        cf = f_cf.result()
        lc = f_lc.result()
        cc = f_cc.result()
        ac = f_ac.result()
        gfg = f_gfg.result()

    fetched_solved = cf["solved"] + lc["solved"] + cc["solved"] + ac["solved"] + gfg["solved"]
    total_solved = max(fetched_solved, SOLVED_FLOORS.get(accountType, 0))
    total_contests = cf["contests"] + lc["contests"] + cc["contests"] + ac["contests"]
    peak_rating = max(cf["max_rating"], lc["max_rating"], cc["max_rating"], ac["max_rating"])
    
    platforms = []
    if cf_handle: platforms.append({"name": "Codeforces", "score": rating_to_score(cf["rating"], "Codeforces"), "rawRating": str(cf["rating"]), "badge": cf["badge"], "color": "text-amber-500", "bg": "bg-amber-500", "changes": cf["changes"]})
    if lc_handle: platforms.append({"name": "LeetCode", "score": rating_to_score(lc["rating"], "LeetCode"), "rawRating": str(lc["rating"]), "badge": lc["badge"], "color": "text-emerald-500", "bg": "bg-emerald-500", "changes": lc["changes"]})
    if ac_handle: platforms.append({"name": "AtCoder", "score": rating_to_score(ac["rating"], "AtCoder"), "rawRating": str(ac["rating"]), "badge": ac["badge"], "color": "text-blue-500", "bg": "bg-blue-500", "changes": ac["changes"]})
    if cc_handle: platforms.append({"name": "CodeChef", "score": rating_to_score(cc["rating"], "CodeChef"), "rawRating": str(cc["rating"]), "badge": cc["badge"], "color": "text-purple-500", "bg": "bg-purple-500", "changes": cc["changes"]})

    # Consolidate contest highlights
    hl = []
    for hl_obj in [cf.get("latest_contest"), lc.get("latest_contest"), ac.get("latest_contest"), cc.get("latest_contest")]:
        if hl_obj: hl.append(hl_obj)
        
    hl.sort(key=lambda x: x.get("ts", 0), reverse=True)

    return {
        "overallStats": {
            "totalSolved": total_solved,
            "fetchedSolved": fetched_solved,
            "activeDays": total_contests, 
            "totalContests": total_contests,
            "overallPercentile": "Top 3%",
            "peakRating": peak_rating
        },
        "platformReviews": platforms,
        "ratingEvolution": [
            { "month": "Jan", "rating": 1500 },
            { "month": "Feb", "rating": 1650 },
            { "month": "Mar", "rating": 1600 },
            { "month": "Apr", "rating": 1800 },
            { "month": "May", "rating": 1950 },
            { "month": "Jun", "rating": 2100 },
            { "month": "Jul", "rating": 2250 },
            { "month": "Aug", "rating": 2200 },
            { "month": "Sep", "rating": peak_rating if peak_rating > 0 else 2350 }
        ],
        "contestHighlights": hl[:4] # Take 4 recent
    }

def fetch_combined():
    main_data = fetch_all("main")
    alt_data = fetch_all("alt")

    total_solved = main_data["overallStats"]["totalSolved"] + alt_data["overallStats"]["totalSolved"]
    fetched_solved = main_data["overallStats"].get("fetchedSolved", main_data["overallStats"]["totalSolved"]) + alt_data["overallStats"].get("fetchedSolved", alt_data["overallStats"]["totalSolved"])
    total_contests = main_data["overallStats"]["totalContests"] + alt_data["overallStats"]["totalContests"]
    peak_rating = max(main_data["overallStats"]["peakRating"], alt_data["overallStats"]["peakRating"])
    
    main_data["overallStats"]["totalSolved"] = total_solved
    main_data["overallStats"]["fetchedSolved"] = fetched_solved
    main_data["overallStats"]["totalContests"] = total_contests
    main_data["overallStats"]["activeDays"] = total_contests
    main_data["overallStats"]["peakRating"] = peak_rating

    # Combine platforms safely side-by-side or picking highest, we simply sum to showcase 'Combined' stats at top.
    # Platform breakdown will still showcase 'main' to avoid cluttering unless explicit union. For visual impact, returning main array as breakdown.
    
    # Combined highlights: (Main + Alt) limit 4
    hl = main_data.get("contestHighlights", []) + alt_data.get("contestHighlights", [])
    hl.sort(key=lambda x: x.get("ts", 0), reverse=True)
    main_data["contestHighlights"] = hl[:6]

    return main_data

def build_stats_payload(accountView: str):
    if accountView == "combined":
        data = fetch_combined()
    else:
        data = fetch_all(accountView)
    data["updatedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    return data

def write_cache(accountView: str, data: Dict[str, Any], status: str = "ok", error: str = None):
    conn = get_db_connection()
    if not conn:
        return
    try:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO cp_stats_cache (account_view, payload, status, error, updated_at)
                VALUES (%s, %s, %s, %s, CURRENT_TIMESTAMP)
                ON CONFLICT (account_view) DO UPDATE
                SET payload = EXCLUDED.payload,
                    status = EXCLUDED.status,
                    error = EXCLUDED.error,
                    updated_at = CURRENT_TIMESTAMP;
            """, (accountView, json.dumps(data), status, error))
        conn.commit()
        logging.info(f"Written DB cache for {accountView}")
    except Exception as e:
        logging.error(f"Write DB Error: {e}")
    finally:
        conn.close()

def refresh_cache(accountView: str):
    logging.info(f"Refreshing CP stats for {accountView}")
    data = build_stats_payload(accountView)
    write_cache(accountView, data)
    return data

def get_cached_stats(accountView: str):
    conn = get_db_connection()
    if conn:
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT payload, status, error, updated_at
                    FROM cp_stats_cache
                    WHERE account_view = %s
                """, (accountView,))
                row = cur.fetchone()
                if row:
                    payload = row["payload"]
                    payload["cacheStatus"] = row["status"]
                    payload["cacheError"] = row["error"]
                    payload["updatedAt"] = row["updated_at"].isoformat()
                    return payload
        except Exception as e:
            logging.error(f"Read DB Error: {e}")
        finally:
            conn.close()

    # Local first-run fallback. Production should be warmed by Railway cron.
    return refresh_cache(accountView)

@app.get("/api/cp-stats/aggregated")
def get_aggregated_stats(accountView: str = Query("combined", pattern="^(main|alt|combined)$")):
    try:
        return get_cached_stats(accountView)
    except Exception as e:
        logging.error(f"Error serving stats: {e}")
        return {"error": str(e)}

@app.post("/api/cp-stats/refresh")
def refresh_aggregated_stats(
    accountView: str = Query("combined", pattern="^(main|alt|combined)$"),
    secret: str = Query("", include_in_schema=False),
):
    if CRON_SECRET and secret != CRON_SECRET:
        return {"error": "unauthorized"}
    try:
        return refresh_cache(accountView)
    except Exception as e:
        logging.error(f"Error refreshing stats: {e}")
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

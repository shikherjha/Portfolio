import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip, YAxis } from "recharts";
import { ArrowLeft, Activity, Trophy, User, Users, Zap } from "lucide-react";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { useQuery } from "@tanstack/react-query";

type AccountView = "main" | "alt" | "combined";

const viewLabels: Record<AccountView, string> = {
  main: "Primary",
  alt: "Secondary",
  combined: "Unified",
};

const fallbackPlatforms = [
  { name: "Codeforces", score: "57%", rawRating: "1604", badge: "Expert", color: "text-primary", bg: "bg-primary", changes: ["+35", "-12"] },
  { name: "LeetCode", score: "69%", rawRating: "1932", badge: "Knight", color: "text-primary", bg: "bg-primary", changes: ["+15", "+22"] },
  { name: "AtCoder", score: "45%", rawRating: "1096", badge: "Kyu", color: "text-primary", bg: "bg-primary", changes: ["+18"] },
  { name: "CodeChef", score: "65%", rawRating: "1840", badge: "4 Star", color: "text-primary", bg: "bg-primary", changes: ["+20"] },
];

export default function Competition() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [accountView, setAccountView] = useState<AccountView>("combined");

  const { data, isLoading } = useQuery({
    queryKey: ["cpStats", accountView],
    queryFn: async () => {
      const baseUrl = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${baseUrl}/api/cp-stats/aggregated?accountView=${accountView}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      localStorage.setItem(`cpStats_${accountView}`, JSON.stringify(json));
      return json;
    },
    initialData: () => {
      const cached = localStorage.getItem(`cpStats_${accountView}`);
      if (cached) {
        try { return JSON.parse(cached); } catch (e) { }
      }
      return undefined;
    },
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });

  const overall = data?.overallStats || {};
  const platforms = data?.platformReviews || fallbackPlatforms;
  const ratingEvolution = data?.ratingEvolution || [
    { month: "Jan", rating: 1500 },
    { month: "Feb", rating: 1650 },
    { month: "Mar", rating: 1600 },
    { month: "Apr", rating: 1800 },
    { month: "May", rating: 1950 },
    { month: "Jun", rating: 2100 },
  ];
  const contestHighlights = data?.contestHighlights || [
    { name: "Codeforces Round 900", rank: "142", delta: "+35", date: "2 days ago", color: "text-primary" },
    { name: "LeetCode Weekly 390", rank: "45", delta: "+12", date: "1 week ago", color: "text-primary" },
  ];

  const stats = [
    { label: "Overall Percentile", value: isLoading ? "..." : (overall.overallPercentile || "Top 3%"), icon: Trophy },
    { label: "Total Solved", value: isLoading ? "..." : (overall.totalSolved?.toLocaleString() || "1,013"), icon: Zap },
    { label: "Total Contests", value: isLoading ? "..." : (overall.totalContests || "134"), icon: Activity },
  ];

  return (
    <div className="bg-background min-h-screen text-foreground relative selection:bg-primary/30 selection:text-primary-foreground">
      <CustomCursor />

      <div className="relative z-10">
        <header className="border-b border-border/60 bg-card/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <a
                href="/#charts"
                onClick={(e) => {
                  if (window.history.length > 2) {
                    e.preventDefault();
                    window.history.back();
                  }
                }}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-xs uppercase tracking-widest font-semibold">Back to Portfolio</span>
              </a>

              <AnimatePresence mode="wait">
                <div className="flex bg-background p-1 rounded-full border border-border/80 items-center shadow-sm">
                  {(["main", "alt", "combined"] as AccountView[]).map((view) => {
                    const Icon = view === "combined" ? Users : User;
                    return (
                      <button
                        key={view}
                        onClick={() => setAccountView(view)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${accountView === view ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <Icon className="w-3.5 h-3.5" /> {viewLabels[view]}
                      </button>
                    );
                  })}
                </div>
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={accountView}
            className="relative overflow-hidden rounded-lg border border-border/60 bg-card/25 p-6 md:p-10 mb-10"
          >
            <div className="absolute -bottom-8 right-4 select-none text-[16vw] font-heading font-bold leading-none tracking-tight text-foreground/[0.035]">
              CHARTS
            </div>

            <div className="relative flex flex-col lg:flex-row justify-between gap-10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-5">
                  <span className="h-8 w-3 bg-primary" />
                  <span className="font-mono text-xs uppercase tracking-[0.32em] text-primary">
                    Competitive Charts
                  </span>
                  {isLoading && <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin inline-block" />}
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight leading-none">
                  {viewLabels[accountView]} Rankings
                </h1>
                <p className="mt-5 text-muted-foreground max-w-2xl text-lg">
                  A chart-style view of solved volume, contest history, and platform strength across the competitive programming arena.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 lg:w-72">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="border border-border/60 bg-background/55 rounded-md p-4">
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="block text-3xl font-heading font-medium text-foreground">{stat.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.section>

          <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-border/60 bg-card/35 overflow-hidden"
            >
              <div className="flex items-center justify-between bg-primary text-primary-foreground px-5 py-3">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold uppercase tracking-tight">Top Platforms</h2>
                <span className="font-mono text-[10px] uppercase tracking-widest">View {viewLabels[accountView]}</span>
              </div>

              <div className="divide-y divide-border/50">
                {platforms.map((plat: any, i: number) => (
                  <motion.div
                    key={plat.name + accountView}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[4.5rem_1fr_auto] gap-4 px-4 md:px-6 py-5 items-center hover:bg-card/70 transition-colors"
                  >
                    <div className="text-4xl md:text-5xl font-heading font-semibold text-primary leading-none">
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="text-2xl md:text-3xl font-heading font-medium">{plat.name}</h3>
                        <span className="rounded-full border border-primary/50 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary">
                          {plat.badge}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        <span>Score {plat.score}</span>
                        <span className="h-px w-8 bg-border" />
                        <span>{plat.changes?.slice(-2).join(" / ") || "stable"}</span>
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-1 md:text-right">
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Rating</span>
                      <span className="text-4xl md:text-5xl font-heading font-medium text-foreground">{plat.rawRating}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg border border-border/60 bg-card/35 p-5 md:p-6"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-5">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold uppercase tracking-tight">Recent Releases</h2>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Contest feed</span>
              </div>

              <div className="flex flex-col gap-5">
                {contestHighlights.map((contest: any, i: number) => (
                  <div key={`${contest.name}-${i}`} className="grid grid-cols-[2.5rem_1fr_auto] gap-4 items-start border-b border-border/50 pb-5 last:border-b-0 last:pb-0">
                    <span className="font-heading text-3xl text-primary">{i + 1}</span>
                    <div>
                      <h3 className="font-heading text-lg leading-tight hover:text-primary transition-colors">{contest.name}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
                        Rank {contest.rank || "N/A"} / {contest.date || "recently"}
                      </p>
                    </div>
                    <span className={`font-mono text-sm font-bold ${contest.color || "text-primary"}`}>{contest.delta}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="rounded-lg border border-border/60 bg-card/35 p-5 md:p-8 mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold uppercase tracking-tight whitespace-nowrap">Rating Trajectory</h2>
              <div className="h-px w-full bg-border" />
            </div>
            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ratingEvolution} margin={{ top: 5, right: 20, left: -18, bottom: 5 }}>
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tickMargin={15} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tickMargin={15} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px", fontFamily: "monospace" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "hsl(var(--background))", stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "hsl(var(--primary))", strokeWidth: 0 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

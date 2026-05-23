import { motion } from "framer-motion";
import { Activity, ArrowRight, Radio, Trophy } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

const fallbackPlatforms = [
  { name: "Codeforces", score: "57%", rawRating: "1604", badge: "Expert", color: "text-primary", bg: "bg-primary", changes: ["+35", "-12"] },
  { name: "LeetCode", score: "69%", rawRating: "1932", badge: "Knight", color: "text-primary", bg: "bg-primary", changes: ["+15", "+22"] },
  { name: "AtCoder", score: "45%", rawRating: "1096", badge: "Kyu", color: "text-primary", bg: "bg-primary", changes: ["+18"] },
  { name: "CodeChef", score: "65%", rawRating: "1840", badge: "4 Star", color: "text-primary", bg: "bg-primary", changes: ["+20"] },
];

export function CompetitionSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["cpStats", "combined"],
    queryFn: async () => {
      const baseUrl = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${baseUrl}/api/cp-stats/aggregated?accountView=combined`);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      localStorage.setItem("cpStats_combined", JSON.stringify(json));
      return json;
    },
    initialData: () => {
      const cached = localStorage.getItem("cpStats_combined");
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

  const overall = data?.overallStats;
  const platforms = data?.platformReviews || fallbackPlatforms;
  const updatedAt = data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "cached mix";

  return (
    <section id="charts" className="w-full min-h-screen py-24 flex flex-col justify-center relative transition-colors duration-1000">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
        <motion.div
          className="mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-primary opacity-80 block mb-4">
              Charts - Competitive Programming
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tight mb-4">
              Live Ratings Console
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              A cleaner mix of solved volume, contest history, and active platform ratings.
            </p>
          </div>

          <Link href="/competition">
            <button className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 font-medium rounded-full overflow-hidden transition-all duration-300 hover:bg-card border border-border/80 text-foreground hover:text-primary shadow-sm hover:shadow-md">
              <span className="relative font-mono text-[10px] md:text-xs uppercase tracking-widest z-10">
                Explore Full Rankings
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform z-10" />
            </button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-10 items-stretch">
          <motion.div
            className="rounded-lg border border-border/60 bg-card/35 p-6 md:p-8 flex flex-col justify-between overflow-hidden relative"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="absolute right-6 top-6 text-primary/20">
              <Radio className="w-24 h-24" />
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {isLoading ? "Syncing" : `Updated ${updatedAt}`}
              </span>

              <div className="mt-14">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary mb-3">
                  Current chart position
                </p>
                <h3 className="text-6xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight leading-none text-foreground">
                  {isLoading ? "---" : (overall?.overallPercentile || "Top 3%")}
                </h3>
              </div>
            </div>

            <div className="relative mt-12 grid grid-cols-2 gap-3">
              {[
                { label: "Total Solved", value: isLoading ? "..." : (overall?.totalSolved?.toLocaleString() || "1,013"), icon: Trophy },
                { label: "Total Contests", value: isLoading ? "..." : (overall?.totalContests || "134"), icon: Activity },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-md border border-border/50 bg-background/45 p-4">
                    <Icon className="w-4 h-4 text-primary mb-5" />
                    <span className="block text-3xl md:text-4xl font-heading text-foreground">{stat.value}</span>
                    <span className="mt-2 block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="rounded-lg border border-border/60 bg-card/25 p-4 md:p-5">
            <div className="flex items-center justify-between px-2 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                Platform Reviews
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary/70">
                Raw rating first
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {platforms.map((plat: any, i: number) => (
                <motion.div
                  key={plat.name}
                  className="group relative overflow-hidden rounded-md border border-border/50 bg-background/45 px-4 py-4 md:px-5 md:py-5 hover:border-primary/35 transition-colors"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          Track {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px w-8 bg-border" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                          {plat.badge}
                        </span>
                      </div>
                      <h4 className="font-heading text-2xl md:text-3xl font-medium tracking-tight text-foreground">
                        {plat.name}
                      </h4>
                    </div>

                    <div className="flex items-end gap-6 sm:text-right">
                      <div>
                        <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                          Rating
                        </span>
                        <span className="text-3xl md:text-4xl font-heading font-medium text-foreground">
                          {plat.rawRating}
                        </span>
                      </div>
                      <div className="hidden md:flex items-end gap-1 h-10 opacity-40 group-hover:opacity-80 transition-opacity">
                        {[18, 28, 14, 34, 22].map((height, idx) => (
                          <span key={idx} className="w-1 rounded-full bg-primary/70" style={{ height }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

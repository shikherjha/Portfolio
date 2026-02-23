import { motion } from "framer-motion";
import { BarChart, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

export function CompetitionSection() {
  const { data, isLoading } = useQuery({
    queryKey: ['cpStats', 'combined'],
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
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 1
  });

  const overall = data?.overallStats;
  const platforms = data?.platformReviews || [
    { name: "Codeforces", score: "96%", rawRating: "2350 Elite", badge: "Expert", color: "text-amber-500" },
    { name: "LeetCode", score: "92%", rawRating: "Top 1% Global", badge: "Knight", color: "text-emerald-500" },
    { name: "AtCoder", score: "88%", rawRating: "1950 Dan", badge: "Kyu", color: "text-blue-500" },
    { name: "CodeChef", score: "90%", rawRating: "5 Stars", badge: "4 Star", color: "text-purple-500" }
  ];

  return (
    <section id="charts" className="w-full min-h-screen py-24 flex flex-col justify-center relative transition-colors duration-1000">

      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">

        {/* Section Header & CTA */}
        <motion.div
          className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-primary opacity-80 block mb-4 transition-all duration-1000">
              Charts — Competitive Programming
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tight mb-4">
              Competitive Charts
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg transition-colors duration-1000">
              Performance index and global rankings compiled from the competitive programming arena.
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

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12">

          {/* Left: Headline Block ("Chart Position") */}
          <motion.div
            className="flex-1 flex flex-col justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-12 md:mb-16">
              <h3 className="text-7xl lg:text-[7rem] font-heading font-semibold tracking-tighter text-foreground mb-4 leading-none">
                {isLoading ? "---" : (overall?.overallPercentile || "Top 3%")}
              </h3>
              <span className="text-amber-500 font-mono text-xs md:text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
                Globally Across 5 Platforms
              </span>
            </div>

            {/* Billboard Style Metric Strip */}
            <div className="w-full h-[1px] bg-border mb-8" />
            <div className="flex flex-wrap gap-8 md:gap-12 lg:gap-16">
              <div className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-heading font-medium text-foreground">
                  {isLoading ? "..." : (overall?.totalSolved?.toLocaleString() || "1,240")}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">Total Solved</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-heading font-medium text-foreground">
                  {isLoading ? "..." : (overall?.activeDays || "42")}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">Total Contests</span>
              </div>
            </div>
            <div className="w-full h-[1px] bg-border mt-8" />
          </motion.div>

          {/* Right: Platform Ratings (Rotten Tomatoes Style) */}
          <div className="flex-1 flex flex-col gap-4 w-full max-w-xl mx-auto lg:mx-0">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 block font-semibold px-2">
              Critic Scores / Platform Reviews
            </span>

            {platforms.map((plat: any, i: number) => (
              <motion.div
                key={plat.name}
                className="flex items-center justify-between p-4 md:p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-border/40 hover:border-primary/30 transition-all duration-500 group cursor-default shadow-sm hover:shadow-lg relative overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="flex items-center gap-6 relative z-10">
                  {/* Score Badge */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-background/80 border border-border/60 flex items-center justify-center shadow-inner group-hover:border-primary/40 transition-all duration-500">
                    <span className={`text-xl md:text-2xl font-heading font-semibold ${plat.color} drop-shadow-[0_0_12px_rgba(currentcolor,0.3)]`}>
                      {plat.score}
                    </span>
                  </div>

                  {/* Platform Details */}
                  <div className="flex flex-col justify-center gap-2">
                    <h4 className="font-heading text-lg md:text-xl text-foreground font-medium group-hover:text-primary transition-colors leading-none tracking-tight">
                      {plat.name}
                    </h4>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] md:text-xs font-mono uppercase text-muted-foreground tracking-widest font-semibold opacity-60 italic">
                        {plat.rawRating}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 text-[9px] md:text-[10px] px-2.5 py-0.5 rounded-full border border-current/40 font-mono uppercase tracking-widest ${plat.color} bg-current/10 font-bold backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-105 duration-300`}>
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
                        </span>
                        {plat.badge}
                      </span>
                    </div>
                  </div>
                </div>
                <BarChart className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-all duration-500 opacity-20 group-hover:opacity-100 scale-90 group-hover:scale-100 relative z-10" />
              </motion.div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}
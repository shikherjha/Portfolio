import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip, YAxis } from "recharts";
import { ArrowLeft, User, Users, Star } from "lucide-react";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { useQuery } from "@tanstack/react-query";

export default function Competition() {
    // Snap to top on fresh mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [accountView, setAccountView] = useState<"main" | "alt" | "combined">("combined");

    const { data, isLoading } = useQuery({
        queryKey: ['cpStats', accountView],
        queryFn: async () => {
            const baseUrl = import.meta.env.VITE_API_URL || "";
            const res = await fetch(`${baseUrl}/api/cp-stats/aggregated?accountView=${accountView}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const json = await res.json();
            // Cache locally for instant next-reload
            localStorage.setItem(`cpStats_${accountView}`, JSON.stringify(json));
            return json;
        },
        initialData: () => {
            // Provide local cache instantly so no dummy UI is shown on reloads
            const cached = localStorage.getItem(`cpStats_${accountView}`);
            if (cached) {
                try { return JSON.parse(cached); } catch (e) { }
            }
            return undefined;
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 24 * 60 * 60 * 1000, // keep cache up to 24hr in JS memory
        retry: 1
    });

    const overall = data?.overallStats || {};
    const platforms = data?.platformReviews || [
        { name: "Codeforces", score: "96%", rawRating: "2350", badge: "Elite", color: "text-amber-500", bg: "bg-amber-500", changes: ["+35", "-12"] },
        { name: "LeetCode", score: "92%", rawRating: "2850", badge: "Top 1%", color: "text-emerald-500", bg: "bg-emerald-500", changes: ["+15", "+22"] },
    ];

    // Default dummy chart just so it's not empty while loading
    const ratingEvolution = data?.ratingEvolution || [
        { month: 'Jan', rating: 1500 }, { month: 'Feb', rating: 1650 }, { month: 'Mar', rating: 1600 },
        { month: 'Apr', rating: 1800 }, { month: 'May', rating: 1950 }, { month: 'Jun', rating: 2100 }
    ];

    const contestHighlights = data?.contestHighlights || [
        { name: "Codeforces Round 900", rank: "142", delta: "+35", date: "2 days ago", color: "text-amber-500" },
        { name: "LeetCode Weekly 390", rank: "45", delta: "+12", date: "1 week ago", color: "text-emerald-500" },
    ];

    return (
        <div className="bg-background min-h-screen text-foreground relative selection:bg-primary/30 selection:text-primary-foreground">
            <CustomCursor />

            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vh] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[20%] left-[5%] w-[30vw] h-[30vh] bg-accent/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
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
                        <span className="font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                            Back to Portfolio
                        </span>
                    </a>

                    {/* Account Toggle */}
                    <AnimatePresence mode="wait">
                        <div className="flex bg-card/80 p-1 rounded-full border border-border/80 items-center shadow-sm backdrop-blur-sm">
                            <button
                                onClick={() => setAccountView("main")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${accountView === "main" ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                <User className="w-3.5 h-3.5" /> Primary
                            </button>
                            <button
                                onClick={() => setAccountView("alt")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${accountView === "alt" ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                <User className="w-3.5 h-3.5" /> Secondary
                            </button>
                            <button
                                onClick={() => setAccountView("combined")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${accountView === "combined" ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                <Users className="w-3.5 h-3.5" /> Unified
                            </button>
                        </div>
                    </AnimatePresence>
                </div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={accountView}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-4 flex items-center gap-4">
                        Detailed Analytics {isLoading && <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin inline-block"></span>}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl font-mono uppercase tracking-widest text-[10px] md:text-xs font-semibold">
                        Global Rankings & Performance Index ({accountView === "combined" ? "Unified" : accountView === "main" ? "Primary Track" : "Secondary Track"})
                    </p>
                </motion.div>

                {/* Unified Summary Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
                    {[
                        { label: "Overall Percentile", val: isLoading ? "..." : (overall.overallPercentile || "Top 3%") },
                        { label: "Total Solved", val: isLoading ? "..." : (overall.totalSolved?.toLocaleString() || "1,240") },
                        { label: "Total Contests", val: isLoading ? "..." : (overall.totalContests || "154") }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-center"
                        >
                            <div className="text-[10px] md:text-xs font-mono text-muted-foreground mb-3 uppercase tracking-widest font-semibold">{stat.label}</div>
                            <div className="text-4xl md:text-5xl font-heading font-medium tracking-tight">{stat.val}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Platform Review Cards (Rotten Tomatoes Style) */}
                <div className="mb-20">
                    <h3 className="text-lg md:text-xl font-heading mb-6 flex items-center gap-3">
                        <Star className="w-5 h-5 text-amber-500" /> Platform Reviews
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {platforms.map((plat: any, i: number) => (
                            <motion.div
                                key={plat.name + accountView}
                                className="flex flex-col justify-between p-6 rounded-2xl bg-card border border-border/80 hover:border-border transition-colors group cursor-default shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <h4 className="font-heading text-xl md:text-2xl font-medium tracking-tight group-hover:text-primary transition-colors">
                                        {plat.name}
                                    </h4>
                                    <div className={`px-2.5 py-1 rounded-md bg-background border border-border text-xs font-mono font-bold ${plat.color}`}>
                                        {plat.score}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="text-4xl font-heading font-bold tracking-tighter">
                                        {plat.rawRating}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Index</span>
                                        <span className={`text-xs font-mono font-bold uppercase tracking-widest ${plat.color}`}>{plat.badge}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block font-semibold">Latest Trajectory</span>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {plat.changes && plat.changes.map((change: any, idx: number) => (
                                            <span key={idx} className={`text-xs font-mono px-2 py-1 rounded bg-background border border-border ${change.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {change}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Career Trajectory & Contest Highlights */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">

                    {/* Career Trajectory */}
                    <div className="lg:col-span-2 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-sm">
                        <h3 className="text-lg md:text-xl font-heading mb-8">Career Trajectory</h3>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={ratingEvolution} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tickMargin={15} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tickMargin={15} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px', fontFamily: 'monospace' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="rating"
                                        stroke="#f59e0b"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: '#09090b', stroke: '#f59e0b', strokeWidth: 2 }}
                                        activeDot={{ r: 6, fill: '#f59e0b', strokeWidth: 0 }}
                                        animationDuration={1500}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Contest Highlights (Recent Releases) */}
                    <div className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-sm flex flex-col">
                        <h3 className="text-lg md:text-xl font-heading mb-8">Contest Highlights</h3>
                        <div className="flex flex-col gap-6 flex-1 justify-center">
                            {contestHighlights.map((contest: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex flex-col gap-2 group cursor-default"
                                >
                                    <div className="flex justify-between items-end">
                                        <h4 className="font-heading text-base md:text-lg group-hover:text-primary transition-colors">{contest.name}</h4>
                                        <span className={`font-mono text-sm font-bold ${contest.color || 'text-amber-500'}`}>{contest.delta}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                        <span>Rank {contest.rank || 'N/A'}</span>
                                        <span className="opacity-60">{contest.date || 'recently'}</span>
                                    </div>
                                    <div className="w-full h-[1px] bg-border/50 mt-4 group-hover:bg-border transition-colors" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

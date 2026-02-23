import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useSpring, useMotionValueEvent, motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, ExternalLink } from "lucide-react";

const featuredProjects = [
  {
    id: "proj-1",
    title: "Axon AI",
    tag: "AI EDUCATION ENGINE",
    year: "2025",
    tech: ["Python", "FastAPI", "LangChain", "Redis", "PostgreSQL"],
    color: "from-indigo-900/60 to-slate-950",
    desc: "An integrated, agentic platform delivering personalized, explainable, and emotionally-aware AI education at scale.",
    link: "https://axon-ai-frontend.vercel.app/"
  },
  {
    id: "proj-2",
    title: "Signal",
    tag: "CURATED JOB FEED",
    year: "2024",
    tech: ["Go", "Python", "React", "PostgreSQL", "OpenAI"],
    color: "from-amber-900/40 to-slate-950",
    desc: "A high-signal, low-noise aesthetic job portal surfacing real, vetting hiring opportunities hidden behind inefficient systems.",
    link: "https://getsig.in"
  },
  {
    id: "proj-3",
    title: "Multi-Tenant Provision Store",
    tag: "K8S ORCHESTRATION",
    year: "2024",
    tech: ["Go", "FastAPI", "Kubernetes", "MedusaJS", "Helm"],
    color: "from-emerald-900/40 to-slate-950",
    desc: "Isolated namespace e-commerce orchestration engine inside Kubernetes with granular drift detection and routing.",
    link: "https://github.com/shikherjha/Multi-tenant-provision-store"
  },
  {
    id: "proj-4",
    title: "AirShare",
    tag: "ALGORITHMIC ROUTING",
    year: "2024",
    tech: ["Go", "PostgreSQL", "Redis", "Docker"],
    color: "from-slate-800 to-slate-950",
    desc: "Smart Airport Ride Pooling Backend grouping passengers into shared cabs while optimizing capacity constraints and dynamic pricing.",
    link: "https://github.com/shikherjha/AirShare"
  }
];

type ProjectItem = {
  id: string;
  title: string;
  tag: string;
  year: string;
  tech: string[];
  color: string;
  desc: string;
  link: string;
  isFinal?: false;
} | {
  id: string;
  isFinal: true;
  title?: undefined;
  tag?: undefined;
  year?: undefined;
  tech?: undefined;
  color?: undefined;
  desc?: undefined;
  link?: undefined;
};

const allItems: ProjectItem[] = [...featuredProjects as ProjectItem[], { id: "full-discography", isFinal: true }];

function AlbumTrack({ proj, index, isActive, isDesktop }: { proj: any, index: number, isActive: boolean, isDesktop: boolean }) {
  const isFinal = proj.isFinal;

  if (isFinal) {
    return (
      <div className={`${isDesktop ? 'w-[100vw] h-[100vh] flex-shrink-0' : 'w-full h-full'} flex flex-col items-center justify-center p-8`}>
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
          <Link href="/projects" className="group flex flex-col items-center justify-center p-12 lg:p-24 border border-border/20 shadow-2xl rounded-sm hover:border-primary/50 transition-colors bg-card/10 relative overflow-hidden w-full max-w-xl aspect-square md:aspect-video cursor-pointer">
            <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
            <span className="text-primary font-mono text-xs md:text-sm uppercase tracking-widest mb-4 z-10">
              Track 0{index + 1}
            </span>
            <h3 className="font-heading font-medium text-3xl md:text-4xl lg:text-5xl text-foreground group-hover:text-primary transition-colors flex items-center gap-4 z-10 text-center">
              Full Discography
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
            </h3>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDesktop ? 'w-[100vw] h-[100vh] flex-shrink-0' : 'w-full'} flex items-center justify-center`}>
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center p-6 md:p-12 lg:pt-32 gap-12 lg:gap-24 max-w-[1400px] mx-auto overflow-hidden">

        {/* Left: Album Cover & Disc */}
        <div className="relative w-full max-w-[280px] md:max-w-[340px] lg:max-w-[420px] xl:max-w-[500px] aspect-square flex-shrink-0 group">

          {/* Vinyl Disc (sits beneath cover and slides out) */}
          <motion.div
            className="absolute inset-y-1 md:inset-y-2 right-0 w-[95%] rounded-full bg-[#111] shadow-2xl border border-white/5 overflow-hidden"
            initial={false}
            animate={
              isDesktop
                ? {
                  x: isActive ? "35%" : "10%",
                  rotate: isActive ? 360 : 0,
                  scale: isActive ? 1 : 0.95,
                  opacity: isActive ? 1 : 0.7
                }
                : { x: "20%", rotate: 0 } // Mobile static
            }
            transition={
              isActive
                ? { rotate: { repeat: Infinity, duration: 25, ease: "linear" }, x: { type: "spring", stiffness: 100, damping: 25 } }
                : { type: "spring", stiffness: 100, damping: 25 }
            }
            style={{ zIndex: 0 }}
          >
            {/* Vinyl Grooves - No filters, just CSS gradient for perf */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `repeating-radial-gradient(
                      transparent,
                      transparent 2px,
                      rgba(255,255,255,0.03) 3px,
                      rgba(255,255,255,0.03) 4px
                    )`
              }}
            />

            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] aspect-square rounded-full bg-card flex flex-col items-center justify-center shadow-2xl border border-border/30 overflow-hidden">
              {/* Inner hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10%] aspect-square rounded-full bg-background z-20 shadow-inner" />

              {/* Ring detailing */}
              <div className="absolute inset-1 rounded-full border border-foreground/5" />
              <span className="text-[7px] md:text-[8px] lg:text-[10px] font-mono text-primary/70 uppercase tracking-widest mt-[50%]">Track 0{index + 1}</span>
            </div>
          </motion.div>

          {/* Album Sleeve Cover (Static typography with cinematic styling) */}
          <motion.div
            className={`absolute inset-0 z-10 rounded-sm shadow-2xl bg-gradient-to-br ${proj.color} border border-white/10 flex flex-col justify-between p-6 md:p-8 lg:p-10 overflow-hidden`}
            whileHover={isDesktop ? { y: -5, rotate: -1 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              // Subtle paper grain overlay + cinematic lighting gradient
              backgroundImage: `radial-gradient(circle at top left, rgba(255,255,255,0.08) 0%, transparent 60%), linear-gradient(to bottom right, rgba(0,0,0,0.2), rgba(0,0,0,0.8))`
            }}
          >
            {/* Noise texture overlay for tactile feel */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />

            <div className="flex justify-between items-start z-10 w-full drop-shadow-md">
              <span className="text-white/80 font-mono text-[10px] md:text-xs uppercase tracking-widest leading-none">
                Track 0{index + 1}
              </span>
              <span className="text-white/80 font-mono text-[10px] md:text-xs uppercase tracking-widest leading-none">
                {proj.year}
              </span>
            </div>

            <div className="z-10 w-full mt-auto drop-shadow-md">
              <h4 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white/95 leading-[1.1] mb-2 md:mb-3">
                {proj.title}
              </h4>
              <p className="text-white/60 text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-80">
                {proj.tag}
              </p>
            </div>

            {/* Visual "wear and tear" edge highlight overlay */}
            <div className="absolute inset-0 border-[1px] border-white/10 pointer-events-none mix-blend-overlay rounded-sm"></div>
          </motion.div>
        </div>

        {/* Right: Project Content Panel */}
        <motion.div
          className="flex flex-col justify-center flex-1 max-w-xl text-left mt-8 md:mt-0 z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isActive || !isDesktop ? 1 : 0.2,
            y: isActive || !isDesktop ? 0 : 30
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Mobile Header indicator since cover is small */}
          <div className="flex items-center gap-4 mb-4 md:hidden">
            <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
              Track 0{index + 1}
            </span>
            <span className="text-muted-foreground/30">—</span>
            <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
              {proj.year}
            </span>
          </div>

          <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium mb-4 md:mb-6 text-foreground tracking-tight leading-none text-balance">
            {proj.title}
          </h3>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 md:mb-12 max-w-lg">
            {proj.desc}
          </p>

          {/* FEAT. Tech Stack (Amber styled) */}
          <div className="mb-8 md:mb-12">
            <span className="text-amber-500/90 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-4 flex items-center gap-2 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
              Feat.
            </span>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {proj.tech?.map((t: string) => (
                <span key={t} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-card/40 border border-border/50 text-xs md:text-sm font-medium text-foreground hover:bg-card hover:border-border transition-colors cursor-default shadow-sm backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-3 text-foreground font-medium hover:text-primary transition-colors w-fit pb-1.5 md:pb-2 cursor-pointer">
            <span className="relative z-10 flex items-center gap-2 text-sm md:text-base tracking-wide">
              View Project <ExternalLink className="w-4 h-4 md:w-5 md:h-5 py-[1px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground/20 group-hover:bg-primary transition-colors"></span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}


export function ProjectsSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Map vertical scroll progress to discrete horizontal translation (snap effect)
  const snapProgress = useTransform(scrollYProgress, (p) => {
    const step = 1 / (allItems.length - 1);
    // Increase sensitivity: snap to the next element quickly
    // by evaluating closest index using a more aggressive curve
    const index = Math.round(p / step);
    return index * step;
  });
  const xTranslate = useTransform(snapProgress, [0, 1], ["0vw", `-${(allItems.length - 1) * 100}vw`]);
  const smoothX = useSpring(xTranslate, { stiffness: 400, damping: 40, mass: 0.8 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktop) return;
    const index = Math.round(latest * (allItems.length - 1));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <section
      id="discography"
      className={isDesktop ? "relative w-full" : "w-full py-24"}
    >
      {isDesktop ? (
        // DESKTOP: Vertical sliding, pinned container
        <div
          ref={targetRef}
          // 75vh strikes the perfect balance: 
          // 100vh required 2 scrolls, 50vh was too fast and skipped.
          style={{ height: `${allItems.length * 65}vh` }}
          className="relative w-full"
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">

            {/* Fixed Section Header */}
            <div className="absolute top-16 left-6 md:top-24 md:left-12 lg:left-48 xl:left-64 z-30 pointer-events-none drop-shadow-md transition-all duration-500">
              <span className="text-sm font-mono uppercase tracking-widest text-primary opacity-80 block mb-2 md:mb-4">
                Discography — Projects
              </span>
              <h2 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-heading font-medium tracking-tight text-foreground/90">
                Featured Tracks
              </h2>
            </div>

            {/* Horizontally Sliding Track Container */}
            <motion.div style={{ x: smoothX }} className="w-fit h-full flex flex-row relative z-20">
              {allItems.map((proj, idx) => (
                <AlbumTrack
                  key={proj.id}
                  proj={proj}
                  index={idx}
                  isActive={activeIndex === idx}
                  isDesktop={true}
                />
              ))}
            </motion.div>

            {/* Fixed Track Progress Indicator (Bottom Center) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 w-48 md:w-64 opacity-80 mix-blend-difference pointer-events-none">
              <div className="text-[10px] md:text-xs font-mono tracking-widest text-white/50 uppercase flex justify-between w-full px-2">
                <span className="text-white">0{activeIndex + 1}</span>
                <span>0{allItems.length}</span>
              </div>
              <div className="w-full h-[1px] bg-white/20 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((activeIndex + 1) / allItems.length) * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

          </div>
        </div>
      ) : (
        // MOBILE: Stacking Vertical Layout (Standard Scroll)
        <div className="container px-4 mx-auto overflow-x-hidden flex flex-col gap-32">
          <div className="mb-0">
            <span className="text-sm font-mono uppercase tracking-widest text-primary opacity-80 block mb-3">
              Discography — Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
              Featured Tracks
            </h2>
          </div>

          <div className="flex flex-col gap-48 mb-24">
            {allItems.map((proj, idx) => (
              // Normal relative flow for mobile
              <AlbumTrack
                key={proj.id}
                proj={proj}
                index={idx}
                isActive={true}
                isDesktop={false}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
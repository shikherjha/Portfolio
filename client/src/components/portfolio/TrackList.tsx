import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const tracks = [
  { id: "prelude", title: "Landing", label: "Prelude" },
  { id: "side-a", title: "Mindset", label: "Side A" },
  { id: "side-b", title: "Skills", label: "Side B" },
  { id: "discography", title: "Projects", label: "Discography" },
  { id: "charts", title: "Charts", label: "Charts" },
  { id: "journey", title: "Timeline", label: "Journey" },
  { id: "encore", title: "Contact", label: "Encore" },
];

export function TrackList() {
  const [activeTrack, setActiveTrack] = useState(tracks[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sections = tracks.map(t => document.getElementById(t.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          if (activeTrack !== tracks[i].id) {
            setActiveTrack(tracks[i].id);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTrack]);

  const scrollToTrack = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed left-0 top-0 lg:left-8 lg:top-1/2 lg:-translate-y-1/2 z-40 w-full lg:w-32 bg-background/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-0 border-b lg:border-none border-border">
      <div className="flex lg:flex-col gap-2 lg:gap-6 relative p-4 lg:p-0 overflow-x-auto no-scrollbar items-center lg:items-start">
        {/* Fader Track Line (Desktop) */}
        <div className="hidden lg:block absolute left-[15px] top-2 bottom-2 w-[2px] bg-border/40 rounded-full" />

        {tracks.map((track, i) => {
          const isActive = activeTrack === track.id;
          return (
            <button
              key={track.id}
              data-testid={`link-track-${track.id}`}
              onClick={() => scrollToTrack(track.id)}
              className="group flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-4 text-left relative shrink-0 min-w-[60px]"
            >
              {/* Fader Knob (Active) or Tick (Inactive) on Desktop */}
              <div className="hidden lg:flex relative w-8 h-8 items-center justify-center -ml-[3px]">
                {isActive ? (
                  <motion.div
                    layoutId="active-fader"
                    className="w-full h-2 bg-primary  shadow-[0_0_12px_hsla(var(--primary)/0.6)] cursor-pointer"
                    style={{ borderRadius: "1px" }}
                  />
                ) : (
                  <div className="w-1/2 h-[2px] bg-muted-foreground/30 group-hover:bg-muted-foreground transition-colors duration-300" />
                )}
              </div>

              {/* Mobile Indicator */}
              <div className={`lg:hidden w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? "bg-primary shadow-[0_0_8px_hsla(var(--primary)/0.5)]" : "bg-muted-foreground/30"
                }`} />

              <div className="flex flex-col items-center lg:items-start overflow-visible pt-1">
                <span className={`text-[9px] lg:text-[10px] uppercase tracking-widest font-mono transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground/50 group-hover:text-muted-foreground"
                  }`}>
                  {track.label}
                </span>
                <motion.span
                  className={`text-xs lg:text-sm font-heading whitespace-nowrap transition-colors duration-300 ${isActive ? "text-foreground font-medium" : "text-muted-foreground/70 group-hover:text-muted-foreground"
                    }`}
                  animate={{
                    x: isActive && window.innerWidth >= 1024 ? 4 : 0,
                    opacity: isActive ? 1 : 0.7
                  }}
                >
                  {track.title}
                </motion.span>
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  );
}
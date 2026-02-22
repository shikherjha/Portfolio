import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAudioEngine } from "@/hooks/useAudioEngine";

const tracks = [
  { id: "01-intro", title: "Intro" },
  { id: "02-systems", title: "Systems" },
  { id: "03-projects", title: "Projects" },
  { id: "04-competition", title: "Competition" },
  { id: "05-journey", title: "Journey" },
  { id: "06-connect", title: "Connect" },
];

export function TrackList() {
  const [activeTrack, setActiveTrack] = useState(tracks[0].id);
  const { triggerSectionTransition } = useAudioEngine();

  useEffect(() => {
    const handleScroll = () => {
      const sections = tracks.map(t => document.getElementById(t.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          if (activeTrack !== tracks[i].id) {
            setActiveTrack(tracks[i].id);
            triggerSectionTransition();
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTrack, triggerSectionTransition]);

  const scrollToTrack = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed left-0 top-0 lg:left-8 lg:top-1/2 lg:-translate-y-1/2 z-40 w-full lg:w-auto bg-background/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-0 border-b lg:border-none border-border">
      <div className="flex lg:flex-col gap-4 lg:gap-6 relative p-4 lg:p-0 overflow-x-auto no-scrollbar">
        {/* Track Line (Desktop) */}
        <div className="hidden lg:block absolute left-[3px] top-4 bottom-4 w-[1px] bg-border/50 z-[-1]" />
        
        {tracks.map((track, i) => (
          <button
            key={track.id}
            data-testid={`link-track-${track.id}`}
            onClick={() => scrollToTrack(track.id)}
            className="group flex items-center gap-3 lg:gap-4 text-left relative shrink-0"
          >
            {/* Indicator Dot */}
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeTrack === track.id ? "bg-primary scale-125 shadow-[0_0_8px_hsla(var(--primary)/0.5)]" : "bg-muted-foreground/30 group-hover:bg-muted-foreground"
            }`} />
            
            <div className="flex flex-col overflow-hidden">
              <span className={`text-[10px] uppercase tracking-widest font-medium transition-colors duration-300 ${
                activeTrack === track.id ? "text-primary" : "text-muted-foreground/50 group-hover:text-muted-foreground"
              }`}>
                0{i + 1}
              </span>
              <motion.span 
                className={`text-sm font-heading transition-colors duration-300 ${
                  activeTrack === track.id ? "text-foreground font-medium" : "text-muted-foreground/70 group-hover:text-muted-foreground"
                }`}
                animate={{
                  x: activeTrack === track.id ? 4 : 0,
                  opacity: activeTrack === track.id ? 1 : 0.7
                }}
              >
                {track.title}
              </motion.span>
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
}
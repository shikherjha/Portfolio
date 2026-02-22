import { AmbientProvider, useAmbient } from "@/components/portfolio/AmbientContext";
import { AmbientToggle } from "@/components/portfolio/AmbientToggle";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { Hero } from "@/components/portfolio/Hero";
import { IntroSection } from "@/components/portfolio/IntroSection";
import { SystemsSection } from "@/components/portfolio/SystemsSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { CompetitionSection } from "@/components/portfolio/CompetitionSection";
import { JourneySection } from "@/components/portfolio/JourneySection";
import { ConnectSection } from "@/components/portfolio/ConnectSection";
import { TrackList } from "@/components/portfolio/TrackList";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import { useScrollIntensity } from "@/hooks/useScrollIntensity";
import { useEffect } from "react";

function AmbientEffects() {
  const { isAmbient } = useAmbient();
  const intensity = useScrollIntensity();
  
  if (!isAmbient) return null;
  
  return (
    <>
      <div className="noise-overlay" style={{ opacity: 0.02 + intensity * 0.03 }} />
      <div className="dust-particles" style={{ opacity: 0.1 + intensity * 0.2 }} />
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, hsla(var(--primary)/${0.05 + intensity * 0.1}), transparent 70%)`,
          opacity: isAmbient ? 1 : 0
        }} 
      />
    </>
  );
}

function HomeContent() {
  const { initAudio } = useAudioEngine();
  
  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio();
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [initAudio]);

  return (
    <div className="bg-background min-h-screen text-foreground relative selection:bg-primary/30 selection:text-primary-foreground">
      <CustomCursor />
      <AmbientEffects />
      <AmbientToggle />
      <TrackList />
      
      <main className="relative z-10 lg:pl-24 transition-all duration-500">
        <Hero />
        <IntroSection />
        <SystemsSection />
        <ProjectsSection />
        <CompetitionSection />
        <JourneySection />
        <ConnectSection />
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <AmbientProvider>
      <HomeContent />
    </AmbientProvider>
  );
}
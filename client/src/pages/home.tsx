import { AmbientProvider } from "@/components/portfolio/AmbientContext";
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
import { useAmbient } from "@/components/portfolio/AmbientContext";

function AmbientEffects() {
  const { isAmbient } = useAmbient();
  
  if (!isAmbient) return null;
  
  return (
    <>
      <div className="noise-overlay" />
      <div className="dust-particles" />
    </>
  );
}

export default function Home() {
  return (
    <AmbientProvider>
      <div className="bg-background min-h-screen text-foreground relative selection:bg-primary/30 selection:text-primary-foreground">
        <CustomCursor />
        <AmbientEffects />
        <AmbientToggle />
        <TrackList />
        
        <main className="relative z-10 lg:pl-24">
          <Hero />
          <IntroSection />
          <SystemsSection />
          <ProjectsSection />
          <CompetitionSection />
          <JourneySection />
          <ConnectSection />
        </main>
      </div>
    </AmbientProvider>
  );
}
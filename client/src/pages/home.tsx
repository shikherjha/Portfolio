import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { Hero } from "@/components/portfolio/Hero";
import { IntroSection } from "@/components/portfolio/IntroSection";
import { SystemsSection } from "@/components/portfolio/SystemsSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { CompetitionSection } from "@/components/portfolio/CompetitionSection";
import { JourneySection } from "@/components/portfolio/JourneySection";
import { ConnectSection } from "@/components/portfolio/ConnectSection";
import { TrackList } from "@/components/portfolio/TrackList";

function HomeContent() {
  return (
    <div className="bg-background min-h-screen text-foreground relative selection:bg-primary/30 selection:text-primary-foreground">
      <CustomCursor />
      <TrackList />

      <main className="relative z-10 pt-24 lg:pt-0 lg:pl-48 xl:pl-64 transition-all duration-500">
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
  return <HomeContent />;
}
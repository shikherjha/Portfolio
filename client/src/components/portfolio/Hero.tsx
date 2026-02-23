import { motion, useTransform } from "framer-motion";
import { useScrollIntensity } from "@/hooks/useScrollIntensity";

export function Hero() {
  const intensity = useScrollIntensity();

  return (
    <section id="prelude" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      <div className="container px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-xs font-medium uppercase tracking-widest text-muted-foreground mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Now Playing
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight text-foreground mb-6 leading-[1.1] uppercase">
              SHIKHER JHA
            </h1>

            <div className="flex flex-col gap-1 text-xl md:text-2xl text-muted-foreground font-light mb-8">
              <span>Systems Engineer.</span>
              <span>AI Architect.</span>
              <span>Competitive Programmer.</span>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border/30 text-sm text-muted-foreground max-w-md mb-10">
              Currently composing scalable AI systems & solving hard problems.
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                data-testid="button-enter-studio"
                className="group px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => {
                  document.getElementById('side-b')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Enter the Studio
              </button>
              <button
                data-testid="button-view-metrics"
                className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 border border-border transition-all duration-300"
                onClick={() => {
                  document.getElementById('charts')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Metrics
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Waveform */}
        <motion.div
          className="flex-1 hidden md:flex justify-end items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <div className="relative w-full max-w-[300px] h-[300px] flex items-center justify-center">
            {/* Minimal Waveform Visualization */}
            <motion.div
              className="flex items-center gap-1.5 h-32 w-full origin-center"
              style={{ scaleY: useTransform(intensity, v => 1 + v) }}
            >
              {[...Array(24)].map((_, i) => {
                const isCenter = Math.abs(i - 12) < 4;
                const baseHeight = isCenter ? 40 : 15;

                return (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-primary/40 rounded-full"
                    animate={{
                      height: `${baseHeight}%`,
                      opacity: 0.4
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15
                    }}
                  />
                );
              })}
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
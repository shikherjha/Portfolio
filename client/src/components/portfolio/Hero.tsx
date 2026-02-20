import { motion } from "framer-motion";
import { useAmbient } from "./AmbientContext";

export function Hero() {
  const { isAmbient } = useAmbient();

  return (
    <section id="01-intro" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Ambient Effects */}
      {isAmbient && (
        <motion.div 
          className="absolute inset-0 z-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="radial-glow animate-pulse" style={{ animationDuration: '8s' }}></div>
        </motion.div>
      )}

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
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight text-foreground mb-4 leading-[1.1]">
              Engineering<br />Intelligence.
            </h1>
            
            <h2 className="text-xl md:text-2xl text-muted-foreground font-light mb-8">
              AI/ML Engineer crafting systems in silence.
            </h2>
            
            <div className="p-4 rounded-xl bg-card border border-border/30 text-sm text-muted-foreground max-w-md mb-10">
              Currently composing scalable AI systems & solving hard problems.
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                data-testid="button-enter-studio"
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-300"
                onClick={() => {
                  document.getElementById('02-systems')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Enter the Studio
              </button>
              <button 
                data-testid="button-view-metrics"
                className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 border border-border transition-colors duration-300"
                onClick={() => {
                  document.getElementById('04-competition')?.scrollIntoView({ behavior: 'smooth' });
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
            <div className="flex items-center gap-1.5 h-32 w-full">
              {[...Array(24)].map((_, i) => {
                const isCenter = Math.abs(i - 12) < 4;
                const height = isCenter 
                  ? 40 + Math.random() * 60 
                  : 10 + Math.random() * 30;
                  
                return (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-primary/40 rounded-full"
                    animate={isAmbient ? {
                      height: [`${height}%`, `${height * (0.5 + Math.random() * 0.5)}%`, `${height}%`],
                      opacity: [0.4, 0.8, 0.4]
                    } : {
                      height: `${height}%`,
                      opacity: 0.4
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.05
                    }}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
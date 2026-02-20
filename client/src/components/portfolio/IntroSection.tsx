import { motion } from "framer-motion";

export function IntroSection() {
  return (
    <section id="02-intro" className="w-full min-h-screen flex items-center justify-center py-24">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="inline-block mx-auto mb-4">
            <span className="text-sm font-medium uppercase tracking-widest text-primary opacity-80">
              Track 01 — Mindset
            </span>
            <div className="h-px w-12 bg-primary/30 mx-auto mt-2" />
          </div>

          <p className="text-3xl md:text-5xl font-heading font-light leading-snug text-foreground/90">
            Systems thinking. <br />
            <span className="text-muted-foreground">Precision.</span><br />
            Late-night builder energy.
          </p>
          
          <div className="mx-auto max-w-2xl text-lg text-muted-foreground font-light leading-relaxed">
            <p>
              I believe in building software that feels inevitable. Not just assembled components, 
              but deeply integrated systems where every detail is considered and optimized.
              It's about finding clarity in complex domains and engineering intelligence that scales.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
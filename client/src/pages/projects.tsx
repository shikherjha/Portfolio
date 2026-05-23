import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { allProjects } from "@/data/portfolio";

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground relative selection:bg-primary/30 selection:text-primary-foreground">
      <CustomCursor />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vh] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <a
          href="/#discography"
          onClick={(e) => {
            if (window.history.length > 2) {
              e.preventDefault();
              window.history.back();
            }
          }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group mb-12 cursor-pointer w-fit"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm uppercase tracking-widest">Back to Portfolio</span>
        </a>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <span className="text-sm font-mono uppercase tracking-widest text-primary opacity-80 block mb-4">
            Full Discography
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-4">
            All Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A complete catalogue of production systems, control planes, experiments, and automation work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {allProjects.map((proj, i) => (
            <motion.article
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/40 p-6 md:p-8 lg:p-10 transition-colors hover:bg-card/70 hover:border-border"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.3fr]">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsla(var(--primary)/0.7)]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-primary/90">
                      {String(i + 1).padStart(2, "0")} / {proj.tag}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4 group-hover:text-primary transition-colors">
                    {proj.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-secondary/70 text-secondary-foreground text-xs rounded-full border border-border/70">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono hover:text-primary transition-colors">
                        <Github className="w-4 h-4" /> Source
                      </a>
                    )}
                    {(proj.live || proj.link) && (
                      <a href={proj.live || proj.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono hover:text-accent transition-colors">
                        <ExternalLink className="w-4 h-4" /> Open
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                    {proj.longDesc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {proj.metrics.map((metric) => (
                      <div key={`${proj.id}-${metric.label}`} className="rounded-md bg-background/50 border border-border/50 p-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                          {metric.label}
                        </span>
                        <span className="block text-xl font-heading text-foreground tracking-tight mt-1">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

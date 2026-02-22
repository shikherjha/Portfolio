import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Github, ExternalLink, Network } from "lucide-react";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import { ProceduralCanvas } from "./ProceduralCanvas";

const projects = [
  {
    id: "proj-1",
    title: "Neural Search Orchestrator",
    desc: "A distributed system for low-latency semantic search across billions of vectors.",
    stack: ["Go", "Rust", "TensorFlow", "gRPC"],
    github: "#",
    longDesc: "Designed and implemented a custom orchestrator that distributes semantic search queries across a cluster of Rust-based vector search nodes. Reduced p99 latency by 45% compared to off-the-shelf solutions.",
  },
  {
    id: "proj-2",
    title: "Autonomous Agent Framework",
    desc: "Framework for building multi-agent systems with complex planning and execution capabilities.",
    stack: ["Python", "LangChain", "FastAPI", "Redis"],
    github: "#",
    longDesc: "A modular framework allowing developers to deploy autonomous agents that can collaborate, share state via Redis, and execute complex multi-step plans with human-in-the-loop fallback mechanisms.",
  },
  {
    id: "proj-3",
    title: "High-Frequency Trading Engine",
    desc: "C++ matching engine optimized for minimal jitter and maximum throughput.",
    stack: ["C++20", "Lock-free structures", "Kernel bypass"],
    github: "#",
    longDesc: "A personal research project exploring extreme performance optimization. Features lock-free ring buffers, custom memory allocators, and basic kernel bypass techniques for sub-microsecond latency.",
  },
  {
    id: "proj-4",
    title: "Lo-Fi Beats Generator",
    desc: "Generative AI model for creating endless non-distracting lofi study tracks.",
    stack: ["PyTorch", "AudioCrafter", "React"],
    github: "#",
    longDesc: "Trained a custom diffusion model on a curated dataset of lofi samples to generate continuous, coherent tracks. The frontend allows users to tweak generation parameters like 'warmth' and 'vinyl crackle'.",
  }
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { triggerHoverSound } = useAudioEngine();

  return (
    <section id="03-projects" className="w-full min-h-screen py-24 flex items-center">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium uppercase tracking-widest text-primary opacity-80 block mb-2">
            Track 03
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
            Composed Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              data-testid={`card-project-${proj.id}`}
              className="group cursor-pointer bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, rotateX: 1, rotateY: 1 }}
              onHoverStart={() => triggerHoverSound()}
              onClick={() => setSelectedProject(proj)}
            >
              <ProceduralCanvas seed={proj.title} />
              
              {/* Warm accent line on top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary/80 to-primary/20 opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-heading font-medium mb-3 text-foreground group-hover:text-primary transition-colors">
                  {proj.title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {proj.desc}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {proj.stack.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground border border-border/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div 
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div 
              className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button 
                data-testid="button-close-modal"
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </button>

              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-heading font-medium mb-4">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.stack.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground border border-border">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none mb-10">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {selectedProject.longDesc}
                  </p>
                </div>

                <div className="w-full h-64 bg-secondary/30 rounded-xl border border-dashed border-border flex flex-col items-center justify-center mb-10">
                  <Network className="w-10 h-10 text-muted-foreground/50 mb-4" />
                  <span className="text-sm font-mono text-muted-foreground/50">[ Architecture Diagram ]</span>
                </div>

                <div className="flex gap-4">
                  <a 
                    href={selectedProject.github}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                  <a 
                    href="#"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
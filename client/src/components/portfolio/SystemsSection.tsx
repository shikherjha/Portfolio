import { motion } from "framer-motion";
import { Cpu, Network, Zap } from "lucide-react";

const systems = [
  {
    title: "AI Systems",
    icon: <Cpu className="w-6 h-6 text-primary" />,
    capabilities: ["LLM Orchestration", "Agentic Workflows", "Vector Search Optimization"]
  },
  {
    title: "Distributed Arch",
    icon: <Network className="w-6 h-6 text-accent" />,
    capabilities: ["Event-Driven Patterns", "High Availability", "Microservices"]
  },
  {
    title: "Optimization Engine",
    icon: <Zap className="w-6 h-6 text-highlight" />,
    capabilities: ["Latency Reduction", "Resource Allocation", "Algorithm Design"]
  }
];

export function SystemsSection() {
  return (
    <section id="02-systems" className="w-full min-h-screen py-24 flex items-center">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm font-medium uppercase tracking-widest text-primary opacity-80 block mb-2">
            Track 02
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
            Systems Architecture
          </h2>
        </motion.div>

        {/* Abstract Mixing Board Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Connector Lines (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-border/30 -z-10" />

          {systems.map((sys, idx) => (
            <motion.div
              key={sys.title}
              className="group relative bg-card border border-border rounded-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2, type: "spring", stiffness: 50 }}
            >
              {/* Top Accent Glow on Hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="mb-6 bg-secondary/50 w-12 h-12 rounded-lg flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-colors">
                {sys.icon}
              </div>
              
              <h3 className="text-xl font-heading font-medium mb-6 group-hover:text-primary transition-colors">
                {sys.title}
              </h3>
              
              <ul className="space-y-4">
                {sys.capabilities.map((cap, cIdx) => (
                  <li key={cIdx} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary/50 transition-colors" />
                    {cap}
                  </li>
                ))}
              </ul>

              {/* Minimal Schematic Visual */}
              <div className="mt-10 h-24 w-full border border-dashed border-border/50 rounded flex flex-col items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity relative overflow-hidden">
                 <div className="w-full h-px bg-border/50 absolute top-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-colors" />
                 <motion.div 
                   className="w-8 h-8 rounded bg-secondary border border-border z-10"
                   whileHover={{ rotate: 90 }}
                   transition={{ duration: 0.5 }}
                 />
                 <motion.div 
                   className="absolute left-0 top-1/2 w-full h-[1px] bg-primary"
                   initial={{ scaleX: 0, opacity: 0 }}
                   whileInView={{ scaleX: 1, opacity: [0, 1, 0] }}
                   transition={{ duration: 2, repeat: Infinity }}
                 />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
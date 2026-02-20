import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function ConnectSection() {
  return (
    <section id="06-connect" className="w-full min-h-screen py-24 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-30" />
      
      <div className="container px-4 md:px-6 mx-auto text-center relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-sm font-medium uppercase tracking-widest text-primary opacity-80 block mb-6">
            Track 06 — Outro
          </span>
          <h2 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-6">
            Let's Build Something <br className="hidden md:block"/> Meaningful.
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-16 font-light max-w-xl mx-auto">
            Open to collaborations in AI, systems architecture, and intelligent infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="mailto:hello@example.com"
              data-testid="link-email"
              className="group relative px-8 py-4 rounded-xl bg-card border border-border flex items-center gap-3 w-full sm:w-auto justify-center hover:border-primary/50 transition-colors"
            >
              <div className="absolute inset-0 bg-primary/0 rounded-xl group-hover:bg-primary/5 transition-colors" />
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-medium group-hover:text-foreground transition-colors">Email Me</span>
            </a>
            
            <a 
              href="https://github.com"
              target="_blank"
              data-testid="link-github"
              className="group relative px-8 py-4 rounded-xl bg-card border border-border flex items-center gap-3 w-full sm:w-auto justify-center hover:border-accent/50 transition-colors"
            >
              <div className="absolute inset-0 bg-accent/0 rounded-xl group-hover:bg-accent/5 transition-colors" />
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              <span className="font-medium group-hover:text-foreground transition-colors">GitHub</span>
            </a>

            <a 
              href="https://linkedin.com"
              target="_blank"
              data-testid="link-linkedin"
              className="group relative px-8 py-4 rounded-xl bg-card border border-border flex items-center gap-3 w-full sm:w-auto justify-center hover:border-highlight/50 transition-colors"
            >
              <div className="absolute inset-0 bg-highlight/0 rounded-xl group-hover:bg-highlight/5 transition-colors" />
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-highlight transition-colors" />
              <span className="font-medium group-hover:text-foreground transition-colors">LinkedIn</span>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-32 text-sm text-muted-foreground/50 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-8 h-[1px] bg-border" />
          <p>© {new Date().getFullYear()} — Engineered with intention.</p>
        </motion.div>
      </div>
    </section>
  );
}
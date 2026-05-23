import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { profileLinks } from "@/data/portfolio";

export function ConnectSection() {
  return (
    <section id="encore" className="w-full min-h-screen py-24 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-30" />

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-primary opacity-80 block mb-6">
            Final Track - Backstage
          </span>
          <h2 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-6">
            Still building. <br className="hidden md:block" /> Still learning. <br className="hidden md:block" /> Still curious.
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 font-light max-w-xl mx-auto">
            Open to collaborations in AI, systems architecture, and intelligent infrastructure.
          </p>

          <div className="mx-auto max-w-4xl rounded-lg border border-border/60 bg-card/30 p-3 md:p-4 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between border-b border-border/50 px-3 py-2 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Profile Deck
              </span>
              <span className="h-1.5 w-16 rounded-full bg-gradient-to-r from-primary/80 via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {profileLinks.map((profile) => {
                const Icon = profile.icon;
                return (
                  <a
                    key={profile.label}
                    href={profile.href}
                    target={profile.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={profile.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-3 rounded-md border border-border/50 bg-background/45 px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-background/80"
                  >
                    <Icon className={`h-5 w-5 shrink-0 ${profile.tone} opacity-80 group-hover:opacity-100`} />
                    <span className="min-w-0">
                      <span className="block font-heading text-sm text-foreground group-hover:text-primary transition-colors">
                        {profile.label}
                      </span>
                      <span className="block truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {profile.handle}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="mailto:jhashikher@gmail.com"
              data-testid="link-email"
              className="group relative px-7 py-3 rounded-lg bg-primary text-primary-foreground flex items-center gap-3 hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">Email Me</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-24 text-sm text-muted-foreground/50 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-8 h-[1px] bg-border" />
          <p>Copyright {new Date().getFullYear()} - Engineered with intention.</p>
        </motion.div>
      </div>
    </section>
  );
}

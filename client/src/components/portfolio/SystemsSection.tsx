import { motion } from "framer-motion";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import {
  SiPython, SiGo, SiCplusplus, SiGnubash, SiLinux, SiGit,
  SiFastapi, SiReact, SiDocker, SiRedis, SiAmazonwebservices,
  SiPytorch, SiPandas, SiScikitlearn, SiLangchain,
  SiKubernetes, SiPostgresql, SiMongodb, SiN8N, SiSupabase
} from "react-icons/si";

const skillGroups = [
  {
    category: "Languages & Core",
    skills: [
      { name: "Python", icon: <SiPython className="w-5 h-5" /> },
      { name: "C++", icon: <SiCplusplus className="w-5 h-5" /> },
      { name: "Go", icon: <SiGo className="w-5 h-5" /> },
      { name: "Bash", icon: <SiGnubash className="w-5 h-5" /> },
      { name: "Git", icon: <SiGit className="w-5 h-5" /> },
    ]
  },
  {
    category: "Backend & Cloud",
    skills: [
      { name: "FastAPI", icon: <SiFastapi className="w-5 h-5" /> },
      { name: "React", icon: <SiReact className="w-5 h-5" /> },
      { name: "Docker", icon: <SiDocker className="w-5 h-5" /> },
      { name: "AWS", icon: <SiAmazonwebservices className="w-5 h-5" /> },
      { name: "Linux", icon: <SiLinux className="w-5 h-5" /> },
      { name: "Kubernetes", icon: <SiKubernetes className="w-5 h-5" /> },
    ]
  },
  {
    category: "Data & Storage",
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql className="w-5 h-5" /> },
      { name: "MongoDB", icon: <SiMongodb className="w-5 h-5" /> },
      { name: "Redis", icon: <SiRedis className="w-5 h-5" /> },
      { name: "Supabase", icon: <SiSupabase className="w-5 h-5" /> },
    ]
  },
  {
    category: "AI & Automation",
    skills: [
      { name: "LangChain", icon: <SiLangchain className="w-5 h-5" /> },
      { name: "PyTorch", icon: <SiPytorch className="w-5 h-5" /> },
      { name: "Pandas", icon: <SiPandas className="w-5 h-5" /> },
      { name: "n8n", icon: <SiN8N className="w-5 h-5" /> },
      { name: "Scikit-Learn", icon: <SiScikitlearn className="w-5 h-5" /> },
    ]
  }
];

function SkillPill({ name, icon, index }: { name: string, icon: React.ReactNode, index: number }) {
  const { triggerHoverSound } = useAudioEngine();

  return (
    <motion.div
      className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-card/40 border border-border/50 hover:bg-card hover:border-border cursor-pointer overflow-hidden transition-all shadow-sm hover:shadow-[0_0_15px_hsla(var(--primary)/0.15)]"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
      whileHover={{ y: -2 }}
      onHoverStart={() => triggerHoverSound()}
    >
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 text-muted-foreground group-hover:text-primary transition-colors group-hover:rotate-12 group-hover:scale-110 duration-300">
        {icon}
      </div>
      <span className="relative z-10 font-heading text-sm font-medium text-foreground group-hover:text-primary transition-colors">
        {name}
      </span>
    </motion.div>
  );
}

export function SystemsSection() {
  return (
    <section id="side-b" className="w-full min-h-[50vh] py-24 flex items-center">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <motion.div
          className="mb-16 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary opacity-80 block mb-4">
            Side B — Studio Stack
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tight">
            Instruments
          </h2>
        </motion.div>

        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          {skillGroups.map((group, gIdx) => (
            <motion.div
              key={group.category}
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gIdx * 0.2 }}
            >
              <h3 className="text-xl font-heading text-muted-foreground/80 lowercase tracking-widest">
                {group.category}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center text-sm font-mono text-muted-foreground/50 mr-2">inst.</div>
                {group.skills.map((skill, sIdx) => (
                  <SkillPill key={skill.name} name={skill.name} icon={skill.icon} index={sIdx} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
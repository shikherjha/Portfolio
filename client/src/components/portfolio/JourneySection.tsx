import { motion } from "framer-motion";

const experiences = [
  {
    year: "May '26 - Present",
    role: "SDE Intern",
    org: "Auric AI Labs",
    impact: [
      "Developing geospatial data pipelines for large-scale satellite imagery processing with FastAPI, Rasterio, async workflows, and distributed storage.",
      "Engineering backend systems for TIFF image QC, resampling, tiling, metadata management, and annotation workflows.",
      "Optimizing MongoDB queries, cron-driven services, observability, and export pipelines for reliable computer vision research operations.",
    ],
  },
  {
    year: "Jan '26 - Present",
    role: "LLM Benchmarking Freelancer",
    org: "Snorkel AI",
    impact: [
      "Engineered CLI-based adversarial testing environments leveraging isolated Docker containers.",
      "Formulated synthetic failure conditions to evaluate boundary logic in Claude and OpenAI models.",
      "Executed benchmarking metrics validating language models for high-precision systemic accuracy.",
    ],
  },
  {
    year: "May '25 - Nov '25",
    role: "Backend and Automation Engineer Intern",
    org: "Tealbox Digital",
    impact: [
      "Architected and scaled a production FastAPI backend with REST APIs, webhooks, and async task pipelines.",
      "Built Slack-native AI automation systems using n8n, LangChain, and LangGraph.",
      "Integrated Playwright scraping and vector search workflows to cut reporting effort by 80%.",
    ],
  },
  {
    year: "Feb '25 - May '25",
    role: "AI Research Intern",
    org: "Coding Jr.",
    impact: [
      "Conducted AI systems research focused on agentic network deployments.",
      "Spearheaded the research and development pipeline for Planto.ai.",
      "Architected workflows leveraging LLMs for intelligent business logic generation.",
    ],
  },
];

export function JourneySection() {
  return (
    <section id="journey" className="w-full min-h-screen py-24 flex items-center">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium uppercase tracking-widest text-primary opacity-80 block mb-2">
            Timeline - Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
            Tour History
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-border/50 md:-translate-x-1/2" />

          <div className="space-y-16">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={`${exp.org}-${exp.year}`}
                  className={`flex flex-col md:flex-row relative ${isEven ? "md:flex-row-reverse" : ""}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="absolute left-[16px] md:left-1/2 w-2.5 h-2.5 rounded-full bg-primary top-6 md:-translate-x-1/2 shadow-[0_0_10px_hsla(var(--primary)/0.8)] z-10" />

                  <div className={`md:w-1/2 ${isEven ? "pl-12 md:pl-16" : "pl-12 md:pr-16 md:text-right"}`}>
                    <div className="bg-card border border-border p-6 rounded-lg hover:border-primary/30 transition-colors">
                      <span className="text-primary font-mono text-sm block mb-1">{exp.year}</span>
                      <h3 className="text-xl font-heading font-medium text-foreground mb-1">{exp.role}</h3>
                      <p className="text-muted-foreground mb-4 font-medium">{exp.org}</p>

                      <ul className={`space-y-2 text-sm text-muted-foreground ${isEven ? "text-left" : "text-left md:text-right"}`}>
                        {exp.impact.map((point) => (
                          <li key={point} className="flex gap-2">
                            {isEven && <span className="text-primary mt-1 opacity-70">-</span>}
                            <span>{point}</span>
                            {!isEven && <span className="text-primary mt-1 opacity-70 hidden md:inline">-</span>}
                            {!isEven && <span className="text-primary mt-1 opacity-70 inline md:hidden">-</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

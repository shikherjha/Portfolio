import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Network } from "lucide-react";
import { CustomCursor } from "@/components/portfolio/CustomCursor";

const allProjects = [
    {
        id: "proj-1",
        title: "Axon AI",
        tag: "AI EDUCATION",
        stack: ["Python", "FastAPI", "Redis", "LangChain", "PostgreSQL"],
        github: "",
        live: "https://axon-ai-frontend.vercel.app/",
        desc: "An integrated, agentic learning platform built to deliver personalized, explainable, and emotionally-aware AI-powered education at scale.",
        longDesc: "AxonAI connects four working pillars (AI Tutor, Global Search, Curate Test, Learning Pathway) through a unified ingestion, memory, and orchestration fabric. It routes queries via a DistilBERT classifier to specialized LangGraph/MCP sub-agents, handling multimodal parsing, contextual RAG, and emotionally intelligent feedback.",
        metrics: [
            { label: "Concurrent Users", value: "25+" },
            { label: "Platform Uptime", value: "99.9%" },
            { label: "UI Latency", value: "-40%" }
        ],
    },
    {
        id: "proj-2",
        title: "Signal",
        tag: "JOB FEED",
        stack: ["Go", "Python", "React", "PostgreSQL", "OpenAI"],
        github: "",
        live: "https://getsig.in",
        desc: "A curated job opportunity feed designed to surface real hiring opportunities hidden behind inefficient systems.",
        longDesc: "An AI-powered high-signal platform tailored for discovering premium roles. Built with a hybrid Go and FastAPI backend, it processes inputs using Tesseract OCR and OpenAI Vision with highly optimized web scraping. Enforces secure, auto-expiring workflows protected under an admin-only portal.",
        metrics: [
            { label: "Active Users", value: "100+" },
            { label: "Feed Latency", value: "-60%" },
            { label: "Signals/Day", value: "50-70" }
        ],
    },
    {
        id: "proj-3",
        title: "Multi-Tenant Provision Store",
        tag: "ORCHESTRATION",
        stack: ["Go", "Kubernetes", "MedusaJS", "Helm", "FastAPI"],
        github: "https://github.com/shikherjha/Multi-tenant-provision-store",
        live: "",
        desc: "Isolated namespace e-commerce orchestration engine inside Kubernetes.",
        longDesc: "Each store gets an isolated namespace with PostgreSQL, a MedusaJS backend, and a storefront. Implements a control plane supporting granular drift detection, strict NetworkPolicies, and Redis Streams integration. Demonstrates mastery over K8s objects, idempotency, and system recovery workflows.",
        metrics: [
            { label: "Success Rate", value: ">99%" },
            { label: "Concurrent Provisions", value: "10+" },
            { label: "Isolation", value: "Namespace" }
        ],
    },
    {
        id: "proj-4",
        title: "AirShare",
        tag: "ROUTING",
        stack: ["Go", "PostgreSQL", "Redis", "Docker"],
        github: "https://github.com/shikherjha/AirShare",
        live: "",
        desc: "Smart Airport Ride Pooling Backend grouping passengers into shared cabs while optimizing routes.",
        longDesc: "A high-performance Go backend executing a custom Greedy Insertion Heuristic algorithmic strategy to compute optimal spatial vehicle routes. Solves NP-Hard constraints leveraging Redis GEO indexing in low-latency runtime while integrating surge pricing scaling.",
        metrics: [
            { label: "Algorithmic Precision", value: "Optimal" },
            { label: "Routing Engine", value: "Heuristic" },
            { label: "Scaling", value: "Dynamic" }
        ],
    },
    {
        id: "proj-5",
        title: "Multi-Time Frame Trading Bot",
        tag: "QUANT",
        stack: ["Python", "Binance API", "Pandas"],
        github: "https://github.com/shikherjha/Multi-time-frame-trading",
        live: "",
        desc: "Rule-based systematic trading engine focused on determinism and exact live-backtest parity.",
        longDesc: "Engineered a persistent state-sync execution model running in continuous loops against live Binance testnet feeds, bridging historical simulation environments directly into forward-tested environments to ensure zero divergence between paper and practical deployments.",
        metrics: [
            { label: "Execution Divergence", value: "Zero" },
            { label: "State Sync", value: "Continuous" },
            { label: "API Calls Latency", value: "<15ms" }
        ],
    },
    {
        id: "proj-6",
        title: "Host Integrity Verification Client",
        tag: "CYBERSECURITY",
        stack: ["C++", "Windows OS", "MFC API"],
        github: "https://github.com/shikherjha/Host-Integrity-Verification-Client",
        live: "",
        desc: "Proof-of-concept client detecting virtual machines, RDPs, and evasion vectors in real time.",
        longDesc: "Designed an MFC Dialog app performing deep system CPUID instruction calls and hardware-level driver analysis. Combines registry artifact hunting, ACPI probing, and timing anomalies to map system tampering vectors back into an aggregated threat consensus score.",
        metrics: [
            { label: "Detection Precision", value: "High" },
            { label: "Registry Scrapes", value: "Automated" },
            { label: "Architecture", value: "Low-Level Native" }
        ],
    },
    {
        id: "proj-7",
        title: "Video Summarizer Bot",
        tag: "AUTOMATION",
        stack: ["n8n", "Gemini AI", "Firecrawl", "Telegram API"],
        github: "https://github.com/shikherjha/n8n-video-Summarizer-Bot",
        live: "",
        desc: "End-to-end n8n workflow transforming web links into AI-generated talking-avatar summaries.",
        longDesc: "Connected Telegram triggers parsing raw URLs into markdown via Firecrawl. Processes semantic context through Google Gemini and produces final YouTube-published media utilizing D-ID. Supports dynamic payload routing based on webhook responses.",
        metrics: [
            { label: "Turnaround Time", value: "<60s" },
            { label: "Workflow Integrations", value: "4+" },
            { label: "AI Parsing", value: "Semantically Dense" }
        ],
    },
    {
        id: "proj-8",
        title: "Reporting & Analytics Brain",
        tag: "DATA ENG",
        stack: ["FastAPI", "Slack API", "Playwright", "Supabase", "OpenAI"],
        github: "https://github.com/shikherjha/Automated-reporting-and-analytics",
        live: "",
        desc: "Automated analysis pipeline distributing Looker Studio metric diagnostics natively inside Slack.",
        longDesc: "Engineered headless Chromium browser flows interacting dynamically with Looker Studio DOM trees depending on requested date-ranges. Ingests raw graphical matrices through a Supabase RAG Vector Store context, issuing real-time diagnostic AI suggestions directly onto client workspaces.",
        metrics: [
            { label: "Analyst Effort", value: "-80%" },
            { label: "Vector Search", value: "Sub-Second" },
            { label: "Web Scrape", value: "Headless" }
        ],
    }
];

export default function Projects() {
    // Snap to top on fresh mount
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

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <span className="text-sm font-mono uppercase tracking-widest text-primary opacity-80 block mb-4">
                        Full Discography
                    </span>
                    <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-4">
                        All Projects
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        A complete catalogue of my creations, systems, and experiments.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-12">
                    {allProjects.map((proj, i) => (
                        <motion.div
                            key={proj.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-10 hover:bg-card hover:border-border transition-colors group"
                        >
                            <div className="lg:w-1/3 shrink-0">
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest rounded-full mb-4 border border-primary/20">
                                    {proj.tag}
                                </span>
                                <h2 className="text-3xl font-heading font-medium mb-4 group-hover:text-primary transition-colors">
                                    {proj.title}
                                </h2>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {proj.stack.map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full border border-border">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    {proj.github && (
                                        <a href={proj.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono hover:text-primary transition-colors">
                                            <Github className="w-4 h-4" /> Source Code
                                        </a>
                                    )}
                                    {proj.live && (
                                        <a href={proj.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono hover:text-accent transition-colors">
                                            <ExternalLink className="w-4 h-4" /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="lg:w-2/3">
                                <p className="text-lg text-muted-foreground mb-6">
                                    {proj.longDesc}
                                </p>

                                {proj.metrics && proj.metrics.length > 0 ? (
                                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {proj.metrics.map((m, idx) => (
                                            <div key={idx} className="bg-secondary/40 border border-border/50 rounded-lg p-3 flex flex-col justify-center gap-1 backdrop-blur-sm">
                                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">{m.label}</span>
                                                <span className="text-xl font-heading text-foreground tracking-tight">{m.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full h-32 md:h-48 bg-secondary/30 rounded-xl border border-dashed border-border flex flex-col items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity mt-4">
                                        <Network className="w-8 h-8 text-muted-foreground/50 mb-3" />
                                        <span className="text-sm font-mono text-muted-foreground/50">[ Architecture Visual Placeholder ]</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}

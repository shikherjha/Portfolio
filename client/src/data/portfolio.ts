import type { ComponentType } from "react";
import { SiCodechef, SiCodeforces, SiGeeksforgeeks, SiLeetcode } from "react-icons/si";
import { Github, Linkedin, FileText, Trophy } from "lucide-react";

export type FeaturedProject = {
  id: string;
  title: string;
  tag: string;
  year: string;
  tech: string[];
  color: string;
  desc: string;
  link: string;
  github?: string;
  live?: string;
  longDesc: string;
  metrics: { label: string; value: string }[];
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "signal",
    title: "Signal",
    tag: "CURATED JOB FEED",
    year: "2026",
    tech: ["Go", "Python", "React", "PostgreSQL", "OpenAI"],
    color: "from-amber-900/45 to-neutral-950",
    desc: "A high-signal job feed surfacing real, vetted hiring opportunities hidden behind noisy systems.",
    link: "https://getsig.in",
    live: "https://getsig.in",
    longDesc: "An AI-powered high-signal platform tailored for discovering premium roles. Built with a hybrid Go and FastAPI backend, it processes inputs using OCR and OpenAI Vision with optimized scraping and secure admin-only workflows.",
    metrics: [
      { label: "Active Users", value: "150+" },
      { label: "Feed Latency", value: "-60%" },
      { label: "Signals/Day", value: "50-70" },
    ],
  },
  {
    id: "storeos",
    title: "StoreOS",
    tag: "MULTI-TENANT CONTROL PLANE",
    year: "2025",
    tech: ["Go", "FastAPI", "Kubernetes", "MedusaJS", "Helm"],
    color: "from-emerald-900/35 to-neutral-950",
    desc: "A multi-tenant commerce control plane that provisions isolated stores inside Kubernetes.",
    link: "https://github.com/shikherjha/Multi-tenant-provision-store",
    github: "https://github.com/shikherjha/Multi-tenant-provision-store",
    longDesc: "Each store gets an isolated namespace with PostgreSQL, a MedusaJS backend, and a storefront. Implements a control plane supporting drift detection, NetworkPolicies, Redis Streams, and repeatable recovery workflows.",
    metrics: [
      { label: "Success Rate", value: ">99%" },
      { label: "Concurrent Provisions", value: "10+" },
      { label: "Isolation", value: "Namespace" },
    ],
  },
  {
    id: "axon-ai",
    title: "Axon AI",
    tag: "AI EDUCATION ENGINE",
    year: "2025",
    tech: ["Python", "FastAPI", "LangChain", "Redis", "PostgreSQL"],
    color: "from-indigo-950/55 to-neutral-950",
    desc: "An agentic platform for personalized, explainable, emotionally-aware education at scale.",
    link: "https://axon-ai-frontend.vercel.app/",
    live: "https://axon-ai-frontend.vercel.app/",
    longDesc: "Axon AI connects AI Tutor, Global Search, Curate Test, and Learning Pathway through a unified ingestion, memory, and orchestration fabric. It routes queries to specialized LangGraph/MCP sub-agents for multimodal parsing, contextual RAG, and emotionally intelligent feedback.",
    metrics: [
      { label: "Concurrent Users", value: "25+" },
      { label: "Platform Uptime", value: "99.9%" },
      { label: "UI Latency", value: "-40%" },
    ],
  },
];

export const archiveProjects: FeaturedProject[] = [
  {
    id: "airshare",
    title: "AirShare",
    tag: "ALGORITHMIC ROUTING",
    year: "2024",
    tech: ["Go", "PostgreSQL", "Redis", "Docker"],
    color: "from-slate-800 to-neutral-950",
    desc: "Smart airport ride pooling backend grouping passengers into shared cabs while optimizing routes.",
    link: "https://github.com/shikherjha/AirShare",
    github: "https://github.com/shikherjha/AirShare",
    longDesc: "A Go backend executing a custom Greedy Insertion Heuristic strategy to compute spatial vehicle routes. Solves constrained routing problems with Redis GEO indexing and dynamic pricing.",
    metrics: [
      { label: "Algorithmic Precision", value: "Optimal" },
      { label: "Routing Engine", value: "Heuristic" },
      { label: "Scaling", value: "Dynamic" },
    ],
  },
  {
    id: "trading-bot",
    title: "Multi-Time Frame Trading Bot",
    tag: "QUANT",
    year: "2024",
    tech: ["Python", "Binance API", "Pandas"],
    color: "from-slate-800 to-neutral-950",
    desc: "Rule-based trading engine focused on deterministic live-backtest parity.",
    link: "https://github.com/shikherjha/Multi-time-frame-trading",
    github: "https://github.com/shikherjha/Multi-time-frame-trading",
    longDesc: "Engineered a persistent state-sync execution model running against live Binance testnet feeds, bridging historical simulation into forward-tested environments.",
    metrics: [
      { label: "Execution Divergence", value: "Zero" },
      { label: "State Sync", value: "Continuous" },
      { label: "API Latency", value: "<15ms" },
    ],
  },
  {
    id: "host-integrity",
    title: "Host Integrity Verification Client",
    tag: "CYBERSECURITY",
    year: "2024",
    tech: ["C++", "Windows OS", "MFC API"],
    color: "from-slate-800 to-neutral-950",
    desc: "Proof-of-concept client detecting virtual machines, RDPs, and evasion vectors.",
    link: "https://github.com/shikherjha/Host-Integrity-Verification-Client",
    github: "https://github.com/shikherjha/Host-Integrity-Verification-Client",
    longDesc: "Designed an MFC Dialog app performing CPUID calls and hardware-level driver analysis. Combines registry artifact hunting, ACPI probing, and timing anomalies into an aggregated threat score.",
    metrics: [
      { label: "Detection Precision", value: "High" },
      { label: "Registry Scrapes", value: "Automated" },
      { label: "Architecture", value: "Low-Level Native" },
    ],
  },
  {
    id: "video-summarizer",
    title: "Video Summarizer Bot",
    tag: "AUTOMATION",
    year: "2024",
    tech: ["n8n", "Gemini AI", "Firecrawl", "Telegram API"],
    color: "from-slate-800 to-neutral-950",
    desc: "n8n workflow transforming links into AI-generated talking-avatar summaries.",
    link: "https://github.com/shikherjha/n8n-video-Summarizer-Bot",
    github: "https://github.com/shikherjha/n8n-video-Summarizer-Bot",
    longDesc: "Connected Telegram triggers, Firecrawl parsing, Gemini synthesis, and D-ID media generation into a dynamic webhook-routed automation workflow.",
    metrics: [
      { label: "Turnaround Time", value: "<60s" },
      { label: "Integrations", value: "4+" },
      { label: "AI Parsing", value: "Dense" },
    ],
  },
  {
    id: "analytics-brain",
    title: "Reporting & Analytics Brain",
    tag: "DATA ENG",
    year: "2025",
    tech: ["FastAPI", "Slack API", "Playwright", "PostgreSQL", "OpenAI"],
    color: "from-slate-800 to-neutral-950",
    desc: "Automated analytics pipeline distributing metric diagnostics natively inside Slack.",
    link: "https://github.com/shikherjha/Automated-reporting-and-analytics",
    github: "https://github.com/shikherjha/Automated-reporting-and-analytics",
    longDesc: "Engineered headless Chromium flows for Looker Studio, enriched report context through vector search, and issued real-time AI diagnostics directly into Slack workspaces.",
    metrics: [
      { label: "Analyst Effort", value: "-80%" },
      { label: "Vector Search", value: "Sub-Second" },
      { label: "Web Scrape", value: "Headless" },
    ],
  },
];

export const allProjects = [...featuredProjects, ...archiveProjects];

export type ProfileLink = {
  label: string;
  handle: string;
  href: string;
  tone: string;
  icon: ComponentType<{ className?: string }>;
};

export const profileLinks: ProfileLink[] = [
  { label: "GitHub", handle: "shikherjha", href: "https://github.com/shikherjha", tone: "text-zinc-200", icon: Github },
  { label: "LinkedIn", handle: "shikher-jha", href: "https://www.linkedin.com/in/shikher-jha-1b9853292/", tone: "text-sky-300", icon: Linkedin },
  { label: "Resume", handle: "latest pdf", href: import.meta.env.VITE_RESUME_URL || "#", tone: "text-amber-300", icon: FileText },
  { label: "Codeforces", handle: "jhashikher", href: "https://codeforces.com/profile/jhashikher", tone: "text-orange-300", icon: SiCodeforces },
  { label: "LeetCode", handle: "jhashikher", href: "https://leetcode.com/u/jhashikher/", tone: "text-yellow-300", icon: SiLeetcode },
  { label: "CodeChef", handle: "jha_sahab_19", href: "https://www.codechef.com/users/jha_sahab_19", tone: "text-purple-300", icon: SiCodechef },
  { label: "AtCoder", handle: "JhaSahab", href: "https://atcoder.jp/users/JhaSahab", tone: "text-blue-300", icon: Trophy },
  { label: "GFG", handle: "jhasahaxwr9", href: "https://www.geeksforgeeks.org/user/jhasahaxwr9/", tone: "text-emerald-300", icon: SiGeeksforgeeks },
];

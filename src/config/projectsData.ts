import type { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: "proj-01",
    number: "PROJECT 01",
    title: "[PROJECT NAME 01]",
    category: "SYSTEMS & FULLSTACK",
    subtitle: "[Brief Catchy One-Line System Subtitle]",
    description: "[DESCRIPTION: Describe the core engineering challenge, system architecture, how the solution was designed, and the impact achieved. Example: High-throughput event processing platform engineered for real-time telemetry analytics.]",
    techStack: ["[TECH STACK: e.g. React]", "[TypeScript]", "[Node.js]", "[PostgreSQL]"],
    metrics: "LATENCY < 45MS // 99.9% UPTIME",
    githubUrl: "https://github.com/[YOUR GITHUB]/[PROJECT-01]",
    liveUrl: "https://[PROJECT-01-DEMO.EXAMPLE.COM]",
    caseStudyUrl: "#case-study-01",
    previewNote: "ASSET NEEDED: Project 01 screenshot/demo (16:9 ratio, recommended 1280x720 png/webp)",
    featured: true
  },
  {
    id: "proj-02",
    number: "PROJECT 02",
    title: "[PROJECT NAME 02]",
    category: "INTERACTIVE & CREATIVE",
    subtitle: "[Hardware-Accelerated Web Canvas / Audio Engine]",
    description: "[DESCRIPTION: Describe the algorithmic or visual work. Example: Procedural retro visualizer and synthesizer built using the Web Audio API and hardware canvas rendering.]",
    techStack: ["[TypeScript]", "[Web Audio API]", "[Canvas / WebGL]", "[Vite]"],
    metrics: "60 FPS RENDER // ZERO MEMORY LEAKS",
    githubUrl: "https://github.com/[YOUR GITHUB]/[PROJECT-02]",
    liveUrl: "https://[PROJECT-02-DEMO.EXAMPLE.COM]",
    caseStudyUrl: "#case-study-02",
    previewNote: "ASSET NEEDED: Project 02 screenshot or motion loop (16:9 ratio)",
    featured: true
  },
  {
    id: "proj-03",
    number: "PROJECT 03",
    title: "[PROJECT NAME 03]",
    category: "DISTRIBUTED SYSTEMS / API",
    subtitle: "[Scalable Microservice & Cache Cluster]",
    description: "[DESCRIPTION: Describe distributed backend or developer tool. Example: Lightweight caching proxy layer with automated failover and telemetry export.]",
    techStack: ["[Python / Go]", "[Redis]", "[Docker]", "[Prometheus]"],
    metrics: "10K+ REQ/SEC BENCHMARK",
    githubUrl: "https://github.com/[YOUR GITHUB]/[PROJECT-03]",
    liveUrl: "https://[PROJECT-03-DEMO.EXAMPLE.COM]",
    caseStudyUrl: "#case-study-03",
    previewNote: "ASSET NEEDED: Project 03 terminal/diagram screenshot",
    featured: false
  },
  {
    id: "proj-04",
    number: "PROJECT 04",
    title: "[PROJECT NAME 04]",
    category: "DEV TOOLS / CLI",
    subtitle: "[Terminal Workflow Automation Suite]",
    description: "[DESCRIPTION: Describe developer utility or open source CLI tool that simplifies developer developer operations or environment scaffolding.]",
    techStack: ["[Rust / Node]", "[CLI]", "[Shell]", "[GitHub Actions]"],
    metrics: "1,200+ NPM/CRATE INSTALLS",
    githubUrl: "https://github.com/[YOUR GITHUB]/[PROJECT-04]",
    liveUrl: "https://[PROJECT-04-DEMO.EXAMPLE.COM]",
    previewNote: "ASSET NEEDED: Project 04 CLI capture / terminal asset",
    featured: false
  }
];

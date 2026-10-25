import type { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  viewerCallsign: "GALLERY OF AVINASH",
  fullName: "AVINASH",
  designation: "SOFTWARE ENGINEER & CREATIVE DEVELOPER",
  tagline: "TRANSMITTING DIGITAL ARCHITECTURE ACROSS ANALOG PHOSPHORS",
  transmissionCoordinates: "LAT: 28.6139° N // LON: 77.2090° E // CH: UHF-44",
  broadcastFrequency: "CH 01 // 471.25 MHz",
  signalStatus: "CARRIER SYNCHRONIZED [99.8% FIDELITY]",

  about: {
    terminalBio: [
      "> INITIALIZING PROFILE STREAM...",
      "> WELCOME TO TRANSMISSION FREQUENCY 471.25 MHz.",
      "> I am a developer and designer passionate about crafting high-performance, deeply intentional digital experiences that merge computational rigor with cinematic aesthetic atmosphere.",
      "> This portfolio is housed inside an interactive 1980s CRT apparatus — an ode to tangible physical interfaces, tactile electronics, and the golden age of broadcast engineering."
    ],
    missionStatement: "Engineering digital systems that feel physical, memorable, and enduring.",
    specs: [
      { label: "OPERATOR", value: "AVINASH" },
      { label: "PRIMARY FOCUS", value: "FULL-STACK / SYSTEMS / CREATIVE TECH" },
      { label: "RUNTIME ENV", value: "NODE.JS / RUST / MODERN BROWSERS" },
      { label: "BASE STATION", value: "[YOUR CITY / LOCATION]" },
      { label: "STATUS", value: "AVAILABLE FOR HIGH-IMPACT OPPORTUNITIES" }
    ]
  },

  education: [
    {
      degree: "[YOUR DEGREE / B.TECH / B.S. IN COMPUTER SCIENCE]",
      institution: "[YOUR UNIVERSITY / INSTITUTE NAME]",
      period: "[20XX — 20XX]",
      details: "[Focus areas: Algorithms, Distributed Systems, Computer Networks, Software Engineering Principles]",
      status: "COMPLETED / IN PROGRESS"
    },
    {
      degree: "[HIGHER SECONDARY / RELEVANT CERTIFICATION]",
      institution: "[INSTITUTION / BOARD NAME]",
      period: "[20XX — 20XX]",
      details: "[Majors: Physics, Mathematics, Computer Science]",
      status: "COMPLETED"
    }
  ],

  skills: [
    {
      category: "CORE LANGUAGES",
      code: "0xLANG",
      skills: [
        { name: "TypeScript / JavaScript", level: 95, tag: "PRIMARY" },
        { name: "Python", level: 88, tag: "DATA & SYSTEMS" },
        { name: "C / C++", level: 80, tag: "FOUNDATIONAL" },
        { name: "SQL", level: 86, tag: "DATABASES" }
      ]
    },
    {
      category: "FRONTEND & CREATIVE",
      code: "0xFRONT",
      skills: [
        { name: "React / Next.js", level: 92, tag: "FRAMEWORK" },
        { name: "Vanilla CSS & Modern Layouts", level: 94, tag: "STYLING" },
        { name: "Web Audio API / Canvas", level: 85, tag: "INTERACTIVE" },
        { name: "Performance Optimization", level: 90, tag: "SYSTEMS" }
      ]
    },
    {
      category: "BACKEND & INFRASTRUCTURE",
      code: "0xBACK",
      skills: [
        { name: "REST / GraphQL APIs", level: 90, tag: "ARCHITECTURE" },
        { name: "PostgreSQL / Redis", level: 85, tag: "STORAGE" },
        { name: "Docker & Containerization", level: 82, tag: "DEVOPS" },
        { name: "Git & Linux Environments", level: 92, tag: "WORKFLOW" }
      ]
    }
  ],

  achievements: [
    {
      id: "ach-1",
      title: "[YOUR ACHIEVEMENT / HACKATHON WINNER / SCHOLARSHIP]",
      organization: "[AWARDING BODY / ORGANIZATION]",
      year: "20XX",
      badge: "RANK #1",
      description: "[Brief description of the milestone, outcome, or recognition received. Replace with your actual achievements.]"
    },
    {
      id: "ach-2",
      title: "[COMPETITIVE PROGRAMMING / OPEN SOURCE RECOGNITION]",
      organization: "[PLATFORM / COMMUNITY]",
      year: "20XX",
      badge: "HONORABLE",
      description: "[Description of achievement or competition rating milestone.]"
    },
    {
      id: "ach-3",
      title: "[ACADEMIC EXCELLENCE / MERIT AWARD]",
      organization: "[INSTITUTION / FOUNDATION]",
      year: "20XX",
      badge: "SCHOLAR",
      description: "[Description of merit award, dean's list, or academic honors.]"
    }
  ],

  experience: [
    {
      id: "exp-1",
      role: "[YOUR ROLE / SOFTWARE ENGINEER / INTERN]",
      organization: "[COMPANY / LAB / CLIENT NAME]",
      period: "[MM/20XX — PRESENT / MM/20XX]",
      location: "[LOCATION / REMOTE]",
      highlights: [
        "[Key achievement or engineering initiative delivered with measurable impact]",
        "[Architected or contributed to scalable modules, features, or backend APIs]",
        "[Collaborated cross-functionally with team members, ensuring clean testing and deployment]"
      ],
      tags: ["TypeScript", "React", "Node.js", "APIs"]
    },
    {
      id: "exp-2",
      role: "[LEAD DEVELOPER / RESEARCH ASSISTANT / PROJECT LEAD]",
      organization: "[COMMUNITY / UNIVERSITY LAB / INITIATIVE]",
      period: "[MM/20XX — MM/20XX]",
      location: "[LOCATION]",
      highlights: [
        "[Engineered core modules and led system architecture decisions]",
        "[Mentored junior members and organized technical workshops]",
        "[Optimized build pipelines and application response latency]"
      ],
      tags: ["Systems", "Architecture", "Open Source"]
    }
  ],

  contact: {
    email: "[YOUR EMAIL / contact@example.com]",
    github: "https://github.com/[YOUR GITHUB]",
    linkedin: "https://linkedin.com/in/[YOUR LINKEDIN]",
    transmissionNode: "STATION-AVINASH-01",
    pgpKeyFingerprint: "4A9F 88C1 2D10 7E9B B5C3 00F9 E281 90A4"
  }
};

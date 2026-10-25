import type { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  viewerCallsign: "STATION AVINASH",
  fullName: "AVINASH",
  designation: "AI/ML ENGINEER & CREATIVE DEVELOPER",
  tagline: "BUILDING MACHINES THAT SEE, THINK, AND INTERACT",
  // Approximate Greater Noida coordinates for fictional CRT broadcast aesthetic
  transmissionCoordinates: "LAT: 28.4744° N // LON: 77.5040° E [GREATER NOIDA STATION]",
  broadcastFrequency: "CH 01 // 471.25 MHz",
  signalStatus: "CARRIER SYNCHRONIZED [99.8% FIDELITY]",

  about: {
    terminalBio: [
      "> INITIALIZING OPERATOR PROFILE...",
      "> CARRIER FREQUENCY 471.25 MHz LOCKED // GREATER NOIDA NODE.",
      "> Computer Science student specializing in AI/ML, computer vision, and creative software systems.",
      "> I enjoy turning experimental ideas into working products — from computer-vision systems and geospatial applications to interactive digital experiences.",
      "> This portfolio is housed inside an interactive vintage CRT television apparatus — honoring tactile physical electronics and computational craftsmanship."
    ],
    missionStatement: "TURN CURIOUS IDEAS INTO SYSTEMS THAT ACTUALLY WORK.",
    specs: [
      { label: "OPERATOR", value: "AVINASH" },
      { label: "SPECIALIZATION", value: "AI/ML & CREATIVE DEVELOPER" },
      { label: "INSTITUTION", value: "GL BAJAJ INST. OF TECH. & MANAGEMENT" },
      { label: "BASE STATION", value: "GREATER NOIDA, INDIA" },
      { label: "BUILD STATUS", value: "INDEPENDENT DEVELOPER / ACTIVE" }
    ]
  },

  education: [
    {
      degree: "B.Tech — Computer Science & Engineering",
      institution: "GL Bajaj Institute of Technology & Management, Greater Noida",
      period: "2024 — 2028",
      details: "Specialization: Artificial Intelligence & Machine Learning. Academic standing: CGPA: 9.1 // Semester 1 SGPA: 9.2. Focus areas: Data Structures & Algorithms, Computer Organization & Architecture, OOP, DBMS, OS, AI/ML, Computer Vision.",
      status: "IN PROGRESS"
    }
  ],

  skills: [
    {
      category: "CORE / LANGUAGES",
      code: "0xLANG",
      skills: [
        { name: "Python", level: 90, tag: "APPLIED" },
        { name: "C++", level: 85, tag: "APPLIED" },
        { name: "C", level: 80, tag: "FOUNDATIONAL" },
        { name: "Java", level: 75, tag: "ACTIVE" },
        { name: "JavaScript", level: 85, tag: "APPLIED" },
        { name: "TypeScript", level: 80, tag: "APPLIED" },
        { name: "SQL", level: 80, tag: "APPLIED" }
      ]
    },
    {
      category: "AI / COMPUTER VISION",
      code: "0xVISION",
      skills: [
        { name: "OpenCV", level: 85, tag: "ACTIVE" },
        { name: "MediaPipe", level: 82, tag: "ACTIVE" },
        { name: "NumPy", level: 85, tag: "APPLIED" },
        { name: "Computer Vision", level: 85, tag: "ACTIVE" },
        { name: "Machine Learning", level: 80, tag: "ACTIVE" },
        { name: "Geospatial Analysis", level: 80, tag: "APPLIED" },
        { name: "RAG", level: 75, tag: "STUDY / LAB" },
        { name: "AI Agents", level: 75, tag: "STUDY / LAB" }
      ]
    },
    {
      category: "SOFTWARE / CREATIVE",
      code: "0xDEV",
      skills: [
        { name: "React", level: 85, tag: "APPLIED" },
        { name: "Vite", level: 85, tag: "APPLIED" },
        { name: "HTML / CSS", level: 88, tag: "APPLIED" },
        { name: "PySide6", level: 80, tag: "ACTIVE" },
        { name: "REST APIs", level: 85, tag: "APPLIED" },
        { name: "Git", level: 88, tag: "WORKFLOW" },
        { name: "GitHub", level: 88, tag: "WORKFLOW" },
        { name: "Linux", level: 80, tag: "ENVIRONMENT" },
        { name: "Affinity", level: 75, tag: "CREATIVE" },
        { name: "Canva", level: 75, tag: "CREATIVE" }
      ]
    },
    {
      category: "TOOLS / PLATFORMS",
      code: "0xTOOLS",
      skills: [
        { name: "VS Code", level: 90, tag: "PRIMARY IDE" },
        { name: "PyCharm", level: 85, tag: "PYTHON IDE" },
        { name: "Jupyter", level: 85, tag: "NOTEBOOKS" },
        { name: "Vercel", level: 80, tag: "DEPLOYMENT" },
        { name: "Planetary Computer", level: 80, tag: "GEOSPATIAL" }
      ]
    }
  ],

  achievements: [
    {
      id: "ach-1",
      title: "ACADEMIC EXCELLENCE",
      organization: "GL BAJAJ INSTITUTE OF TECHNOLOGY & MANAGEMENT",
      year: "2025",
      badge: "SGPA 9.2",
      description: "Achieved a 9.2 SGPA during the first semester of the B.Tech program."
    },
    {
      id: "ach-2",
      title: "[ADDITIONAL ENTRY — NEEDS INPUT]",
      organization: "[VERIFIED INSTITUTION / COMPETITION]",
      year: "20XX",
      badge: "PENDING",
      description: "Reserved slot for future verified competition, scholarship, or open source recognition."
    }
  ],

  experience: [
    {
      id: "exp-1",
      role: "INDEPENDENT DEVELOPER",
      organization: "PERSONAL PROJECTS / INDEPENDENT",
      period: "2024 — PRESENT",
      location: "GREATER NOIDA, INDIA",
      highlights: [
        "Designed and developed AI/ML, computer-vision, geospatial, and interactive software projects from concept to working prototype.",
        "Experimented with computer vision, multimodal AI, geospatial intelligence, procedural audio, and interactive frontend systems.",
        "Built experimental applications using Python, C++, React, OpenCV, MediaPipe, APIs, and modern web technologies."
      ],
      tags: ["Python", "C++", "C", "JavaScript", "TypeScript", "React", "OpenCV", "MediaPipe", "Git"]
    }
  ],

  contact: {
    email: "aldolcondensation2006@gmail.com",
    github: "https://github.com/KinShu777",
    linkedin: "https://www.linkedin.com/in/avinash-rajput-5103323b5?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    transmissionNode: "STATION-AVINASH-01"
  }
};

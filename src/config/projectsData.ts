import type { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: "proj-thermosense",
    number: "PROJECT 01",
    title: "ThermoSense",
    category: "GEOSPATIAL / COMPUTER VISION / INTERACTIVE WEB",
    subtitle: "URBAN HEAT INTELLIGENCE FOR DELHI NCR",
    description: "An interactive urban heat intelligence dashboard combining geospatial visualization with Landsat-8 thermal imagery. The system visualizes continuous land-surface temperature data across Delhi/NCR through a tactical command-center interface.",
    techStack: ["Python", "Flask", "JavaScript", "Leaflet.js", "Landsat-8", "Planetary Computer", "Geospatial Analysis"],
    metrics: "30 m LAND-SURFACE TEMPERATURE DATA",
    githubUrl: "https://github.com/KinShu777/ThermoSense",
    imageUrl: "/assets/projects/thermosense.png",
    caseStudyUrl: "#case-study-thermosense",
    featured: true
  },
  {
    id: "proj-locora",
    number: "PROJECT 02",
    title: "LOCORA",
    category: "FRONTEND / LOCATION INTELLIGENCE",
    subtitle: "NEARBY, MADE EASY.",
    description: "A mobile-first local discovery platform designed to help users discover nearby businesses and offers through distance-based exploration. The interface focuses on fast discovery, simple navigation, and a highly visual mobile experience.",
    techStack: ["React", "Vite", "JavaScript", "CSS", "Lucide", "Vercel"],
    metrics: "27 BUSINESSES // 54 OFFERS",
    githubUrl: "https://github.com/KinShu777/Locora-final",
    liveUrl: "https://locora-nearby-discovery-1--avinash2233.replit.app/",
    imageUrl: "/assets/projects/locora.png",
    caseStudyUrl: "#case-study-locora",
    featured: true
  },
  {
    id: "proj-softguitar",
    number: "PROJECT 03",
    title: "SOFTGUITAR",
    category: "AUDIO ENGINEERING / CREATIVE SOFTWARE",
    subtitle: "A SOFTWARE GUITAR BUILT FROM SIGNAL PROCESSING",
    description: "A desktop experimental instrument that synthesizes guitar-like sounds using digital signal processing rather than prerecorded samples. It combines real-time audio input/output with physical modelling techniques to create playable string-like tones.",
    techStack: ["Python", "PySide6", "NumPy", "sounddevice", "Karplus-Strong"],
    metrics: "44.1 kHz REAL-TIME AUDIO",
    githubUrl: "https://github.com/KinShu777/SoftGuitar",
    imageUrl: "/assets/projects/softguitar.png",
    caseStudyUrl: "#case-study-softguitar",
    featured: false
  }
];

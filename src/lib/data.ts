// src/lib/data.ts
// Single source of truth for all portfolio content.
// Rule 1: Every name, number, date, company, project, skill, link, and certification
// comes strictly from RUDRA_RESUME.pdf and intro video.

export interface Profile {
  name: string;
  firstName: string;
  role: string;
  subRole: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  shortLine: string;
  github: string | null;
  linkedin: string;
  linkedinDisplay: string;
  resumePath: string;
  idNumber: string;
  dept: string;
  validTill: string;
  quote: string;
}

export interface NavItem {
  id: string;
  label: string;
  number: string;
}

export interface Skill {
  id: string;
  name: string;
  symbol: string;
  atomicNumber: number;
  family: string;
  category: string;
  isBrand: boolean;
  logoKey: string;
  brandColor?: string;
  projects: string[];
  description: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  period: string;
  description: string;
  features: string[];
  tech: string[];
  github: string | null;
  award?: string;
}

export interface Certification {
  id: string;
  number: string;
  title: string;
  issuer: string;
  year: string;
  details: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  place: string;
  detail: string;
  type: "education" | "experience";
  bullets?: string[];
  score?: string;
}

export interface Achievement {
  id: string;
  index: string;
  targetNumber: number;
  suffix: string;
  decimals: number;
  label: string;
  caption: string;
  detail: string;
  brandColor: string;
}

export const PROFILE: Profile = {
  name: "Panjam Rudra Prathap",
  firstName: "Rudra",
  role: "Full Stack Developer.",
  subRole: "Computer Science Engineer",
  email: "rudraprathap369@gmail.com",
  phone: "+91-8106963592",
  phoneHref: "tel:+918106963592",
  location: "Andhra Pradesh, India",
  resumeSummary:
    "Computer Science Engineering student with hands-on experience in network engineering, web development, and database management. Skilled in Java, SQL, HTML, CSS, and Networking technologies including TCP/IP, routing, and switching. Experienced in designing network simulations and developing web-based management systems. Passionate about building efficient technological solutions and continuously improving technical expertise.",
  shortLine:
    "Passionate about building efficient technological solutions and continuously improving technical expertise.",
  github: null, // Omitted: not present in résumé
  linkedin: "https://www.linkedin.com/in/rudra-prathap-342632334",
  linkedinDisplay: "linkedin.com/in/rudraprathap",
  resumePath: "/resume.pdf",
  idNumber: "CSE-25-12-06",
  dept: "Computer Science & Engineering",
  validTill: "2028",
  quote:
    "Engineering dependable web systems and scalable network topologies through rigorous logic and continuous refinement.",
};

export const NAV: NavItem[] = [
  { id: "about", label: "About", number: "01" },
  { id: "skills", label: "Skills", number: "02" },
  { id: "work", label: "Work", number: "03" },
  { id: "certifications", label: "Certifications", number: "04" },
  { id: "experience", label: "Experience", number: "05" },
  { id: "achievements", label: "Achievements", number: "06" },
  { id: "contact", label: "Contact", number: "07" },
];

export const SKILL_FAMILIES = [
  "All",
  "Programming & Querying",
  "Web Development",
  "Networking",
  "Core Skills",
  "Tools",
] as const;

export const SKILLS: Skill[] = [
  // Programming & Querying
  {
    id: "java",
    name: "JAVA",
    symbol: "Ja",
    atomicNumber: 1,
    family: "Programming & Querying",
    category: "Languages",
    isBrand: true,
    logoKey: "java",
    brandColor: "#ED8B00",
    projects: ["Academic OOP Systems", "Data Structures Practice"],
    description: "Object-oriented software development, robust data modeling, and algorithmic problem-solving.",
  },
  {
    id: "sql",
    name: "SQL",
    symbol: "Sq",
    atomicNumber: 2,
    family: "Programming & Querying",
    category: "Databases",
    isBrand: true,
    logoKey: "mysql",
    brandColor: "#00618A",
    projects: ["Inventory Management System", "Lab Asset Records Database"],
    description: "Relational database schema design, structured querying, indexes, and ACID transaction safety.",
  },

  // Web Development
  {
    id: "html",
    name: "HTML",
    symbol: "Ht",
    atomicNumber: 3,
    family: "Web Development",
    category: "Frontend",
    isBrand: true,
    logoKey: "html5",
    brandColor: "#E34F26",
    projects: ["Inventory Management System"],
    description: "Accessible, semantic document structures adhering to modern web standards.",
  },
  {
    id: "css",
    name: "CSS",
    symbol: "Cs",
    atomicNumber: 4,
    family: "Web Development",
    category: "Frontend",
    isBrand: true,
    logoKey: "css3",
    brandColor: "#1572B6",
    projects: ["Inventory Management System"],
    description: "Precision layouts, responsive viewports, custom component styling, and CSS animations.",
  },
  {
    id: "javascript",
    name: "JavaScript",
    symbol: "Js",
    atomicNumber: 5,
    family: "Web Development",
    category: "Frontend",
    isBrand: true,
    logoKey: "javascript",
    brandColor: "#F7DF1E",
    projects: ["Inventory Management System"],
    description: "Client-side interactivity, DOM manipulation, automated alert dialogs, and asynchronous actions.",
  },
  {
    id: "responsive-design",
    name: "Responsive Web Design",
    symbol: "Rw",
    atomicNumber: 6,
    family: "Web Development",
    category: "Frontend",
    isBrand: false,
    logoKey: "responsive",
    projects: ["Inventory Management System"],
    description: "Fluid fluid-grid design, media queries, and touch-first usability across handheld to ultra-wide screens.",
  },
  {
    id: "website-development",
    name: "Website Development",
    symbol: "Wd",
    atomicNumber: 7,
    family: "Web Development",
    category: "Frontend",
    isBrand: false,
    logoKey: "webdev",
    projects: ["Inventory Management System"],
    description: "End-to-end full lifecycle frontend and backend integration of production web applications.",
  },

  // Networking
  {
    id: "tcp-ip",
    name: "TCP/IP",
    symbol: "Tc",
    atomicNumber: 8,
    family: "Networking",
    category: "Protocols",
    isBrand: false,
    logoKey: "network",
    projects: ["Enterprise Topologies (Remote)"],
    description: "Internet protocol suite stack, 4-layer architecture, packet headers, handshake validation, and flow control.",
  },
  {
    id: "subnetting",
    name: "Subnetting",
    symbol: "Sn",
    atomicNumber: 9,
    family: "Networking",
    category: "Addressing",
    isBrand: false,
    logoKey: "subnetting",
    projects: ["Enterprise Topologies (Remote)"],
    description: "IPv4/IPv6 variable-length subnet masking (VLSM), CIDR notation, and network partitioning.",
  },
  {
    id: "routing-switching",
    name: "Routing & Switching",
    symbol: "Rs",
    atomicNumber: 10,
    family: "Networking",
    category: "Protocols",
    isBrand: false,
    logoKey: "routing",
    projects: ["Enterprise Topologies (Remote)", "Polytechnic Lab Maintenance"],
    description: "Dynamic and static routing protocols, VLAN configuration, trunking, STP, and multi-tier switching.",
  },
  {
    id: "lan-wan",
    name: "LAN/WAN Concepts",
    symbol: "Lw",
    atomicNumber: 11,
    family: "Networking",
    category: "Architecture",
    isBrand: false,
    logoKey: "lanwan",
    projects: ["Enterprise Topologies (Remote)"],
    description: "Local and wide-area network design, edge routing, carrier links, and campus network topologies.",
  },
  {
    id: "network-troubleshooting",
    name: "Network Troubleshooting",
    symbol: "Nt",
    atomicNumber: 12,
    family: "Networking",
    category: "Diagnostics",
    isBrand: false,
    logoKey: "troubleshoot",
    projects: ["Polytechnic Lab Operations", "Enterprise Topologies"],
    description: "Layer-by-layer systematic fault isolation, ping/traceroute verification, and connectivity diagnosis.",
  },

  // Core Skills & Tools
  {
    id: "dbms",
    name: "DBMS",
    symbol: "Db",
    atomicNumber: 13,
    family: "Core Skills",
    category: "Data",
    isBrand: false,
    logoKey: "dbms",
    projects: ["Inventory Management System"],
    description: "Relational database management systems architecture, normalization (1NF-BCNF), and integrity constraints.",
  },
  {
    id: "packet-tracer",
    name: "Cisco Packet Tracer",
    symbol: "Pt",
    atomicNumber: 14,
    family: "Tools",
    category: "Simulation",
    isBrand: true,
    logoKey: "cisco",
    brandColor: "#1BA0D7",
    projects: ["Enterprise Network Topologies"],
    description: "Simulation of enterprise network hardware, routers, switches, access points, and dynamic cabling.",
  },
  {
    id: "wireshark",
    name: "Wireshark",
    symbol: "Ws",
    atomicNumber: 15,
    family: "Tools",
    category: "Analysis",
    isBrand: true,
    logoKey: "wireshark",
    brandColor: "#1679A7",
    projects: ["Traffic Monitoring & Packet Analysis"],
    description: "Deep packet inspection, protocol analysis, frame decoding, latency diagnosis, and anomaly detection.",
  },
  {
    id: "network-security",
    name: "Network Security",
    symbol: "Ns",
    atomicNumber: 16,
    family: "Core Skills",
    category: "Security",
    isBrand: false,
    logoKey: "security",
    projects: ["Enterprise Topologies (Remote)"],
    description: "Access Control Lists (ACLs), basic firewall rules, port security, and protocol verification.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "inventory-management-system",
    index: "01",
    title: "Inventory Management System",
    kicker: "Web-Development",
    period: "March 2025 – April 2025",
    description:
      "Developed a web-based inventory management system that eliminates manual asset tracking. Engineered a structured SQL relational database for high-integrity record storage, integrated automated inventory alerts for threshold monitoring, and designed an intuitive, responsive interface.",
    features: [
      "Automated stock monitoring alerts & status reporting",
      "Normalized SQL schema design for persistent asset data",
      "Responsive user interface in semantic HTML, CSS, and JS",
      "Departmental tracking with multi-category asset audits",
    ],
    tech: ["HTML", "CSS", "JavaScript", "SQL"],
    github: null, // Omitted: not present in résumé
    award: "Best Final Year Project – 2025, Govt. Polytechnic College",
  },
  {
    id: "enterprise-network-architecture",
    index: "02",
    title: "Enterprise Network Topology & Packet Analysis",
    kicker: "Network Engineering",
    period: "May 2024 – November 2024",
    description:
      "Configured and simulated enterprise network topologies using Cisco Packet Tracer, implementing IP addressing, subnetting, and routing protocols for efficient communication. Designed and tested LAN and WAN architectures, and monitored packet traffic using Wireshark.",
    features: [
      "Enterprise topology simulation in Cisco Packet Tracer",
      "IP addressing, VLSM subnetting & dynamic routing protocols",
      "Wireshark packet flow monitoring & traffic diagnostics",
      "Network security fundamentals & access control validation",
    ],
    tech: ["Cisco Packet Tracer", "Wireshark", "TCP/IP", "Routing & Switching"],
    github: null, // Omitted: not present in résumé
    award: "Skill Development & Knowledge Program in Network Engineering (2024)",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-1",
    number: "01",
    title: "Skill Development & Knowledge Program in Network Engineering",
    issuer: "Network Engineering Training (Remote)",
    year: "2024",
    details:
      "Trained in enterprise network configuration, routing and switching protocols, IP addressing, subnetting, layer-by-layer troubleshooting, and network security fundamentals.",
  },
  {
    id: "cert-2",
    number: "02",
    title: "Best Final Year Project Award – 2025",
    issuer: "Govt. Polytechnic College, Pillaripattu",
    year: "2025",
    details:
      "Awarded 1st place in Department of Computer Engineering for developing the Inventory Management System to track departmental inventory, manage stock records, and streamline asset monitoring.",
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "edu-1",
    year: "2022",
    title: "Secondary School Certificate (SSC)",
    place: "A.P. Residential School, Chillamanuchenu",
    detail: "Graduated with 87.83% / 100 aggregate percentage, establishing foundational excellence in mathematics and science.",
    type: "education",
    score: "87.83% / 100",
  },
  {
    id: "edu-2",
    year: "2022 – 2025",
    title: "Diploma in Computer Engineering",
    place: "Govt. Polytechnic, Pillaripattu",
    detail: "Completed three-year engineering diploma program with 86.06% / 100 percentage. Awarded Best Final Year Project in 2025.",
    type: "education",
    score: "86.06% / 100",
  },
  {
    id: "exp-1",
    year: "May 2024 – Nov 2024",
    title: "Network Engineer Intern",
    place: "Network Engineering Training (Remote)",
    detail: "Configured enterprise topologies in Cisco Packet Tracer, designed LAN/WAN architectures, inspected packets with Wireshark, and enforced access control security.",
    type: "experience",
    bullets: [
      "Configured and simulated enterprise network topologies using Cisco Packet Tracer, implementing IP addressing, subnetting, and routing protocols.",
      "Designed and tested LAN and WAN network architectures, applying switching concepts and network troubleshooting techniques.",
      "Monitored and analyzed network traffic using Wireshark, identifying packet flow issues and ensuring reliable data transmission.",
      "Implemented network security fundamentals including access control, basic firewall configuration, and protocol validation.",
    ],
  },
  {
    id: "exp-2",
    year: "Nov 2024 – Apr 2025",
    title: "Computer Laboratory Management",
    place: "Government Polytechnic",
    detail: "Supervised daily computer laboratory operations, maintaining system hardware, network switch configurations, and asset inventories.",
    type: "experience",
    bullets: [
      "Managed Diploma college computer lab operations including system configuration, troubleshooting, and network maintenance with team.",
      "Provided technical support to students and faculty while maintaining lab infrastructure and asset records.",
    ],
  },
  {
    id: "edu-3",
    year: "2025 – 2028 (Expected)",
    title: "B.Tech in Computer Science & Engineering",
    place: "Madanapalle Institute of Technology and Science, Madanapalle",
    detail: "Pursuing undergraduate degree in Computer Science & Engineering. Maintaining an academic score of 8.24 / 10 CGPA.",
    type: "education",
    score: "Current CGPA: 8.24 / 10",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    index: "01 / 05",
    targetNumber: 87.8,
    suffix: "%",
    decimals: 1,
    label: "SSC Board Distinction",
    caption: "A.P. Residential School, Chillamanuchenu",
    detail: "Secondary School Certificate examination aggregate score of 87.83% / 100.",
    brandColor: "#0d0d0d",
  },
  {
    id: "ach-2",
    index: "02 / 05",
    targetNumber: 86.1,
    suffix: "%",
    decimals: 1,
    label: "Diploma Academic Merit",
    caption: "Govt. Polytechnic, Pillaripattu",
    detail: "Diploma in Computer Engineering aggregate score of 86.06% / 100 across 3 years.",
    brandColor: "#1572B6",
  },
  {
    id: "ach-3",
    index: "03 / 05",
    targetNumber: 8.24,
    suffix: "",
    decimals: 2,
    label: "B.Tech Current CGPA",
    caption: "Madanapalle Institute of Tech & Science",
    detail: "Cumulative Grade Point Average of 8.24 / 10 in B.Tech Computer Science & Engineering.",
    brandColor: "#ED8B00",
  },
  {
    id: "ach-4",
    index: "04 / 05",
    targetNumber: 1,
    suffix: "st",
    decimals: 0,
    label: "Best Final Year Project",
    caption: "Govt. Polytechnic College, 2025",
    detail: "Honored with 1st place award for developing the Web Inventory Management System.",
    brandColor: "#1BA0D7",
  },
  {
    id: "ach-5",
    index: "05 / 05",
    targetNumber: 6,
    suffix: " Mo",
    decimals: 0,
    label: "Network Engineering Internship",
    caption: "Cisco Topologies & Packet Analysis",
    detail: "Hands-on enterprise network simulation, IP subnetting, switching, and Wireshark diagnostics.",
    brandColor: "#1679A7",
  },
];

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SHOAIB.STUDIO — SITE DATA (FINALIZED)
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  longDescription: string;
  year: string;
  accentColor: string;
  image: string;
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

// ─── BRAND ────────────────────────────────────────────────────────────────────

export const brand = {
  name: "Shoaib Studio",
  studio: "Shoaib.studio",
  tagline: "Systems & Automation Consultancy", // 👈 Optimized for your new focus
  email: "info@shoaib.studio",
  domain: "shoaib.studio",
  location: "Pakistan",
  availability: "Available for projects",
  social: {
    linkedin: "https://www.linkedin.com/in/shoaib-maqsood-48195817a",
    instagram: "https://www.instagram.com/_5600x_?igsh=MTI5MjNsNzV3cnVuag==",
    email: "mailto:info@shoaib.studio",
  },
} as const;

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

export const nav: NavItem[] = [
  { label: "About Us", href: "#about" },
  { label: "Our Work", href: "#projects" },
  { label: "Services", href: "#services" }, 
  { label: "Skills", href: "#skills" },     
  { label: "Contact Us", href: "#contact" }, 
];

// ─── HERO ─────────────────────────────────────────────────────────────────────

export const hero = {
  headlineLines: ["SHOAIB", "STUDIO"],
  rotatingWords: [
    "ERP Systems",
    "HRM Automation",
    "2D Drafting",
    "3D Modeling",
    "Business Intelligence",
  ],
  tagline: "Bridging the Gap Between Data and Design.",
  studio: "Shoaib.studio",
  cta: {
    primary: { label: "View Work", href: "#projects" },
    secondary: { label: "Contact Me", href: "#contact" },
  },
  stats: [
    { value: "15+", label: "Projects" },
    { value: "3+", label: "Years" },
    { value: "7+", label: "Clients" },
  ] as HeroStat[],
  scrollHint: "Scroll to explore",
} as const;

// ─── ABOUT ────────────────────────────────────────────────────────────────────

export const about = {
  eyebrow: "About Us",
  heading: "Bridging the Gap Between Data and Design",
  paragraphs: [
    "I specialize in ERP systems, HRM automation, and operational intelligence platforms that simplify complex business workflows.",
    "Alongside enterprise systems, I provide precision 2D technical drafting and 3D visualization, connecting digital strategy with real-world engineering.",
  ],
} as const;

// ─── SERVICES ─────────────────────────────────────────────────────────────────

export const services: ServiceItem[] = [
  {
    id: "erp",
    index: "01",
    title: "ERP Implementation",
    description: "Enterprise resource planning systems tailored for scalable business operations.",
    tags: ["Dolibarr", "Odoo", "ERPNext", "SAP"],
  },
  {
    id: "hrm",
    index: "02",
    title: "HRM Automation",
    description: "Automated employee workflows, attendance systems, and HR management platforms.",
    tags: ["Payroll", "Attendance", "Onboarding"],
  },
  {
    id: "dashboard",
    index: "03",
    title: "Dashboard Development",
    description: "Interactive analytics dashboards for real-time decision making.",
    tags: ["Power BI", "Python", "SQL"],
  },
  {
    id: "inventory",
    index: "04",
    title: "Inventory & Attendance",
    description: "Operational tracking systems for business efficiency and accuracy.",
    tags: ["Biometric", "IoT", "Automation"],
  },
  {
    id: "drafting",
    index: "05",
    title: "2D Technical Drafting",
    description: "Precision CAD drawings for engineering and manufacturing documentation.",
    tags: ["AutoCAD", "Technical", "Manufacturing"],
  },
  {
    id: "modeling",
    index: "06",
    title: "3D Modeling & Visualization",
    description: "High-fidelity 3D models for engineering, product design, and visualization.",
    tags: ["Product Design", "Rendering"],
  },
];

// ─── WORK HEADER ─────────────────────────────────────────────────────────────

export const workHeader = {
  eyebrow: "Our Work",
  title: "Selected Projects",
} as const;

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const projects: ProjectItem[] = [
  {
    id: "inventory-Tracking",
    index: "01",
    title: "Inventory Tracking",
    subtitle: "Real-time Analytics & Reporting",
    tags: ["Power BI", "Python", "SQL", "Automation"],
    description: "Real-time inventory tracking system with analytics and reporting.",
    longDescription: "An enterprise-grade inventory management dashboard delivering live data streams across the supply chain — from stock levels to reorder alerts, purchase trends to supplier performance.",
    year: "2024",
    accentColor: "#4DA3FF",
    image: "/Inventory.png",
  },
  {
    id: "hrm-system",
    index: "02",
    title: "HRM System",
    subtitle: "Complete HR Automation Platform",
    tags: ["Odoo", "Python", "Biometric", "Payroll"],
    description: "Employee management platform with payroll, attendance, and role-based control.",
    longDescription: "A fully integrated human resources management system handling the complete employee lifecycle for a 500+ employee organization.",
    year: "2024",
    accentColor: "#A78BFA",
    image: "/HRM Dashboard.png",
  },
  {
    id: "attendance-system",
    index: "03",
    title: "Attendance System",
    subtitle: "Smart Biometric Monitoring",
    tags: ["ZKTeco", "Python", "IoT", "Analytics"],
    description: "Automated attendance tracking with reporting and insights.",
    longDescription: "End-to-end attendance management connecting biometric hardware with cloud-based analytics.",
    year: "2023",
    accentColor: "#34D399",
    image: "/Attendance-management-software-system.png",
  },
];

// ─── SKILLS ───────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    label: "ERP",
    skills: ["Dolibarr", "Odoo", "ERPNext", "SAP"],
  },
  {
    label: "Engineering",
    skills: ["AutoCAD", "2D Drafting", "3D Modeling"],
  },
  {
    label: "Analytics",
    skills: ["Power BI", "SQL", "Data Modeling", "Reporting"],
  },
];

// ─── CONTACT ──────────────────────────────────────────────────────────────────

export const contact = {
  eyebrow: "Contact",
  heading: "Let's build something intelligent",
  subtext: "Available for ERP systems, dashboards, automation, and engineering design projects.",
  form: {
    fields: {
      name: { label: "Full Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "your@email.com" },
      projectType: {
        label: "Project Type",
        placeholder: "Select type",
        options: [
          "ERP Implementation",
          "HRM Automation",
          "Dashboard Development",
          "Inventory System",
          "Attendance System",
          "2D Drafting",
          "3D Modeling",
          "Other",
        ],
      },
      message: {
        label: "Message",
        placeholder: "Tell me about your project...",
      },
    },
    submitLabel: "Send Message",
  },
} as const;

// ─── FOOTER ───────────────────────────────────────────────────────────────────

export const footer = {
  copyright: `Shoaib.studio © ${new Date().getFullYear()}`,
  tagline: "Crafting intelligent systems with precision.",
} as const;
export enum ViewMode {
  LANDING = "LANDING",
  DASHBOARD_HOME = "DASHBOARD_HOME",
  VIEW_A_SAAS = "VIEW_A_SAAS",
  VIEW_B_CREATIVE = "VIEW_B_CREATIVE",
  VIEW_C_MINIMAL = "VIEW_C_MINIMAL",
  VIEW_D_WORKSPACE = "VIEW_D_WORKSPACE",
  VIEW_E_MOBILE = "VIEW_E_MOBILE",
  VIEW_F_MESSAGING = "VIEW_F_MESSAGING"
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: "AI & ML" | "Full Stack" | "Digital Transformation";
  tags: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  imageUrl: string;
  demoUrl?: string;
  features: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: "Corporate" | "Freelance" | "AI Specialization" | "HR Strategy";
  description: string[];
  skills: string[];
}

export interface MetricCard {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  sparkline: number[];
}

export interface Certification {
  title: string;
  issuer: string;
  completed: string;
  details?: string;
  verificationUrl?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string[];
}

export interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "system";
  timestamp: string;
}

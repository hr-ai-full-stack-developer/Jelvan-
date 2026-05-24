import { Project, ExperienceItem, MetricCard, Certification, EducationItem } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "ai-hr",
    title: "AI HR Analytics Platform",
    description: "An enterprise SaaS platform integrating predictive attrition modeling and natural language team analytics.",
    fullDescription: "A sophisticated dashboard that ingests employee sentiment logs, engagement metrics, and historical patterns to generate proactive turnover risk indicators. It is paired with an embedded agentic assistant that allows HR leaders to query organizational structures using natural human language.",
    category: "AI & ML",
    tags: ["React 19", "@google/genai", "Recharts", "Node.js", "Vector DB"],
    metrics: [
      { label: "Attrition Prediction Rate", value: "94.2% accuracy" },
      { label: "HR Query Completion", value: "1.2s avg" },
      { label: "Personnel Integration", value: "30,000+ profiles" }
    ],
    accentColor: "slate",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop",
    features: [
      "Dynamic attrition prediction engine leveraging lightweight local models",
      "RAG-grounded natural language search across company records",
      "Interactive organizational bento-grid charts for direct visualization",
      "Seamless export of retention planning scripts"
    ]
  },
  {
    id: "smart-recruitment",
    title: "Smart Recruitment SaaS",
    description: "Next-generation candidate scanning pipelines with automated screening agents.",
    fullDescription: "An intelligent applicant tracking pipeline that parses unstructured resume file uploads and converts them to precise skill affinity matrices. It utilizes an interactive drag-and-drop board for stage progression and automated scheduling integrations via secure OAuth.",
    category: "Full Stack",
    tags: ["TypeScript", "Tailwind CSS", "Motion", "Express", "PostgreSQL"],
    metrics: [
      { label: "Candidate Sift Ratio", value: "88% time-saved" },
      { label: "Parsing Engine Throughput", value: "20,000 resumes/hr" },
      { label: "SLA Scheduling Integrity", value: "100% clash-free" }
    ],
    accentColor: "stone",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    features: [
      "Multi-format resume parsing and semantic entity mapping",
      "Automated assessment dispatch calibrated to skill requirements",
      "Responsive interview room panel with interactive notes and feedback",
      "Configurable candidate rating scales and pipeline stages"
    ]
  },
  {
    id: "digital-dashboard",
    title: "Digital Transformation Dashboard",
    description: "Real-time orchestration system monitoring API health, synchronization logs, and containerized telemetry.",
    fullDescription: "Built to demonstrate engineering rigor in strategic systems transformation. It provides an immersive dashboard visualization of service meshes, event brokers, background worker pools, and historical latencies, combined with beautiful custom D3 visualizations.",
    category: "Digital Transformation",
    tags: ["React", "D3.js", "Docker", "Tailwind CSS", "Redux Toolkit"],
    metrics: [
      { label: "Orchestrated Transactions", value: "12M ops/day" },
      { label: "API Latency Reduction", value: "40% (350ms to 210ms)" },
      { label: "Failover Speed", value: "<150ms zero-downtime" }
    ],
    accentColor: "slate",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    features: [
      "Real-time event streams mimicking production RabbitMQ throughput",
      "Custom server load distribution charts dynamically rendering",
      "System fault injector panel for simulating failovers in real time",
      "Audit logs with customizable level filters and export formats"
    ]
  },
  {
    id: "ai-auth",
    title: "AI Authentication System",
    description: "Concept for behavioral anomaly verification models paired with elegant visual identity flow UI.",
    fullDescription: "An exploration of secure identity governance. It leverages web-standard device signals and keystroke dynamics to construct a real-time risk index during sign-in, protected by elegant glassmorphic authentication controls.",
    category: "AI & ML",
    tags: ["React", "Web Crypto API", "Framer Motion", "Tailwind", "JWT"],
    metrics: [
      { label: "Fraud Prevention Integrity", value: "99.2% block-rate" },
      { label: "UI Authentication Latency", value: "<30ms validation" },
      { label: "User Interaction Rating", value: "4.95/5 score" }
    ],
    accentColor: "stone",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
    features: [
      "Biometric signature dynamic emulation mapping",
      "Seamless multi-factor interactive UI with soft physical transition steps",
      "Beautiful dashboard containing real-time login attempt scatter-plots",
      "Custom cryptographic key rotation triggers"
    ]
  },
  {
    id: "dev-productivity",
    title: "Dev Productivity Workspace",
    description: "A collaborative virtual developer environment combining a custom IDE terminal with Git diagrams.",
    fullDescription: "A browser-situated developer portal equipped with a simulated filesystem shell console, multi-file code editing panel, real-time command parser, and structured Git repository graph mapping that updates on commit simulation.",
    category: "Full Stack",
    tags: ["React", "Typescript", "Lucide Icons", "CSS grid", "Local Storage"],
    metrics: [
      { label: "Active Session Sync", value: "<10ms refresh" },
      { label: "Command Parser Coverage", value: "15 standard POSIX" },
      { label: "Rendering Performance", value: "60 FPS standard" }
    ],
    accentColor: "slate",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop",
    features: [
      "Virtual POSIX bash shell with simulated command directory utilities",
      "Code sandbox editor mimicking modern development styling",
      "Automatic interactive rendering of Git commit branches on execution",
      "Embedded code linting diagnostics console panel"
    ]
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: "exp-concentrix",
    role: "English Global Advisor, Digital Advertising",
    company: "Concentrix Malaysia",
    period: "2024 - Present",
    type: "Corporate",
    description: [
      "Optimized Meta advertising campaigns (Facebook/Instagram) for global brands by refining audience targeting, ad creatives, and bidding strategies, ensuring full political and policy compliance.",
      "Provided expert-level consulting and troubleshooting for a worldwide client base via chat, email, Webex, and phone, resolving complex issues related to ad delivery, account restrictions, billing, and policy violations.",
      "Analyzed campaign performance metrics to deliver actionable, strategic insights that strengthened advertisers' outcomes and maximized their return on investment (ROI)."
    ],
    skills: ["Campaign Optimization", "Meta Blueprint", "Customer Operations", "Performance Analysis", "Global Consulting"]
  },
  {
    id: "exp-tp-hr",
    role: "Offshore Shared Services, HR Specialist",
    company: "Teleperformance USA",
    period: "2022 - 2024",
    type: "HR Strategy",
    description: [
      "Managed the HR Helpdesk, providing front-line support to a workforce exceeding 30,000 employees, former employees, and job applicants across a major US market.",
      "Processed high volumes of critical HR documentation, including employment contracts, offboarding papers, and applicant tracking updates, maintaining data integrity and a flawless 100% compliance record.",
      "Liaised with Payroll, IT, and other cross-functional departments to swiftly resolve salary disputes, profile access, and complex HR-related inquiries."
    ],
    skills: ["HR Helpdesk", "Compliance Auditing", "Workplace Relations", "Cross-functional Coordination", "Document Processing"]
  },
  {
    id: "exp-tp-onboard",
    role: "Offshore Onboarding Specialist",
    company: "Teleperformance USA",
    period: "2021 - 2022",
    type: "HR Strategy",
    description: [
      "Orchestrated the end-to-end onboarding workflow for 70+ new corporate agents each week, ensuring a seamless and compliant transition into the organizational standards.",
      "Configured and validated system credentials and workspace environments for all new hires, ensuring all necessary tools and platforms were fully operational prior to day-one orientation."
    ],
    skills: ["Onboarding Operations", "Credential Management", "Workplace Integration", "Process Calibration"]
  },
  {
    id: "exp-alorica",
    role: "Customer Service / Retail Generalist",
    company: "Alorica Philippines (Supporting Amazon US & UK)",
    period: "2018 - 2021",
    type: "Corporate",
    description: [
      "Resolved a wide range of customer issues, including order placements, system adjustments, payment queries, and account management, adhering to strict SLAs.",
      "Managed escalations involving complex delivery disputes and cases across multiple chat, email, and phone channels, raising user satisfaction scores significantly."
    ],
    skills: ["Conflict Resolution", "Escalation Management", "System Support", "SLA Adherence"]
  },
  {
    id: "exp-solutions-architect",
    role: "Solutions Architect & AI Developer",
    company: "HR & Transformative Technology Systems",
    period: "2024 - Present",
    type: "AI Specialization",
    description: [
      "Designed and deployed enterprise SaaS applications utilizing React, TypeScript, and state-of-the-art Generative AI pipelines.",
      "Engineered automated workflows with Zapier and Make, bridging legacy HR database platforms with instant modern notification systems."
    ],
    skills: ["React", "TypeScript", "Node.js", "@google/genai", "Workflow Automation"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Full Stack Software Developer Professional Certificate",
    issuer: "IBM",
    completed: "May 2026",
    details: "ACE CREDITS / US : 18 credits | FIBAA — 6 Credits",
    verificationUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate"
  },
  {
    title: "Full Stack Software Developer Assessment V2",
    issuer: "IBM",
    completed: "May 2026",
    details: "Verification Key: IBM-FSD-ASSESS-2026",
    verificationUrl: "https://www.credly.com/organizations/ibm/badges"
  },
  {
    title: "Full Stack Application Development Capstone Project V2",
    issuer: "IBM",
    completed: "May 2026",
    details: "Node.js, Express, React, Docker, CI/CD",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify"
  },
  {
    title: "American Staffing Association Corporate Recruiting Professional Certificate",
    issuer: "American Staffing Association",
    completed: "May 2026",
    verificationUrl: "https://americanstaffing.net/education-certification/"
  },
  {
    title: "Responsible AI in a Global Context Professional Certificate",
    issuer: "United Nations (UN)",
    completed: "Apr 2026",
    verificationUrl: "https://www.un.org/en/observances/ai-day"
  },
  {
    title: "Six Sigma: Black Belt",
    issuer: "National Association of State Boards of Accountancy (NASBA)",
    completed: "Apr 2026",
    verificationUrl: "https://nasba.org/cpe/"
  },
  {
    title: "Program Management for IT Professionals",
    issuer: "SHRM",
    completed: "Apr 2026",
    verificationUrl: "https://www.shrm.org/credentials"
  },
  {
    title: "Human Resources: Creating an Employee Handbook",
    issuer: "SHRM",
    completed: "Apr 2026",
    verificationUrl: "https://www.shrm.org/credentials"
  },
  {
    title: "Succeeding as a First-Time Tech Manager",
    issuer: "Project Management Institute (PMI)",
    completed: "Apr 2026",
    verificationUrl: "https://www.pmi.org/certifications"
  },
  {
    title: "Getting Started as a Full-Stack Web Developer",
    issuer: "LinkedIn",
    completed: "Apr 2026",
    verificationUrl: "https://www.linkedin.com/learning/"
  },
  {
    title: "Innovative Customer Service Techniques",
    issuer: "Project Management Institute (PMI)",
    completed: "Jan 2026",
    verificationUrl: "https://www.pmi.org/certifications"
  },
  {
    title: "Plan and Prepare to Develop AI Solutions on Azure",
    issuer: "Microsoft",
    completed: "Jan 2026",
    verificationUrl: "https://learn.microsoft.com/credentials/"
  },
  {
    title: "AI Applications in Marketing and Finance",
    issuer: "University of Pennsylvania",
    completed: "Dec 2025",
    verificationUrl: "https://www.coursera.org/verify"
  },
  {
    title: "Generative AI Primer",
    issuer: "Vanderbilt University",
    completed: "Dec 2025",
    verificationUrl: "https://www.coursera.org/verify"
  },
  {
    title: "AI Fundamentals for Non-Data Scientists",
    issuer: "University of Pennsylvania",
    completed: "Dec 2025",
    verificationUrl: "https://www.coursera.org/verify"
  },
  {
    title: "AWS Artificial Intelligence Practitioner",
    issuer: "Amazon Web Services (AWS)",
    completed: "Dec 2025",
    verificationUrl: "https://aws.amazon.com/verification/"
  },
  {
    title: "Generative AI for HR Professionals",
    issuer: "Vanderbilt University",
    completed: "Dec 2025",
    verificationUrl: "https://www.coursera.org/verify"
  },
  {
    title: "Master Class on Leadership Excellence",
    issuer: "World Academy for Research & Development (WARD)",
    completed: "Feb 2025",
    verificationUrl: "https://wardbd.org/verification"
  },
  {
    title: "Certified Human Resource Associate (CHRA)",
    issuer: "CHRA Board",
    completed: "2018 / Ongoing",
    verificationUrl: "https://www.chra-board.org"
  },
  {
    title: "Certificate in Teaching English to Speakers of Other Languages (TESOL)",
    issuer: "HAIENGLISH / PASIG",
    completed: "23 November 2022",
    details: "120 hours completed program",
    verificationUrl: "https://haienglish.com/verify"
  },
  {
    title: "Certificate in Teaching English as a Foreign Language (TEFL)",
    issuer: "HAIENGLISH / PASIG",
    completed: "23 November 2022",
    details: "120 hours completed program",
    verificationUrl: "https://haienglish.com/verify"
  },
  {
    title: "Certified Lean Six Sigma White Belt",
    issuer: "International Society of Six Sigma Professionals",
    completed: "2019",
    verificationUrl: "https://www.sixsigmacertifications.org"
  },
  {
    title: "Master Class on Essentials of Kaizen",
    issuer: "World Academy for Research & Development (WARD)",
    completed: "2020",
    verificationUrl: "https://wardbd.org/verification"
  },
  {
    title: "Strategy and Operations",
    issuer: "International Business Management Institute (IBMI)",
    completed: "2020",
    verificationUrl: "https://www.ibm-institute.com/verify"
  }
];

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    degree: "Dual Master's Degrees (4.0/4.0 GPA)",
    institution: "Universidad Isabel I, Spain",
    period: "2024 - 2025",
    details: [
      "Master’s in Human Resources & Talent Management: Focused on end-to-end workforce lifecycle management, strategic manpower planning, competency modeling, HR analytics, and compliance.",
      "Master’s in AI for Business: Specialized in designing AI-driven business architectures, automated workflows, and predictive decision models for integration into HR, operations, and marketing functions."
    ]
  },
  {
    degree: "BS in Business Administration – Major in Human Resources & Development Management",
    institution: "University of Northern Philippines",
    period: "2014 - 2018",
    details: [
      "Graduated with specialized honors, focusing on personnel planning, organizational development, human labor relations, and administrative frameworks."
    ]
  }
];

export const TECHNICAL_SKILLS = {
  frontend: [
    { name: "HTML / CSS (Tailwind) Coding", level: 98 },
    { name: "Custom Web Design & Portfolio", level: 97 },
    { name: "TypeScript & React 19", level: 93 },
    { name: "Responsive Email Template Design", level: 95 },
    { name: "DNS & Domain Management", level: 88 }
  ],
  backendAi: [
    { name: "@google/genai SDK Integration", level: 92 },
    { name: "AI Chatbot Development (Custom)", level: 95 },
    { name: "Zapier & Make (Integromat)", level: 96 },
    { name: "Node.js / Express Server", level: 89 },
    { name: "Data Strategy & BI Models", level: 90 }
  ],
  transformation: [
    { name: "Strategic Workforce Planning & HR Strategy", level: 100 },
    { name: "Performance & Talent Acquisition", level: 98 },
    { name: "HR Compliance (Global & Local)", level: 100 },
    { name: "Business Process Mapping (Six Sigma)", level: 94 },
    { name: "Digital Advertising (Meta, Google, TikTok)", level: 95 }
  ]
};

export const METRICS: MetricCard[] = [
  {
    label: "Total Integrated Users",
    value: "45,210",
    change: "+12.4%",
    isPositive: true,
    sparkline: [30, 45, 40, 52, 60, 58, 68, 75]
  },
  {
    label: "AI Processing Throughput",
    value: "998K tps",
    change: "+28.1%",
    isPositive: true,
    sparkline: [20, 25, 42, 50, 48, 62, 70, 89]
  },
  {
    label: "System Platform SLA",
    value: "99.982%",
    change: "+0.01%",
    isPositive: true,
    sparkline: [99, 99, 99, 99, 100, 99, 100, 100]
  },
  {
    label: "Average Query Latency",
    value: "112ms",
    change: "-18.5%",
    isPositive: true, // Decreasing latency is positive!
    sparkline: [150, 142, 133, 128, 120, 118, 114, 112]
  }
];

export const CASE_STUDIES = [
  {
    title: "Transforming HR at Global Logix Inc.",
    industry: "Logistics, 8k Employees",
    challenge: "High unexpected management turnover, lack of technical tooling integration.",
    solution: "Rolled out our predictive AI analytics suite connected directly to active communications metadata.",
    result: "Reduced unwanted attrition by 24% over year-one; automated talent profiling across departments."
  },
  {
    title: "AI-Agents in Candidate Lifecycle",
    industry: "Fintech Startup Series-B",
    challenge: "Recruiting bottlenecks causing 45-day hiring lag.",
    solution: "Implemented automated RAG sifting and automated agent assessments.",
    result: "Cut cycle to 9 days, raised employee screening score ratings from 3.8 to 4.7 stars."
  }
];

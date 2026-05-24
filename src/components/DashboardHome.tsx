import { motion } from "motion/react";
import { Cpu, Users, GitCommit, Database, Milestone, Star, Terminal, ExternalLink, Calendar, CheckCircle, Award } from "lucide-react";
import { PROJECTS, METRICS, TECHNICAL_SKILLS, CASE_STUDIES, CERTIFICATIONS, EDUCATION_HISTORY } from "../data";
import { Project } from "../types";

const renderIssuerLogo = (issuer: string) => {
  const norm = issuer.toUpperCase();
  if (norm.includes("IBM")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-[#0F62FE]/10 border border-[#0F62FE]/20 text-[#0F62FE] px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="text-[#0F62FE] font-serif font-extrabold select-none">IBM</span>
      </div>
    );
  }
  if (norm.includes("UNITED NATIONS") || norm.includes("UN")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-[#009EDB]/10 border border-[#009EDB]/20 text-[#009EDB] px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="text-[#009EDB] font-sans font-bold select-none">🇺🇳 UN</span>
      </div>
    );
  }
  if (norm.includes("SHRM")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-purple-700/10 border border-purple-700/20 text-purple-700 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="text-purple-700 font-sans font-extrabold select-none">SHRM</span>
      </div>
    );
  }
  if (norm.includes("MICROSOFT")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-[#00A4EF]/10 border border-[#00A4EF]/20 text-[#0078D4] px-1 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="text-[#00A4EF] font-semibold select-none">MSFT</span>
      </div>
    );
  }
  if (norm.includes("AWS") || norm.includes("AMAZON")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-amber-500/10 border border-amber-500/20 text-amber-600 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="font-sans font-extrabold select-none">AWS</span>
      </div>
    );
  }
  if (norm.includes("LINKEDIN")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="font-sans font-extrabold select-none">in</span>
      </div>
    );
  }
  if (norm.includes("PENNSYLVANIA") || norm.includes("UPENN")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-[#990000]/10 border border-[#990000]/20 text-[#990000] px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="font-serif font-extrabold select-none">Penn</span>
      </div>
    );
  }
  if (norm.includes("VANDERBILT")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-[#866D4B]/10 border border-[#866D4B]/20 text-[#866D4B] px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="font-serif font-extrabold select-none">V</span>
      </div>
    );
  }
  if (norm.includes("PROJECT MANAGEMENT") || norm.includes("PMI")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-blue-700/10 border border-blue-700/20 text-blue-700 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="font-sans font-extrabold select-none">PMI</span>
      </div>
    );
  }
  if (norm.includes("STAFFING")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-[#002C77]/10 border border-[#002C77]/20 text-[#002C77] px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="font-sans font-extrabold select-none">ASA</span>
      </div>
    );
  }
  if (norm.includes("NASBA")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-emerald-700/10 border border-emerald-700/20 text-emerald-800 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="font-sans font-extrabold select-none">NASBA</span>
      </div>
    );
  }
  if (norm.includes("SIX SIGMA") || norm.includes("SIGMA")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-slate-700/10 border border-slate-700/20 text-slate-800 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="font-sans select-none">Σ (LSS)</span>
      </div>
    );
  }
  if (norm.includes("WARD")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-amber-600/10 border border-amber-600/20 text-amber-700 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="font-sans font-bold select-none">🏆 WARD</span>
      </div>
    );
  }
  if (norm.includes("CHRA")) {
    return (
      <div className="flex items-center space-x-1 shrink-0 bg-rose-700/10 border border-rose-700/20 text-rose-700 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
        <span className="font-sans font-bold select-none">CHRA</span>
      </div>
    );
  }
  return (
    <div className="flex items-center space-x-1 shrink-0 bg-charcoal/10 border border-charcoal/20 text-charcoal/80 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider font-mono">
      <span>CERT</span>
    </div>
  );
};

interface DashboardHomeProps {
  onNavigateToView: (view: string) => void;
  onSelectProject: (proj: Project) => void;
}

export default function DashboardHome({ onNavigateToView, onSelectProject }: DashboardHomeProps) {
  // Generate random heatmap arrays for Github visualizer
  const heatmapRows = 7;
  const heatmapCols = 40;
  const totalCells = heatmapRows * heatmapCols;
  const contributions = Array.from({ length: totalCells }, (_, i) => {
    // Generate organic clusters of active commits
    const phase = Math.sin(i / 15) * Math.cos(i / 8);
    if (phase > 0.5) return 4; // High activity
    if (phase > 0.1) return 2; // Mid activity
    if (phase > -0.3) return 1; // Light activity
    return 0; // No activity
  });

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 4: return "bg-charcoal opacity-100";
      case 3: return "bg-charcoal opacity-80";
      case 2: return "bg-charcoal opacity-50";
      case 1: return "bg-charcoal opacity-20";
      default: return "bg-charcoal/[0.04]";
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Welcome Unit */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-6 md:p-8 border border-charcoal/5 shadow-sm space-y-4 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cream/15 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase bg-charcoal/5 text-charcoal px-2.5 py-1 rounded-full">
              Enterprise Dashboard Entry
            </span>
            <h2 className="font-display text-2xl md:text-3.5xl font-bold tracking-tight text-charcoal">
              Welcome to JELVAN® Ecosystem
            </h2>
            <p className="text-sm md:text-base text-charcoal/75 max-w-2xl leading-relaxed">
              Jelvan Ricolcol bridges the gap between digital systems development (TypeScript, full-stack deployment, custom automation workflows) and strategic human capital transformation.
            </p>
          </div>
          <button 
            onClick={() => onNavigateToView("VIEW_D_WORKSPACE")}
            className="flex items-center space-x-2 bg-charcoal text-cream font-mono text-xs px-4 py-2.5 rounded-lg border border-charcoal/10 hover:bg-charcoal/90 transition-colors shrink-0"
          >
            <Terminal className="w-4 h-4" />
            <span>Open AI Agent Terminal</span>
          </button>
        </div>

        {/* Quick high-impact figures */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-charcoal/5 mt-2">
          <div className="space-y-1">
            <span className="text-xs text-charcoal/40 font-mono">CORE ROLE</span>
            <div className="text-sm md:text-base font-semibold text-charcoal">Solutions Architect</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-charcoal/40 font-mono">INDUSTRY SCALE</span>
            <div className="text-sm md:text-base font-semibold text-charcoal">15k Active Enrolled</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-charcoal/40 font-mono">AGENCY MODEL STACK</span>
            <div className="text-sm md:text-base font-semibold text-charcoal">Gemini Realtime Node</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-charcoal/40 font-mono">PLATFORM SLA UPTIME</span>
            <div className="text-sm md:text-base font-semibold text-emerald-700">99.982% Live</div>
          </div>
        </div>
      </motion.div>

      {/* KPI Stats Widgets with Custom SVG Sparklines */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {METRICS.map((m, idx) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-charcoal/50 uppercase tracking-wider">{m.label}</span>
              <span className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${
                m.isPositive ? "text-green-800 bg-green-50" : "text-amber-800 bg-amber-50"
              }`}>
                {m.change}
              </span>
            </div>
            
            <div className="flex items-end justify-between">
              <span className="text-2xl font-display font-bold text-charcoal">{m.value}</span>
              
              {/* Responsive SVG Sparkline */}
              <div className="w-18 h-8">
                <svg className="w-full h-full overflow-visible">
                  <path
                    d={m.sparkline.reduce((acc, val, i) => {
                      const totalPoints = m.sparkline.length;
                      const x = (i / (totalPoints - 1)) * 72;
                      // Normalize val using limits (y dimensions are 32)
                      const min = Math.min(...m.sparkline);
                      const max = Math.max(...m.sparkline);
                      const range = max - min || 1;
                      const y = 30 - ((val - min) / range) * 26;
                      return acc + `${i === 0 ? "M" : "L"} ${x} ${y}`;
                    }, "")}
                    fill="none"
                    stroke="var(--color-charcoal)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Glowing end node */}
                  <circle
                    cx="72"
                    cy={30 - ((m.sparkline[m.sparkline.length - 1] - Math.min(...m.sparkline)) / (Math.max(...m.sparkline) - Math.min(...m.sparkline) || 1)) * 26}
                    r="2.5"
                    fill="var(--color-charcoal)"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Double Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Main Content Feed */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Projects Showcase Grid */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-lg text-charcoal flex items-center space-x-2">
                <Database className="w-4.5 h-4.5" />
                <span>Featured Systems Portfolio</span>
              </h3>
              <button 
                onClick={() => onNavigateToView("VIEW_B_CREATIVE")}
                className="text-xs font-mono text-charcoal/60 hover:text-charcoal flex items-center space-x-1"
              >
                <span>Visual Grid Mode</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS.slice(0, 4).map((p) => (
                <div 
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="bg-white rounded-xl border border-charcoal/5 shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-charcoal/50 uppercase tracking-widest">{p.category}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-charcoal group-hover:scale-125 transition-transform" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-base text-charcoal group-hover:text-charcoal/80 transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-xs text-charcoal/60 mt-1 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[9px] font-mono text-charcoal/60 bg-charcoal/[0.03] px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="bg-charcoal/[0.01] border-t border-charcoal/[0.04] p-3 px-5 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-charcoal/50">{p.metrics[0].label}</span>
                    <span className="text-[10px] font-mono font-medium text-charcoal">{p.metrics[0].value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive GitHub Contribution Graph representation */}
          <div className="bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <h4 className="font-display font-bold text-sm text-charcoal flex items-center space-x-2">
                  <GitCommit className="w-4 h-4" />
                  <span>Interactive Agent Ingress Graph</span>
                </h4>
                <p className="text-[11px] text-charcoal/50 font-mono">Automated monitoring logs registering code synthesis commit sessions in real time.</p>
              </div>
              <div className="text-[10px] font-mono bg-charcoal/5 px-2 py-0.5 rounded text-charcoal">
                398 Core Commits (YTD)
              </div>
            </div>

            {/* Scrollable Heatmap Wrap */}
            <div className="overflow-x-auto pb-1 pt-2">
              <div className="flex flex-col gap-1 w-max">
                {Array.from({ length: heatmapRows }).map((_, rIdx) => (
                  <div key={rIdx} className="flex gap-1">
                    {Array.from({ length: heatmapCols }).map((_, cIdx) => {
                      const cellIdx = rIdx * heatmapCols + cIdx;
                      const level = contributions[cellIdx];
                      return (
                        <div
                          key={cIdx}
                          title={`Security audit index Level ${level}`}
                          className={`w-[11.5px] h-[11.5px] rounded-[2.5px] transition-colors duration-200 cursor-pointer hover:ring-2 hover:ring-charcoal/30 ${getHeatmapColor(level)}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend indicators */}
            <div className="flex justify-between items-center text-[9px] font-mono text-charcoal/40 pt-1">
              <span>ACTIVE SYSTEM RETENTION METRIC</span>
              <div className="flex items-center space-x-1.5">
                <span>Inert</span>
                <div className="w-2.5 h-2.5 bg-charcoal/[0.04] rounded-[1.5px]" />
                <div className="w-2.5 h-2.5 bg-charcoal/20 rounded-[1.5px]" />
                <div className="w-2.5 h-2.5 bg-charcoal/50 rounded-[1.5px]" />
                <div className="w-2.5 h-2.5 bg-charcoal rounded-[1.5px]" />
                <span>Hyper-Active</span>
              </div>
            </div>
          </div>

          {/* Strategic Consulting & HR Digital Case Studies */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg text-charcoal flex items-center space-x-2">
              <Milestone className="w-4.5 h-4.5" />
              <span>Digital Transformation & HR Case Studies</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CASE_STUDIES.map((c, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-charcoal/50 bg-charcoal/[0.04] p-1 px-2 rounded uppercase tracking-wider">
                      {c.industry}
                    </span>
                    <h5 className="font-display font-semibold text-sm text-charcoal pt-1">{c.title}</h5>
                  </div>
                  
                  <div className="space-y-2 text-xs text-charcoal/70 leading-relaxed">
                    <div className="flex items-start space-x-1.5">
                      <span className="text-red-800 font-mono font-medium text-[10px] uppercase pt-0.5 shrink-0">Issue:</span>
                      <p>{c.challenge}</p>
                    </div>
                    <div className="flex items-start space-x-1.5">
                      <span className="text-charcoal font-mono font-medium text-[10px] uppercase pt-0.5 shrink-0">SaaS:</span>
                      <p>{c.solution}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-charcoal/[0.04] flex items-center justify-between text-[11px] font-mono text-emerald-800 font-semibold bg-emerald-50/50 p-2 rounded">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Core Impact
                    </span>
                    <span>{c.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Tech Skill bars & Status widget */}
        <div className="space-y-6">
          
          {/* Active status card */}
          <div className="bg-charcoal text-cream rounded-xl p-5 shadow-inner space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-cream/40 tracking-widest uppercase">NODE STATE STATUS</span>
              <span className="flex items-center space-x-1 bg-cream/10 px-2 py-0.5 rounded text-[9px] font-mono text-cream/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>ONLINE</span>
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xl font-display font-medium text-cream">Deployment Vector</div>
              <p className="text-xs text-cream/65 leading-relaxed font-sans">
                Currently taking selected consulting pipelines, Full Stack engineering partnerships, and bespoke AI application development strategies.
              </p>
            </div>

            <div className="pt-3 border-t border-cream/10 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <Star className="w-3.5 h-3.5 text-cream/80 fill-cream/20" />
                <span className="text-[10px] font-mono text-cream/75">Enterprise Priority Ingress</span>
              </div>
              <button 
                onClick={() => onNavigateToView("VIEW_E_MOBILE")}
                className="text-[10px] font-mono text-cream underline hover:text-cream-light"
              >
                Mobile Concept Hub
              </button>
            </div>
          </div>

          {/* Core Skills Widget */}
          <div className="bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm space-y-4">
            <h4 className="font-display font-bold text-sm text-charcoal flex items-center space-x-2">
              <Cpu className="w-4.5 h-4.5" />
              <span>Core Tech Proficiency</span>
            </h4>

            {/* Category: Frontend */}
            <div className="space-y-3.5">
              <div>
                <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest block mb-2">Frontend Engineering</span>
                <div className="space-y-2">
                  {TECHNICAL_SKILLS.frontend.map((s) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-charcoal/80 text-[11px]">{s.name}</span>
                        <span className="text-charcoal/40 text-[10px]">{s.level}%</span>
                      </div>
                      <div className="h-1 bg-charcoal/[0.04] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-charcoal transition-all duration-1000" 
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category: AI & Backend */}
              <div>
                <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest block mb-2">AI Systems & APIs</span>
                <div className="space-y-2">
                  {TECHNICAL_SKILLS.backendAi.map((s) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-charcoal/80 text-[11px]">{s.name}</span>
                        <span className="text-charcoal/40 text-[10px]">{s.level}%</span>
                      </div>
                      <div className="h-1 bg-charcoal/[0.04] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-charcoal/70 transition-all duration-1000" 
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category: Digital Transformation */}
              <div>
                <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest block mb-2">strategic Alignment & HR</span>
                <div className="space-y-2">
                  {TECHNICAL_SKILLS.transformation.map((s) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-charcoal/80 text-[11px]">{s.name}</span>
                        <span className="text-charcoal/40 text-[10px]">{s.level}%</span>
                      </div>
                      <div className="h-1 bg-charcoal/[0.04] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-charcoal/40 transition-all duration-1000" 
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Degrees & Specialized Education */}
          <div className="bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm space-y-3.5">
            <div className="flex justify-between items-center pb-2 border-b border-charcoal/[0.04]">
              <h4 className="font-display font-semibold text-xs text-charcoal uppercase tracking-wider flex items-center space-x-1.5">
                <Milestone className="w-4 h-4 text-charcoal" />
                <span>Academic Foundations</span>
              </h4>
              <span className="text-[9px] font-mono bg-charcoal/5 text-charcoal px-1.5 py-0.5 rounded text-center">DEGREES</span>
            </div>
            
            <div className="space-y-3">
              {EDUCATION_HISTORY.map((edu, idx) => (
                <div 
                  key={idx} 
                  className="p-3 bg-charcoal/[0.015] hover:bg-charcoal/[0.03] border border-charcoal/[0.04] rounded-xl transition-all space-y-1.5 group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[11.5px] font-sans font-bold text-charcoal leading-snug tracking-tight">
                      {edu.degree}
                    </span>
                    <span className="text-[9px] font-mono text-charcoal/40 whitespace-nowrap pt-0.5 shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  
                  <div className="text-[10px] text-charcoal/60 font-mono">
                    {edu.institution}
                  </div>

                  {edu.details && edu.details.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-charcoal/[0.03]">
                      {edu.details.map((detail, dIdx) => (
                        <p key={dIdx} className="text-[9px] text-charcoal/70 leading-relaxed font-sans list-item list-inside">
                          {detail}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Verified Credentials Audit Console */}
          <div className="bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm space-y-3.5">
            <div className="flex justify-between items-center pb-2 border-b border-charcoal/[0.04]">
              <h4 className="font-display font-semibold text-xs text-charcoal uppercase tracking-wider flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-charcoal" />
                <span>Credentials Audit ({CERTIFICATIONS.length})</span>
              </h4>
              <span className="text-[9px] font-mono bg-charcoal/5 text-charcoal px-1.5 py-0.5 rounded text-center">VERIFIED</span>
            </div>
            
            <div className="max-h-[380px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
              {CERTIFICATIONS.map((cert, idx) => (
                <div 
                  key={idx} 
                  className="p-3 bg-charcoal/[0.015] hover:bg-charcoal/[0.03] border border-charcoal/[0.04] rounded-xl transition-all space-y-2 group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[11px] font-sans font-bold text-charcoal leading-snug tracking-tight group-hover:text-charcoal/80 transition-colors">
                      {cert.title}
                    </span>
                    <span className="text-[9px] font-mono text-charcoal/40 whitespace-nowrap pt-0.5 shrink-0">
                      {cert.completed}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-1.5 pt-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {renderIssuerLogo(cert.issuer)}
                      <span className="text-[9px] text-charcoal/50 font-sans truncate" title={cert.issuer}>
                        {cert.issuer}
                      </span>
                    </div>
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[8.5px] font-mono text-blue-700 hover:text-blue-950 flex items-center gap-0.5 hover:underline shrink-0"
                      >
                        <span>Verify ↗</span>
                      </a>
                    )}
                  </div>

                  {cert.details && (
                    <div className="text-[8.5px] font-mono text-emerald-800 bg-emerald-50/70 border border-emerald-500/[0.08] p-1.5 rounded">
                      {cert.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

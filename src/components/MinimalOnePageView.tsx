import { PROJECTS, EXPERIENCE_TIMELINE, TECHNICAL_SKILLS, CERTIFICATIONS, EDUCATION_HISTORY } from "../data";
import { Mail, Compass, Star, ChevronDown, Award, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

export default function MinimalOnePageView() {
  return (
    <div className="max-w-3xl mx-auto space-y-24 py-12 select-none select-text">
      
      {/* 1. Header Hero Minimal Block */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-charcoal" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-charcoal/50">ESTABLISHED DESIGNATION</span>
        </div>
        <h2 className="font-display text-4xl sm:text-6.5xl font-semibold tracking-tight text-charcoal leading-none">
          Jelvan Ricolcol
        </h2>
        <p className="text-sm font-mono text-charcoal/50 uppercase tracking-widest">
          Strategic HR & Digital Transformation Specialist • Solutions Architect
        </p>
        <p className="text-base sm:text-lg text-charcoal/70 font-sans leading-relaxed pt-2">
          Developing structural core platforms aligned with organizational transformations. Translating business demands into performant, elegant, and typographically pristine SaaS portfolios.
        </p>
      </div>

      {/* 2. Strategic Narrative / About */}
      <div className="space-y-6 border-t border-charcoal/5 pt-12">
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-charcoal/40 font-bold block">
          01. Executive Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-charcoal/70 leading-relaxed font-sans">
          <p className="md:col-span-2 text-sm leading-relaxed text-charcoal/85">
            Operating as a dual full-stack engineer and strategic HR director, Jelvan designs high-density digital systems, automated onboarding architectures, and compliance verification modules. His methodology emphasizes high compliance safety, software-edge automation, and exceptional customer experience.
          </p>
          <div className="space-y-3 bg-white/40 p-4 rounded-xl border border-charcoal/5">
            <span className="text-[10px] font-mono uppercase text-charcoal/40 block">Operational Scope</span>
            <div className="space-y-1 text-[11px]">
              <div>• Corporate SaaS Platforms</div>
              <div>• Deep Predictive Attrition</div>
              <div>• Web Crypto Integrations</div>
              <div>• Design Systems Drafting</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Skills Matrix (Minimal Style) */}
      <div className="space-y-6 border-t border-charcoal/5 pt-12">
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-charcoal/40 font-bold block">
          02. Direct Proficiencies
        </h3>
        
        <div className="space-y-6 text-xs font-mono">
          <div>
            <span className="text-[10.5px] uppercase text-charcoal/50 tracking-wider block mb-4">Core Technology</span>
            <div className="flex flex-wrap gap-2">
              {TECHNICAL_SKILLS.frontend.concat(TECHNICAL_SKILLS.backendAi).map((skill) => (
                <span key={skill.name} className="border border-charcoal/15 text-charcoal px-3 py-1.5 rounded-lg text-[11px] bg-white shadow-sm font-sans hover:bg-charcoal hover:text-cream transition-colors duration-150 cursor-default">
                  {skill.name} — {skill.level}%
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <span className="text-[10.5px] uppercase text-charcoal/50 tracking-wider block mb-4">Strategic HR / Transformation Systems</span>
            <div className="flex flex-wrap gap-2">
              {TECHNICAL_SKILLS.transformation.map((skill) => (
                <span key={skill.name} className="border border-charcoal/15 text-charcoal/80 px-3 py-1.5 rounded-lg text-[11px] bg-white font-sans hover:bg-charcoal hover:text-cream transition-colors duration-150 cursor-default">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Timeline (Experience) */}
      <div className="space-y-8 border-t border-charcoal/5 pt-12">
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-charcoal/40 font-bold block">
          03. Experience Timeline
        </h3>

        <div className="space-y-10">
          {EXPERIENCE_TIMELINE.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 group">
              <div className="space-y-1">
                <span className="font-mono text-xs text-charcoal/40">{item.period}</span>
                <span className="font-mono text-[10px] text-emerald-800 tracking-wider block font-semibold uppercase">{item.type} EXP</span>
              </div>
              <div className="md:col-span-2 space-y-3">
                <div>
                  <h4 className="font-display font-semibold text-base text-charcoal group-hover:text-charcoal/70 transition-colors">
                    {item.role}
                  </h4>
                  <span className="font-mono text-xs text-charcoal/50">{item.company}</span>
                </div>
                <ul className="space-y-2 text-xs text-charcoal/75 leading-relaxed font-sans">
                  {item.description.map((desc, idx) => (
                    <li key={idx} className="list-disc list-inside">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Academic Degrees & Specialized Education */}
      <div className="space-y-8 border-t border-charcoal/5 pt-12">
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-charcoal/40 font-bold block">
          04. Academic Degrees & Specialized Education
        </h3>

        <div className="space-y-8">
          {EDUCATION_HISTORY.map((edu, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 group">
              <div className="space-y-1">
                <span className="font-mono text-xs text-charcoal/40">{edu.period}</span>
                <span className="font-mono text-[10px] text-blue-800 tracking-wider block font-semibold uppercase">ACADEMIC DEGR</span>
              </div>
              <div className="md:col-span-2 space-y-3">
                <div>
                  <h4 className="font-display font-semibold text-base text-charcoal group-hover:text-charcoal/70 transition-colors">
                    {edu.degree}
                  </h4>
                  <span className="font-mono text-xs text-charcoal/50">{edu.institution}</span>
                </div>
                <ul className="space-y-2 text-xs text-charcoal/75 leading-relaxed font-sans">
                  {edu.details?.map((detail, dIdx) => (
                    <li key={dIdx} className="list-disc list-inside">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Professional Credentials & Certifications */}
      <div className="space-y-6 border-t border-charcoal/5 pt-12">
        <div className="flex justify-between items-center">
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-charcoal/40 font-bold block">
            05. Professional Credentials & Certifications
          </h3>
          <span className="text-[10px] font-mono text-charcoal/40 uppercase">Total: {CERTIFICATIONS.length} Verified</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((cert, idx) => {
            const norm = cert.issuer.toUpperCase();
            let logoEl = (
              <span className="bg-charcoal/5 text-charcoal px-1.5 py-0.5 rounded text-[8px] font-bold font-mono">CERT</span>
            );
            if (norm.includes("IBM")) {
              logoEl = <span className="bg-blue-600/10 text-blue-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">IBM</span>;
            } else if (norm.includes("UNITED NATIONS") || norm.includes("UN")) {
              logoEl = <span className="bg-sky-500/10 text-sky-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">🇺🇳 UN</span>;
            } else if (norm.includes("SHRM")) {
              logoEl = <span className="bg-purple-600/10 text-purple-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">SHRM</span>;
            } else if (norm.includes("MICROSOFT")) {
              logoEl = <span className="bg-cyan-500/10 text-cyan-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">MSFT</span>;
            } else if (norm.includes("AWS") || norm.includes("AMAZON")) {
              logoEl = <span className="bg-amber-500/10 text-amber-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">AWS</span>;
            } else if (norm.includes("LINKEDIN")) {
              logoEl = <span className="bg-blue-700/10 text-blue-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">LINKEDIN</span>;
            } else if (norm.includes("PENNSYLVANIA") || norm.includes("UPENN")) {
              logoEl = <span className="bg-red-700/10 text-red-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">PENN</span>;
            } else if (norm.includes("VANDERBILT")) {
              logoEl = <span className="bg-yellow-700/10 text-yellow-800 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">VANDY</span>;
            } else if (norm.includes("PROJECT MANAGEMENT") || norm.includes("PMI")) {
              logoEl = <span className="bg-teal-600/10 text-teal-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">PMI</span>;
            } else if (norm.includes("STAFFING")) {
              logoEl = <span className="bg-indigo-600/10 text-indigo-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">ASA</span>;
            } else if (norm.includes("NASBA")) {
              logoEl = <span className="bg-emerald-600/10 text-emerald-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">NASBA</span>;
            } else if (norm.includes("SIX SIGMA") || norm.includes("SIGMA")) {
              logoEl = <span className="bg-neutral-600/10 text-neutral-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">SIGMA</span>;
            } else if (norm.includes("WARD")) {
              logoEl = <span className="bg-yellow-600/10 text-yellow-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">WARD</span>;
            } else if (norm.includes("CHRA")) {
              logoEl = <span className="bg-rose-600/10 text-rose-700 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono">CHRA</span>;
            }

            return (
              <div key={idx} className="p-3 bg-white hover:bg-charcoal/[0.02] border border-charcoal/5 rounded-xl transition-all flex flex-col justify-between space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[11.5px] font-sans font-bold text-charcoal leading-tight">
                    {cert.title}
                  </span>
                  <span className="text-[9px] font-mono text-charcoal/40 whitespace-nowrap pt-0.5 shrink-0">
                    {cert.completed}
                  </span>
                </div>
                
                <div className="flex items-center justify-between space-x-1.5 flex-wrap gap-1">
                  <div className="flex items-center space-x-1.5 min-w-0">
                    {logoEl}
                    <span className="text-[10px] text-charcoal/50 font-sans truncate">
                      {cert.issuer}
                    </span>
                  </div>
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-mono text-blue-700 hover:text-blue-900 flex items-center space-x-0.5 hover:underline shrink-0"
                    >
                      <span className="flex items-center gap-0.5">Verify <ExternalLink className="w-2 h-2" /></span>
                    </a>
                  )}
                </div>

                {cert.details && (
                  <div className="text-[8.5px] font-mono text-emerald-800 bg-emerald-50/50 p-1.5 rounded border border-emerald-500/[0.04]">
                    {cert.details}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Selected Systems Built */}
      <div className="space-y-6 border-t border-charcoal/5 pt-12">
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-charcoal/40 font-bold block">
          06. Selected Systems Built
        </h3>

        <div className="divide-y divide-charcoal/10 font-sans">
          {PROJECTS.map((p) => (
            <div key={p.id} className="py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group cursor-help">
              <div className="space-y-1 max-w-xl">
                <h4 className="font-display font-semibold text-base text-charcoal group-hover:underline">
                  {p.title}
                </h4>
                <p className="text-xs text-charcoal/60 leading-relaxed font-sans">
                  {p.description}
                </p>
              </div>
              
              <div className="text-right shrink-0">
                <span className="text-[10.5px] font-mono text-charcoal/40 bg-charcoal/[0.04] p-1 px-2.5 rounded-full block text-center sm:text-right">
                  {p.metrics[0].value}
                </span>
                <span className="text-[9px] font-mono text-charcoal/30 uppercase mt-1 block tracking-widest">{p.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Communications & Port Ingress */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8 border-t border-charcoal/5 pt-12 pb-12"
      >
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-charcoal/40 font-bold block">
          07. Communications & Port Ingress
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/50 p-6 rounded-2xl border border-charcoal/5">
          <div className="space-y-3 font-sans">
            <h4 className="font-display font-semibold text-base text-charcoal">Get in touch</h4>
            <p className="text-xs text-charcoal/65 leading-relaxed">
              Jelvan is currently taking senior advisory roles, enterprise full-stack software development pipelines, and advanced AI digital transformation consultancies.
            </p>
            
            <a 
              href="mailto:hireme@jelvan.pro"
              className="inline-flex items-center space-x-2 text-xs font-mono font-medium text-charcoal hover:underline mt-2 bg-charcoal text-cream px-3 py-1.5 rounded-lg shadow"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>hireme@jelvan.pro</span>
            </a>
            <div className="text-[11px] font-mono text-charcoal/60 mt-1">
              Tel: +60 11-6422 5901
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono border-t md:border-t-0 md:border-l border-charcoal/10 pt-4 md:pt-0 md:pl-6">
            <div className="space-y-0.5">
              <span className="text-[10px] text-charcoal/40 uppercase">CORE AVAILABILITY</span>
              <div className="text-charcoal font-medium">Accepting global consultancies</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-charcoal/40 uppercase">PRIMARY ZONE</span>
              <div className="text-charcoal font-medium">Asia-Pacific GMT+8 timezone scale</div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

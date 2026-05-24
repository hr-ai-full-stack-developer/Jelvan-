import { useState } from "react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import { Eye, Layout, Smartphone, Tablet, Monitor, Sparkles, AlertCircle } from "lucide-react";

interface CreativeModeProps {
  onSelectProject: (proj: Project) => void;
}

export default function CreativeMode({ onSelectProject }: CreativeModeProps) {
  const [deviceFrame, setDeviceFrame] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeProject, setActiveProject] = useState<Project>(PROJECTS[0]);

  // Framer-inspired design philosophy statements
  const philosophies = [
    { num: "01", title: "AESTHETIC COMPOSABILITY", desc: "Code is design, and design is code. Components are engineered with mathematical pixel precision." },
    { num: "02", title: "COGNITIVE SPEED LIMITS", desc: "UI latency is design friction. Animation must serve to guide focus, never to distract or slow down." },
    { num: "03", title: "ARCHITECTURAL HONESTY", desc: "No tech-slop, mock loaders, or low-quality telemetry noise. Authentic interactive feedback matters." }
  ];

  return (
    <div className="space-y-12 py-4">
      {/* Visual Design Intro */}
      <div className="max-w-3xl space-y-4">
        <span className="text-[10px] font-mono tracking-widest uppercase bg-charcoal text-cream px-3 py-1 rounded inline-block">
          Creative Presentation Mode
        </span>
        <h2 className="font-display text-3xl md:text-5.5xl font-semibold tracking-tight text-charcoal leading-none">
          Handcrafted Visual Interfaces. Engineered With Pure Typography.
        </h2>
        <p className="text-sm md:text-base text-charcoal/60 leading-relaxed font-sans max-w-2xl">
          Visual luxury is built on white space, strong structural grid alignments, intentional type selection (using sans-serif Inter paired with elegant display Space Grotesk), and interactive responses.
        </p>
      </div>

      {/* Horizontal Staggered Visual Project Slider */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
          Aesthetic Case Studies Showcase (Horizontal Roll)
        </h3>
        
        {/* Horizontal scroll container */}
        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory">
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setActiveProject(p);
                onSelectProject(p);
              }}
              className="snap-start shrink-0 w-[290px] sm:w-[380px] bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="h-44 overflow-hidden relative bg-charcoal/5">
                <img 
                  src={p.imageUrl} 
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-80" />
                
                {/* Float Category Badge */}
                <span className="absolute top-4 left-4 text-[9px] font-mono tracking-widest uppercase bg-cream text-charcoal px-2 py-0.5 rounded">
                  {p.category}
                </span>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h4 className="font-display font-bold text-base text-white tracking-tight">{p.title}</h4>
                  <span className="text-[9px] font-mono text-white/70 tracking-tighter">VIEW DETAILED CASE</span>
                </div>
              </div>

              {/* Text Card content */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-charcoal/60 leading-relaxed">
                  {p.description}
                </p>

                {/* Mini metrics block */}
                <div className="bg-charcoal/[0.02] p-3 rounded-lg border border-charcoal/10 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-charcoal/50">{p.metrics[0].label}</span>
                  <span className="font-medium text-charcoal">{p.metrics[0].value}</span>
                </div>

                {/* Tag stack list */}
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[8px] font-mono text-charcoal/70 bg-charcoal/5 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Component Mockups Block: Device Frame Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4 items-center">
        
        {/* Device Configuration Settings Panel */}
        <div className="space-y-6 lg:col-span-1">
          <div className="space-y-2">
            <span className="text-[9px] font-mono text-charcoal/40 uppercase">LIVE DEVICE FRAME TESTER</span>
            <h3 className="font-display font-semibold text-xl text-charcoal">Responsive Layout Quality</h3>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Toggle mock client viewports to observe Jelvan's responsive layout fluidity. The systems dynamically render to desktop screens, tablet dimensions, or native swipe-ready mobile scopes.
            </p>
          </div>

          {/* Toggle Button layout */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setDeviceFrame("desktop")}
              className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-all ${
                deviceFrame === "desktop" ? "bg-charcoal text-cream border-charcoal" : "bg-white text-charcoal hover:bg-charcoal/[0.02] border-charcoal/10"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <div>
                <div className="text-xs font-semibold">Desktop Workspace Frame</div>
                <div className="text-[10px] font-mono opacity-60">1440px viewport rendering</div>
              </div>
            </button>

            <button
              onClick={() => setDeviceFrame("tablet")}
              className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-all ${
                deviceFrame === "tablet" ? "bg-charcoal text-cream border-charcoal" : "bg-white text-charcoal hover:bg-charcoal/[0.02] border-charcoal/10"
              }`}
            >
              <Tablet className="w-4 h-4" />
              <div>
                <div className="text-xs font-semibold">Adaptive Tablet Frame</div>
                <div className="text-[10px] font-mono opacity-60">768px portrait mode preview</div>
              </div>
            </button>

            <button
              onClick={() => setDeviceFrame("mobile")}
              className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-all ${
                deviceFrame === "mobile" ? "bg-charcoal text-cream border-charcoal" : "bg-white text-charcoal hover:bg-charcoal/[0.02] border-charcoal/10"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <div>
                <div className="text-xs font-semibold">iOS Smartphone Canvas</div>
                <div className="text-[10px] font-mono opacity-60">390px fluid mobile system</div>
              </div>
            </button>
          </div>

          {/* Prompting detail */}
          <div className="bg-cream-light p-4 rounded-xl border border-charcoal/5 flex space-x-3">
            <Sparkles className="w-4.5 h-4.5 text-charcoal/70 shrink-0" />
            <p className="text-[11px] text-charcoal/70 leading-relaxed font-sans">
              Currently visualizing mockup dimensions of <strong>{activeProject.title}</strong>. Click cards above to dynamically switch context.
            </p>
          </div>
        </div>

        {/* Floating Simulated Device Viewport Screen */}
        <div className="lg:col-span-2 flex justify-center items-center py-6 bg-charcoal/[0.03] rounded-2xl border border-charcoal/5 p-4 min-h-[380px]">
          
          <div className="w-full flex justify-center transition-all duration-500">
            {deviceFrame === "desktop" && (
              <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border border-charcoal/10 overflow-hidden transform transition-all duration-500">
                {/* Desktop top window bar */}
                <div className="bg-charcoal/5 border-b border-charcoal/10 p-3 flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-charcoal/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-charcoal/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-charcoal/20" />
                  <span className="text-[9px] font-mono text-charcoal/40 ml-4 select-none">https://workspace.jelvan.io/project/{activeProject.id}</span>
                </div>
                {/* Simulated Content inside Desktop */}
                <div className="p-6 space-y-4 max-h-[260px] overflow-y-auto">
                  <div className="flex justify-between items-start">
                    <h4 className="font-display font-bold text-lg text-charcoal">{activeProject.title}</h4>
                    <span className="text-[10px] font-mono border border-emerald-500 px-2 py-0.5 rounded text-emerald-800">ONLINE SERVICE</span>
                  </div>
                  <p className="text-xs text-charcoal/65 leading-relaxed">{activeProject.fullDescription}</p>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {activeProject.metrics.map((m, idx) => (
                      <div key={idx} className="bg-charcoal/[0.02] p-2 rounded border border-charcoal/5">
                        <span className="text-[8px] font-mono text-charcoal/40 block uppercase">{m.label}</span>
                        <span className="text-[10px] font-semibold text-charcoal">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {deviceFrame === "tablet" && (
              <div className="w-[380px] bg-white rounded-2xl shadow-xl border border-charcoal/15 p-4 transform transition-all duration-500 relative">
                {/* Tablet Top Camera Hole */}
                <div className="w-12 h-3 bg-charcoal/10 rounded-full mx-auto mb-4 select-none" />
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  <h4 className="font-display font-medium text-base text-charcoal">{activeProject.title}</h4>
                  <p className="text-[11px] text-charcoal/70 leading-relaxed">{activeProject.description}</p>
                  
                  <div className="border border-charcoal/5 p-3 rounded-lg bg-charcoal/[0.01] space-y-1">
                    <span className="text-[8px] font-mono text-charcoal/40 uppercase block">CORE FRAMEWORK</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeProject.tags.map((t) => (
                        <span key={t} className="text-[8.5px] font-mono bg-charcoal text-cream p-1 px-2 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {deviceFrame === "mobile" && (
              <div className="w-[240px] bg-white rounded-[32px] shadow-2xl border-[6px] border-charcoal p-4 transform transition-all duration-500 relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-charcoal rounded-b-xl select-none" />
                
                <div className="space-y-4 pt-3 max-h-[280px] overflow-y-auto scrollbar-none text-left">
                  <div className="text-[9px] font-mono text-charcoal/40 uppercase">MOBILE SUITE</div>
                  <h5 className="font-display font-semibold text-xs text-charcoal leading-tight">{activeProject.title}</h5>
                  <p className="text-[10px] text-charcoal/75 leading-relaxed">{activeProject.description}</p>
                  
                  <div className="bg-charcoal/[0.04] p-3 rounded-xl border border-charcoal/5 text-center">
                    <span className="text-[8px] text-charcoal/50 uppercase font-mono block">Primary Metric Value</span>
                    <span className="text-xs font-mono font-bold text-charcoal">{activeProject.metrics[0].value}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Philosophy block inspired by minimal premium agencies */}
      <div className="pt-8 border-t border-charcoal/5">
        <h3 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider mb-6">
          Architectural Core Philosophy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophies.map((p) => (
            <div key={p.num} className="space-y-2 group">
              <div className="font-mono text-2xl font-bold text-charcoal/15 group-hover:text-charcoal/40 transition-colors">{p.num}</div>
              <h4 className="font-display font-semibold text-sm text-charcoal tracking-wide uppercase">{p.title}</h4>
              <p className="text-xs text-charcoal/65 leading-relaxed font-sans">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

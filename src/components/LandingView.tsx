import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Cpu, ChevronRight, Binary, Globe } from "lucide-react";

interface LandingViewProps {
  onEnter: () => void;
}

export default function LandingView({ onEnter }: LandingViewProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Smooth angle calculations
    const rX = -(mouseY / height) * 30; // Max 15 deg
    const rY = (mouseX / width) * 30; // Max 15 deg
    
    setRotate({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-between p-6 md:p-12 relative overflow-hidden font-sans select-none">
      {/* Decorative grain / lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
        style={{ backgroundImage: `radial-gradient(var(--color-charcoal) 1px, transparent 0)` }} 
      />

      {/* Top Header */}
      <div className="flex justify-between items-center w-full z-10">
        <div className="flex items-center space-x-2">
          <span className="font-display font-semibold tracking-wider text-charcoal">JELVAN</span>
          <span className="text-[10px] border border-charcoal/30 px-1 py-0.2 rounded font-mono">EDITION 3.5</span>
        </div>
        <div className="text-right text-xs font-mono text-charcoal/60 h-4">
          LATENCY: OPTIMIZED
        </div>
      </div>

      {/* Center Cinematic Card Grid */}
      <div className="flex-1 flex flex-col items-center justify-center my-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 max-w-xl"
        >
          {/* Logo */}
          <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight text-charcoal mb-4 relative select-none">
            JELVAN<span className="text-sm align-super ml-1 font-sans font-medium text-charcoal/60">®</span>
          </h1>
          <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-charcoal/60 mt-1 mb-8">
            Strategic HR & AI Systems Engineering
          </p>
        </motion.div>

        {/* Floating Interactive Glass Cube Mockup */}
        <div 
          className="perspective-[1000px] w-full max-w-[340px] md:max-w-[420px] h-[240px] relative mt-2 mb-12 flex justify-center items-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={cardRef}
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transformStyle: "preserve-3d",
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="w-full h-full bg-white/75 backdrop-blur-md rounded-2xl p-6 border border-charcoal/10 shadow-2xl flex flex-col justify-between group cursor-grab active:cursor-grabbing relative"
          >
            {/* Absolute visual highlights in the card */}
            <div className="absolute top-4 right-4 text-[10px] font-mono text-charcoal/40 bg-charcoal/5 px-2 py-1 rounded">
              STATE: SECURE
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-charcoal flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-cream-light" />
                </div>
                <div className="w-3 h-3 rounded-full bg-charcoal/20" />
                <div className="w-3 h-3 rounded-full bg-charcoal/10" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-medium text-lg text-charcoal">Jelvan Ricolcol</h3>
                <p className="text-xs font-mono text-charcoal/50">Strategic HR & Digital Systems Specialist</p>
              </div>
            </div>

            {/* Middle visual circuit representation */}
            <div className="flex justify-between items-center bg-charcoal/[0.03] p-3 rounded-xl border border-charcoal/[0.05] my-2">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-charcoal/70 animate-pulse" />
                <span className="text-[10px] font-mono text-charcoal/70">AGENT CORE INGEST</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                <span className="text-[9px] font-mono text-green-700 font-medium">LIVE</span>
              </div>
            </div>

            {/* Bottom taglines */}
            <div className="flex justify-between items-center text-[10px] font-mono text-charcoal/40 mt-2">
              <div className="flex items-center space-x-1.5">
                <Binary className="w-3.5 h-3.5" />
                <span>RAG PROFILING</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                  className="w-3.5 h-3.5 flex items-center justify-center text-charcoal/70"
                >
                  <Globe className="w-full h-full" />
                </motion.div>
                <span>CORE STACK</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enter CTA */}
        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-3 bg-charcoal text-cream font-sans font-medium px-8 py-4 rounded-full shadow-lg cursor-pointer hover:bg-charcoal/90 transition-colors duration-200 tracking-wide"
        >
          <span>ENTER DIGITAL ARCHITECTURE</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Bottom Footer Credits */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full z-10 text-[10px] font-mono text-charcoal/40 pt-4 border-t border-charcoal/5 mt-4">
        <span>© 2026 JELVAN. ALL RIGHTS RESERVED.</span>
        <span className="mt-1 md:mt-0">DESIGN SYSTEM BUILT FROM SCRATCH • PLATFORM SYNC AT 200MS</span>
      </div>
    </div>
  );
}

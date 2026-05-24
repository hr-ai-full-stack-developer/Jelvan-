import { useState } from "react";
import { 
  Smartphone, Eye, ShieldAlert, Sparkles, Check, X, 
  Fingerprint, ArrowRight, UserCheck, BarChart2 
} from "lucide-react";

interface CandidateCard {
  id: string;
  name: string;
  role: string;
  score: number;
  match: string;
}

const MOCK_SWIPES: CandidateCard[] = [
  { id: "C-1", name: "Sarah Lin", role: "DevOps Engineer", score: 98, match: "React/Docker affinity" },
  { id: "C-2", name: "David Miller", role: "AI Strategist", score: 94, match: "NLP pipeline specialist" },
  { id: "C-3", name: "Maya Patel", role: "Talent Specialist", score: 86, match: "Continuous employee metrics" }
];

export default function MobilePreview() {
  const [activeScreen, setActiveScreen] = useState<"hr_dashboard" | "swipe_cards" | "biometrics">("hr_dashboard");
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [swipeReaction, setSwipeReaction] = useState<"like" | "dislike" | null>(null);
  
  // Biometric states
  const [bioActive, setBioActive] = useState<"idle" | "authenticating" | "granted">("idle");

  const handleSwipeAction = (dir: "like" | "dislike") => {
    setSwipeReaction(dir);
    setTimeout(() => {
      setSwipeReaction(null);
      setSwipeIndex((curr) => (curr + 1) % MOCK_SWIPES.length);
    }, 400);
  };

  const triggerBiometricScan = () => {
    if (bioActive === "granted") return;
    setBioActive("authenticating");
    setTimeout(() => {
      setBioActive("granted");
    }, 1500);
  };

  return (
    <div className="space-y-6 py-4">
      
      {/* Title block */}
      <div className="bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm">
        <h3 className="font-display font-bold text-lg text-charcoal">Mobile Ingress Portal Concept</h3>
        <p className="text-xs text-charcoal/50 font-mono mt-0.5">Physical iOS device container simulating swipable screening interfaces, HR analytic scoring dashboard grids, and secure biometric token verification loops.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center pt-2">
        
        {/* Mobile controls configuration selection list */}
        <div className="space-y-6 lg:col-span-1">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-charcoal/40 uppercase">EXECUTIVE MANIPULATION CONTROL</span>
            <h4 className="font-display font-semibold text-lg text-charcoal">Concept View Navigation</h4>
            <p className="text-xs text-charcoal/65 leading-relaxed">
              JELVAN® specializes in building high-fidelity native feeling web and mobile applications. Tap screens tabs below to inspect mock interactive iOS workflows.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveScreen("hr_dashboard")}
              className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-all ${
                activeScreen === "hr_dashboard" ? "bg-charcoal text-cream border-charcoal" : "bg-white text-charcoal hover:bg-charcoal/[0.02] border-charcoal/10"
              }`}
            >
              <BarChart2 className="w-4.5 h-4.5" />
              <div>
                <div className="text-xs font-semibold">Employee Retention Radar</div>
                <div className="text-[10px] font-mono opacity-60">Attrition predictions & risk indicators</div>
              </div>
            </button>

            <button
              onClick={() => setActiveScreen("swipe_cards")}
              className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-all ${
                activeScreen === "swipe_cards" ? "bg-charcoal text-cream border-charcoal" : "bg-white text-charcoal hover:bg-charcoal/[0.02] border-charcoal/10"
              }`}
            >
              <UserCheck className="w-4.5 h-4.5" />
              <div>
                <div className="text-xs font-semibold">Recruiting Affinity Swiper</div>
                <div className="text-[10px] font-mono opacity-60">Framer Swipe-and-Sift recruiter cards</div>
              </div>
            </button>

            <button
              onClick={() => setActiveScreen("biometrics")}
              className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-all ${
                activeScreen === "biometrics" ? "bg-charcoal text-cream border-charcoal" : "bg-white text-charcoal hover:bg-charcoal/[0.02] border-charcoal/10"
              }`}
            >
              <Fingerprint className="w-4.5 h-4.5" />
              <div>
                <div className="text-xs font-semibold">Advanced Biometric Lockbox</div>
                <div className="text-[10px] font-mono opacity-60">Secure hardware verification emulation</div>
              </div>
            </button>
          </div>
        </div>

        {/* Outer iOS Smartphone Mock Frame (Col: 2 out of 3) */}
        <div className="lg:col-span-2 flex justify-center items-center py-4 bg-charcoal/[0.02] rounded-2xl border border-charcoal/5 p-4 min-h-[460px]">
          
          {/* iOS Device frame */}
          <div className="w-[280px] h-[500px] bg-[#141412] rounded-[44px] shadow-2xl border-[8px] border-charcoal relative flex flex-col justify-between overflow-hidden text-white font-sans">
            
            {/* Dynamic Island bar camera cutout */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex justify-between items-center px-3 text-[9px] font-mono text-emerald-400 select-none">
              <span className="text-[8px]">REC</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Simulated Mobile Status bar */}
            <div className="pt-8 px-5 flex justify-between items-center text-[10px] text-white/50 font-mono z-25 shrink-0 select-none">
              <span>9:41 AM</span>
              <div className="flex space-x-1">
                <span>LTE</span>
                <span>🔋 100%</span>
              </div>
            </div>

            {/* Responsive Interactive Screens Canvas */}
            <div className="flex-1 px-4 py-2 overflow-y-auto text-left relative flex flex-col justify-between select-none">
              
              {activeScreen === "hr_dashboard" && (
                <div className="space-y-4 flex-1 flex flex-col justify-between py-2">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-white/40 uppercase">RETENTION VECTORS</span>
                    <h5 className="font-display font-semibold text-sm leading-tight text-cream">Attrition Risk Index</h5>
                  </div>

                  {/* Circle score stats */}
                  <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[9px] text-white/60 font-mono">PROACTIVE RISK LEVEL</span>
                      <div className="text-lg font-bold text-emerald-400">12.4% Low</div>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center font-mono text-xs text-white">
                      88
                    </div>
                  </div>

                  {/* Sliders to simulate real-time metrics change */}
                  <div className="space-y-2.5">
                    <div className="space-y-1 text-[11px] font-mono">
                      <div className="flex justify-between text-white/60">
                        <span>Staff Sentiment Score</span>
                        <span>{swipeIndex === 0 ? "82%" : "91%"}</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 w-[82%]" />
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-[11px] font-mono">
                      <div className="flex justify-between text-white/60">
                        <span>Active Comms Synced</span>
                        <span>24 threads / hr</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cream-light w-[60%]" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl flex items-start space-x-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[9px] text-white/70 leading-relaxed font-sans">
                      Next continuous model review execution scheduled for central queue indexing in 4hr.
                    </p>
                  </div>
                </div>
              )}

              {activeScreen === "swipe_cards" && (
                <div className="space-y-4 flex-1 flex flex-col justify-between py-2">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-white/40 uppercase">SEMANTIC PARSER LIFECYCLE</span>
                    <h5 className="font-display font-semibold text-sm leading-tight text-white">Candidate Sweep Affinity</h5>
                  </div>

                  {/* Swipable Card Frame container */}
                  <div className="relative flex-1 flex items-center justify-center my-2">
                    {swipeReaction && (
                      <div className={`absolute top-2 font-mono text-xs uppercase p-1.5 px-3.5 rounded-full z-20 font-bold ${
                        swipeReaction === "like" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}>
                        {swipeReaction === "like" ? "Ingress Match" : "Rejected"}
                      </div>
                    )}

                    {/* Target Swiper Card */}
                    <div className="w-full bg-white text-charcoal p-4 rounded-xl shadow-xl border border-white/10 flex flex-col justify-between h-[180px] hover:scale-[1.02] transition-transform duration-200">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-[9px] text-charcoal/40 uppercase">SCORE: {MOCK_SWIPES[swipeIndex].score}%</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-charcoal" />
                        </div>
                        <h6 className="font-display font-bold text-sm text-charcoal">{MOCK_SWIPES[swipeIndex].name}</h6>
                        <span className="text-[10.5px] text-charcoal/50 block font-mono font-medium">{MOCK_SWIPES[swipeIndex].role}</span>
                      </div>

                      <p className="text-[10px] text-charcoal/70 bg-charcoal/[0.03] p-2 rounded leading-relaxed border border-charcoal/5 italic">
                        "{MOCK_SWIPES[swipeIndex].match}"
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar Buttons */}
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => handleSwipeAction("dislike")}
                      className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/35 flex items-center justify-center hover:bg-red-500/30 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                    <button 
                      onClick={() => handleSwipeAction("like")}
                      className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/35 flex items-center justify-center hover:bg-green-500/30 transition-colors cursor-pointer"
                    >
                      <Check className="w-4 h-4 text-green-400" />
                    </button>
                  </div>
                </div>
              )}

              {activeScreen === "biometrics" && (
                <div className="space-y-6 flex-1 flex flex-col justify-between py-4 select-none">
                  <div className="space-y-1 text-center">
                    <span className="text-[8px] font-mono text-white/40 uppercase">GATEWAY AUTHENTICATOR</span>
                    <h5 className="font-display font-semibold text-sm leading-tight text-white">Personnel Biometric Ingress</h5>
                  </div>

                  {/* Thumbprint interaction button */}
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <button 
                      onMouseDown={triggerBiometricScan}
                      onTouchStart={triggerBiometricScan}
                      className={`w-20 h-20 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                        bioActive === "granted" ? "bg-green-500/20 border-green-400" :
                        bioActive === "authenticating" ? "bg-amber-500/20 border-amber-400 animate-pulse" :
                        "bg-white/5 border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <Fingerprint className={`w-10 h-10 ${
                        bioActive === "granted" ? "text-green-400" :
                        bioActive === "authenticating" ? "text-amber-400" : "text-white/60"
                      }`} />
                    </button>

                    <span className="text-[9px] font-mono text-white/40 uppercase">
                      {bioActive === "idle" && "HOLD THUMBPRINT CONSOLE"}
                      {bioActive === "authenticating" && "EVALUATING SENSORS..."}
                      {bioActive === "granted" && "ACCESS GRANTED SECURE"}
                    </span>
                  </div>

                  {/* Actions detail output */}
                  <div className="space-y-2 text-center">
                    {bioActive === "granted" ? (
                      <div className="bg-green-500/15 border border-green-500/20 p-2 rounded-xl text-[9px] text-green-400">
                        Authentication verified securely. Dynamic tokens refreshed on server.ts.
                      </div>
                    ) : (
                      <div className="text-[9.5px] text-white/40 leading-relaxed font-sans block">
                        Press and hold fingerprint scanner simulation to authenticate admin core systems session.
                      </div>
                    )}
                    
                    {bioActive === "granted" && (
                      <button 
                        onClick={() => setBioActive("idle")}
                        className="text-[9px] font-mono text-white/50 underline block mx-auto"
                      >
                        Reset Biometric Gateway
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom iOS Home bar design indicator */}
            <div className="pb-3 flex justify-center w-full z-25 select-none touch-none">
              <div className="w-24 h-1 bg-white/45 rounded-full" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

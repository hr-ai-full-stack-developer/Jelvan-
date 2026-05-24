import { useState, useEffect } from "react";
import { ViewMode, Project } from "./types";
import { PROJECTS } from "./data";

import LandingView from "./components/LandingView";
import DashboardHome from "./components/DashboardHome";
import SaasDashboardMode from "./components/SaasDashboardMode";
import CreativeMode from "./components/CreativeMode";
import MinimalOnePageView from "./components/MinimalOnePageView";
import DeveloperWorkspace from "./components/DeveloperWorkspace";
import MobilePreview from "./components/MobilePreview";
import GoogleChatMessenger from "./components/GoogleChatMessenger";

import { 
  Monitor, Brain, Layers, LayoutGrid, Award, 
  HelpCircle, Menu, X, HelpCircle as HelpIcon, Calendar, 
  Search, Bell, Sparkles, FolderKanban, Terminal, Smartphone,
  Mail, ExternalLink, Bookmark, Sun, Moon, MessageSquare
} from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.LANDING);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [utcTime, setUtcTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandPaletteQuery, setCommandPaletteQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">((() => {
    try {
      const saved = localStorage.getItem("theme");
      return saved === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  }));

  // Apply dark mode class globally across document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.warn("localStorage persistence not accessible", e);
    }
  }, [theme]);

  // Live UTC system clock updates
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener for Command Palette (Linear-style cmd+k / ctrl+k)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(curr => !curr);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered command palette matches
  const filteredCommands = PROJECTS.filter(p => 
    p.title.toLowerCase().includes(commandPaletteQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(commandPaletteQuery.toLowerCase())
  );

  if (currentView === ViewMode.LANDING) {
    return <LandingView onEnter={() => setCurrentView(ViewMode.DASHBOARD_HOME)} />;
  }

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans flex relative">
      
      {/* 1. SIDEBAR NAVIGATION CONTROLS (DESKTOP) */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-charcoal/5 flex-col justify-between p-6 h-screen sticky top-0 shrink-0 select-none z-20">
        
        <div className="space-y-8">
          {/* Logo Brand Brandmark */}
          <div className="flex items-center justify-between border-b border-charcoal/5 pb-5">
            <div 
              onClick={() => setCurrentView(ViewMode.LANDING)}
              className="flex items-center space-x-2.5 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-7 h-7 rounded bg-charcoal flex items-center justify-center text-cream font-display font-medium text-sm">
                J
              </div>
              <div>
                <span className="font-display font-bold text-sm tracking-widest text-charcoal">JELVAN®</span>
                <span className="text-[9px] font-mono text-charcoal/40 block leading-none">CORE ARCHITECTURE</span>
              </div>
            </div>
            
            <span className="text-[10px] font-mono bg-charcoal/5 px-2 py-0.5 rounded text-charcoal">
              V3.5
            </span>
          </div>

          {/* Navigation Items List Group */}
          <div className="space-y-6">
            <div>
              <span className="text-[9.5px] font-mono text-charcoal/40 uppercase tracking-widest block px-2.5 mb-2.5">
                Dashboard Portal
              </span>
              <nav className="space-y-1">
                <button
                  onClick={() => {
                    setCurrentView(ViewMode.DASHBOARD_HOME);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-2.5 py-3 rounded-xl text-left font-sans text-xs font-semibold transition-all cursor-pointer ${
                    currentView === ViewMode.DASHBOARD_HOME 
                      ? "bg-charcoal text-cream shadow-sm" 
                      : "text-charcoal/70 hover:bg-charcoal/[0.03]"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4 shrink-0" />
                  <span>Administrative Feed</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView(ViewMode.VIEW_F_MESSAGING);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-2.5 py-3 rounded-xl text-left font-sans text-xs font-semibold transition-all cursor-pointer ${
                    currentView === ViewMode.VIEW_F_MESSAGING 
                      ? "bg-charcoal text-cream shadow-sm" 
                      : "text-charcoal/70 hover:bg-charcoal/[0.03]"
                  }`}
                >
                  <MessageSquare className="w-4 h-4 shrink-0 text-orange-500" />
                  <span>Google Chat Envoy</span>
                </button>
              </nav>
            </div>

            {/* Demonstrating frontend expertise (DEMONSTRATION VIEWS MODES) */}
            <div>
              <span className="text-[9.5px] font-mono text-charcoal/40 uppercase tracking-widest block px-2.5 mb-2.5">
                UI/UX Core Demonstrations
              </span>
              <nav className="space-y-1">
                
                {/* View A */}
                <button
                  onClick={() => setCurrentView(ViewMode.VIEW_A_SAAS)}
                  className={`w-full flex items-center space-x-3 p-2.5 py-3 rounded-xl text-left font-sans text-xs font-semibold transition-all cursor-pointer ${
                    currentView === ViewMode.VIEW_A_SAAS 
                      ? "bg-charcoal text-cream shadow-sm" 
                      : "text-charcoal/70 hover:bg-charcoal/[0.03]"
                  }`}
                >
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>SaaS Dashboard Interface</span>
                </button>

                {/* View B */}
                <button
                  onClick={() => setCurrentView(ViewMode.VIEW_B_CREATIVE)}
                  className={`w-full flex items-center space-x-3 p-2.5 py-3 rounded-xl text-left font-sans text-xs font-semibold transition-all cursor-pointer ${
                    currentView === ViewMode.VIEW_B_CREATIVE 
                      ? "bg-charcoal text-cream shadow-sm" 
                      : "text-charcoal/70 hover:bg-charcoal/[0.03]"
                  }`}
                >
                  <FolderKanban className="w-4 h-4 shrink-0" />
                  <span>Artistic Studio Grid</span>
                </button>

                {/* View C */}
                <button
                  onClick={() => setCurrentView(ViewMode.VIEW_C_MINIMAL)}
                  className={`w-full flex items-center space-x-3 p-2.5 py-3 rounded-xl text-left font-sans text-xs font-semibold transition-all cursor-pointer ${
                    currentView === ViewMode.VIEW_C_MINIMAL 
                      ? "bg-charcoal text-cream shadow-sm" 
                      : "text-charcoal/70 hover:bg-charcoal/[0.03]"
                  }`}
                >
                  <Award className="w-4 h-4 shrink-0" />
                  <span>Boutique agency One-Page</span>
                </button>

                {/* View D */}
                <button
                  onClick={() => setCurrentView(ViewMode.VIEW_D_WORKSPACE)}
                  className={`w-full flex items-center space-x-3 p-2.5 py-3 rounded-xl text-left font-sans text-xs font-semibold transition-all cursor-pointer ${
                    currentView === ViewMode.VIEW_D_WORKSPACE 
                      ? "bg-charcoal text-cream shadow-sm" 
                      : "text-charcoal/70 hover:bg-charcoal/[0.03]"
                  }`}
                >
                  <Terminal className="w-4 h-4 shrink-0" />
                  <span>IDE Virtual Workspace</span>
                </button>

                {/* View E */}
                <button
                  onClick={() => setCurrentView(ViewMode.VIEW_E_MOBILE)}
                  className={`w-full flex items-center space-x-3 p-2.5 py-3 rounded-xl text-left font-sans text-xs font-semibold transition-all cursor-pointer ${
                    currentView === ViewMode.VIEW_E_MOBILE 
                      ? "bg-charcoal text-cream shadow-sm" 
                      : "text-charcoal/70 hover:bg-charcoal/[0.03]"
                  }`}
                >
                  <Smartphone className="w-4 h-4 shrink-0" />
                  <span>Interactive iOS Mockup</span>
                </button>

              </nav>
            </div>
          </div>
        </div>

        {/* Bottom User Profile Section */}
        <div className="border-t border-charcoal/5 pt-5 space-y-4">
          <div className="bg-charcoal/[0.03] p-3 rounded-xl border border-charcoal/5 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-charcoal text-cream flex items-center justify-center text-xs font-mono font-bold select-none shrink-0">
              JR
            </div>
            <div className="overflow-hidden">
              <span className="font-semibold text-xs tracking-tight block text-charcoal truncate">Jelvan Ricolcol</span>
              <span className="font-mono text-[9px] text-charcoal/45 block truncate">hireme@jelvan.pro</span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-charcoal/30 text-center leading-relaxed">
            SHORTCUT: Press <kbd className="font-mono border border-charcoal/15 p-0.5 rounded px-1.5 bg-cream-light text-[9px]">⌘K</kbd> to prompt gateway commands.
          </div>
        </div>

      </aside>

      {/* 2. ADAPTIVE PORTFOLIO CONTAINER CANVAS */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        
        {/* TOP COMPONENT HEADER NAVIGATION BAR */}
        <header className="bg-white border-b border-charcoal/5 h-16 px-4 md:px-8 flex justify-between items-center sticky top-0 z-10 select-none shrink-0">
          
          <div className="flex items-center space-x-4">
            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-charcoal/80 hover:bg-charcoal/5 rounded-lg border border-charcoal/5 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick search input triggering cmd-k palette */}
            <div 
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:flex items-center space-x-3 bg-charcoal/[0.03] border border-charcoal/5 rounded-xl px-3.5 py-1.5 w-60 text-xs text-charcoal/40 cursor-pointer hover:bg-charcoal/[0.05] hover:border-charcoal/15 transition-all"
            >
              <Search className="w-4 h-4 text-charcoal/30" />
              <span className="flex-1 text-left font-sans">Search systems...</span>
              <kbd className="font-mono text-[9px] border bg-white px-1 py-0.2 rounded border-charcoal/10">⌘K</kbd>
            </div>
          </div>

          {/* Right Status Indicators and real UTC Clock metrics */}
          <div className="flex items-center space-x-6">
            
            {/* Sync Hub Status Indicator */}
            <div className="hidden md:flex items-center space-x-1.5 font-mono text-[10.5px] text-charcoal/70 bg-emerald-50 border border-emerald-200/50 p-1.5 px-3 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Mesh Gateway: Operational (200ms)</span>
            </div>

            {/* Real-time clocks */}
            <div className="flex items-center space-x-2 font-mono text-xs text-charcoal/65 bg-charcoal/[0.02] p-1.5 px-3 rounded-lg border border-charcoal/5">
              <Calendar className="w-3.5 h-3.5 text-charcoal/40" />
              <span className="font-mono whitespace-nowrap">{utcTime || "SYSTEM CLOCK SYNCING..."}</span>
            </div>

            {/* Premium Theme Mode Toggle */}
            <button
              id="theme-mode-toggle"
              onClick={() => setTheme(curr => curr === "dark" ? "light" : "dark")}
              className="p-1.5 bg-charcoal/[0.03] border border-charcoal/10 hover:bg-charcoal/10 rounded-xl transition-all cursor-pointer flex items-center justify-center text-charcoal shadow-sm"
              aria-label="Toggle Theme Mode"
              title={theme === "dark" ? "Activate Light Theme" : "Activate Dark Theme"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-500 fill-amber-500/10 animate-pulse" />
              ) : (
                <Moon className="w-4 h-4 text-charcoal/70 fill-charcoal/5" />
              )}
            </button>

          </div>

        </header>

        {/* RE-RENDER VIEWS WORKSPACE PANELS CONTAINER */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {currentView === ViewMode.DASHBOARD_HOME && (
            <DashboardHome 
              onNavigateToView={(viewStr) => setCurrentView(viewStr as ViewMode)}
              onSelectProject={(p) => setSelectedProject(p)}
            />
          )}

          {currentView === ViewMode.VIEW_A_SAAS && <SaasDashboardMode />}

          {currentView === ViewMode.VIEW_B_CREATIVE && (
            <CreativeMode onSelectProject={(p) => setSelectedProject(p)} />
          )}

          {currentView === ViewMode.VIEW_C_MINIMAL && <MinimalOnePageView />}

          {currentView === ViewMode.VIEW_D_WORKSPACE && <DeveloperWorkspace />}

          {currentView === ViewMode.VIEW_E_MOBILE && <MobilePreview />}

          {currentView === ViewMode.VIEW_F_MESSAGING && <GoogleChatMessenger />}

        </main>

      </div>

      {/* 3. MOBILE MENU SIDEHAMBURGER DRAWER DRAW */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop mask filter click out */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm"
          />
          
          <div className="relative w-72 bg-white h-full p-6 flex flex-col justify-between z-10 border-r border-charcoal/10">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-display font-bold text-sm tracking-widest">JELVAN®</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 px-2 rounded-lg bg-charcoal/5">
                  <X className="w-4 h-4 text-charcoal" />
                </button>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[9px] font-mono text-charcoal/40 uppercase block tracking-widest pl-2 mb-2">Primary Ingress</span>
                <button
                  onClick={() => {
                    setCurrentView(ViewMode.DASHBOARD_HOME);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left font-semibold ${
                    currentView === ViewMode.DASHBOARD_HOME ? "bg-charcoal text-cream" : "hover:bg-charcoal/5"
                  }`}
                >
                  <LayoutGrid className="w-4.5 h-4.5" />
                  <span>Dashboard Home</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView(ViewMode.VIEW_F_MESSAGING);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left font-semibold ${
                    currentView === ViewMode.VIEW_F_MESSAGING ? "bg-charcoal text-cream" : "hover:bg-charcoal/5"
                  }`}
                >
                  <MessageSquare className="w-4.5 h-4.5 text-orange-500" />
                  <span>Google Chat Envoy</span>
                </button>

                <span className="text-[9px] font-mono text-charcoal/40 uppercase block tracking-widest pl-2 mt-4 mb-2">Systems Demo</span>
                
                <button
                  onClick={() => {
                    setCurrentView(ViewMode.VIEW_A_SAAS);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left font-semibold ${
                    currentView === ViewMode.VIEW_A_SAAS ? "bg-charcoal text-cream" : "hover:bg-charcoal/5"
                  }`}
                >
                  <Layers className="w-4.5 h-4.5" />
                  <span>SaaS Admin Roster</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView(ViewMode.VIEW_B_CREATIVE);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left font-semibold ${
                    currentView === ViewMode.VIEW_B_CREATIVE ? "bg-charcoal text-cream" : "hover:bg-charcoal/5"
                  }`}
                >
                  <FolderKanban className="w-4.5 h-4.5" />
                  <span>Studio Gallery Showcase</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView(ViewMode.VIEW_C_MINIMAL);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left font-semibold ${
                    currentView === ViewMode.VIEW_C_MINIMAL ? "bg-charcoal text-cream" : "hover:bg-charcoal/5"
                  }`}
                >
                  <Award className="w-4.5 h-4.5" />
                  <span>Boutique Minimal View</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView(ViewMode.VIEW_D_WORKSPACE);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left font-semibold ${
                    currentView === ViewMode.VIEW_D_WORKSPACE ? "bg-charcoal text-cream" : "hover:bg-charcoal/5"
                  }`}
                >
                  <Terminal className="w-4.5 h-4.5" />
                  <span>Developer Sandbox IDE</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView(ViewMode.VIEW_E_MOBILE);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left font-semibold ${
                    currentView === ViewMode.VIEW_E_MOBILE ? "bg-charcoal text-cream" : "hover:bg-charcoal/5"
                  }`}
                >
                  <Smartphone className="w-4.5 h-4.5" />
                  <span>iOS App Emulator</span>
                </button>
              </div>
            </div>

            <div className="bg-charcoal/[0.03] p-4 rounded-xl border border-charcoal/10 flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-charcoal text-cream flex items-center justify-center text-xs font-bold leading-none">JR</div>
              <div className="overflow-hidden">
                <span className="font-semibold block text-xs tracking-tight text-charcoal truncate">Jelvan Ricolcol</span>
                <span className="font-mono text-[9px] block text-charcoal/45 truncate">hireme@jelvan.pro</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. LINEAR-STYLE EXECUTIVE COMMAND PALETTE MODAL (⌘K Shortcut!) */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 select-none">
          <div 
            onClick={() => setCommandPaletteOpen(false)}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm"
          />
          
          <div className="relative w-full max-w-xl bg-white rounded-2xl border border-charcoal/10 shadow-2xl p-4 space-y-4 z-10">
            <div className="flex items-center space-x-3 border-b pb-3">
              <Search className="w-4.5 h-4.5 text-charcoal/40" />
              <input
                type="text"
                placeholder="Search global portfolios, systems, or trigger shortcuts (e.g. 'saas')..."
                value={commandPaletteQuery}
                onChange={(e) => setCommandPaletteQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm placeholder-charcoal/30 select-text"
                autoFocus
              />
              <button 
                onClick={() => setCommandPaletteOpen(false)}
                className="text-[10px] font-mono border p-1 rounded hover:bg-charcoal/5 select-none"
              >
                ESC
              </button>
            </div>

            <div className="space-y-1 max-h-60 overflow-y-auto">
              <span className="text-[10px] font-mono text-charcoal/40 uppercase block px-2 mb-1.5">Direct Navigation Jump</span>
              
              <button
                onClick={() => {
                  setCurrentView(ViewMode.DASHBOARD_HOME);
                  setCommandPaletteOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-lg text-xs hover:bg-charcoal/5 flex items-center justify-between"
              >
                <span>Dashboard Feed Home</span>
                <kbd className="font-mono text-[9px] opacity-40">GO FEED</kbd>
              </button>

              <button
                onClick={() => {
                  setCurrentView(ViewMode.VIEW_A_SAAS);
                  setCommandPaletteOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-lg text-xs hover:bg-charcoal/5 flex items-center justify-between"
              >
                <span>SaaS Administration & Roster Platform</span>
                <kbd className="font-mono text-[9px] opacity-40">GO SAAS</kbd>
              </button>

              <button
                onClick={() => {
                  setCurrentView(ViewMode.VIEW_D_WORKSPACE);
                  setCommandPaletteOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-lg text-xs hover:bg-charcoal/5 flex items-center justify-between"
              >
                <span>Interactive AI UNIX Command terminal</span>
                <kbd className="font-mono text-[9px] opacity-40">GO TERMINAL</kbd>
              </button>

              <button
                onClick={() => {
                  setCurrentView(ViewMode.VIEW_F_MESSAGING);
                  setCommandPaletteOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-lg text-xs hover:bg-charcoal/5 flex items-center justify-between"
              >
                <span>Google Chat Telemetry Envoy & Dispatch</span>
                <kbd className="font-mono text-[9px] opacity-40">GO CHAT</kbd>
              </button>

              {filteredCommands.length > 0 && (
                <div className="pt-2 border-t mt-2">
                  <span className="text-[10px] font-mono text-charcoal/40 uppercase block px-2 mb-1.5">Matching Core Projects Database</span>
                  {filteredCommands.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProject(p);
                        setCommandPaletteOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-lg text-xs hover:bg-charcoal/5 flex items-center justify-between"
                    >
                      <span className="font-semibold">{p.title}</span>
                      <span className="text-[10px] font-mono">{p.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-charcoal/40 border-t pt-3">
              <span>↑↓ navigation • Enter to select • ⌘K to dismiss</span>
              <span>Matched queries count: {filteredCommands.length + 3}</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. MULTI-LEVEL PROJECT DRILLDOWN SHEET MODAL PANEL (Pops up when user clicks a project anywhere!) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur clickoff */}
          <div 
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
          />
          
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-charcoal/10 shadow-2xl p-6 md:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto">
            
            {/* Header branding on sheet */}
            <div className="flex justify-between items-start border-b pb-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-charcoal text-cream p-1 px-2.5 rounded">
                  {selectedProject.category}
                </span>
                <h4 className="font-display font-bold text-2xl text-charcoal mt-2 tracking-tight">
                  {selectedProject.title}
                </h4>
              </div>
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-1 px-2 bg-charcoal/5 hover:bg-charcoal/10 text-charcoal rounded-lg cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Body details */}
            <div className="space-y-5">
              <div className="h-48 rounded-2xl overflow-hidden bg-charcoal/5">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />
              </div>

              <div className="space-y-2.5">
                <span className="text-[10px] font-mono text-charcoal/40 uppercase block">Project Core Narrative</span>
                <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Specific features bullet board lists */}
              <div className="bg-charcoal/[0.02] border border-charcoal/5 p-4 rounded-2xl space-y-2.5">
                <span className="text-[10px] font-mono text-charcoal/50 uppercase block">Architecture Capabilities Engineered</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {selectedProject.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-charcoal/80">
                      <Sparkles className="w-4 h-4 text-charcoal/60 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Grid Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="border border-charcoal/10 p-3 rounded-xl bg-white space-y-1">
                    <span className="text-[9px] font-mono text-charcoal/40 uppercase block">{m.label}</span>
                    <div className="font-display font-bold text-sm text-charcoal">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions footer sheet */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-5 border-t gap-3">
              <div className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-charcoal/40" />
                <span className="text-[10px] font-mono text-charcoal/55 uppercase">ESTABLISHED SYSTEMS STACK MODEL INTEGRITY</span>
              </div>
              
              <div className="flex space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 sm:flex-none border border-charcoal/15 hover:bg-charcoal/5 text-charcoal px-5 py-2.5 rounded-xl font-mono text-xs text-center cursor-pointer"
                >
                  Close Scope
                </button>
                <button
                  onClick={() => {
                    setCurrentView(ViewMode.VIEW_D_WORKSPACE);
                    setSelectedProject(null);
                  }}
                  className="flex-1 sm:flex-none bg-charcoal text-cream hover:bg-charcoal/90 px-5 py-2.5 rounded-xl font-mono text-xs text-center flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Inspect Sandbox</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
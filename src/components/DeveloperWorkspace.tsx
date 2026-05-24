import React, { useState, useRef, useEffect } from "react";
import { 
  FileCode, Terminal, Command, GitBranch, Play, 
  Send, Brain, CheckCircle, RefreshCw, AlertCircle, FileText 
} from "lucide-react";

interface MockFile {
  name: string;
  language: string;
  code: string;
}

const MOCK_FILES: MockFile[] = [
  {
    name: "ScreeningAgent.ts",
    language: "TypeScript",
    code: `import { GoogleGenAI } from "@google/genai";\n\ninterface Candidate {\n  id: string;\n  resumeText: string;\n  targetRoles: string[];\n}\n\nexport class ResumeScreeningAgent {\n  private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\n\n  async analyzeAffinity(candidate: Candidate) {\n    console.log("[AGENT] Booting semantic entity scanner...");\n    \n    const prompt = \`Parse candidate curriculum and score affinity matching roles \${candidate.targetRoles.join(",")}:\n\${candidate.resumeText}\`;\n    \n    const response = await this.ai.models.generateContent({\n      model: "gemini-3.5-flash",\n      contents: prompt,\n      config: {\n        temperature: 0.25,\n        responseMimeType: "application/json"\n      }\n    });\n    \n    return JSON.parse(response.text);\n  }\n}`
  },
  {
    name: "attritionClassifier.py",
    language: "Python",
    code: `import numpy as np\nimport pandas as pd\nfrom sklearn.ensemble import GradientBoostingClassifier\n\nclass OrganizationalRiskModel:\n    def __init__(self):\n        self.clf = GradientBoostingClassifier(n_estimators=100, max_depth=4)\n        \n    def fit(self, X_train, y_train):\n        print("[MODEL] Ingestion of HR logs complete. Training mesh networks...")\n        self.clf.fit(X_train, y_train)\n        \n    def predict_attrition_risk(self, profile_vector):\n        # returns percentage risk risk and primary feature triggers\n        probs = self.clf.predict_proba(profile_vector)[0]\n        return {\n            "turnover_risk_index": probs[1],\n            "anomaly_flagged": probs[1] > 0.75,\n            "active_triggers": ["sentiment_dip", "commits_rhythm_divergence"]\n        }`
  },
  {
    name: "organizationMesh.yaml",
    language: "YAML",
    code: `apiVersion: orchestration.jelvan.io/v1\nkind: PersonnelDataMesh\nmetadata:\n  name: core-global-org-mesh\nspec:\n  syncInterval: 200ms\n  anomalyDetectionGate:\n    active: true\n    sensitivity: 0.85\n    triggerWebhooks:\n      - https://api.jelvan.io/hr/retention/alert\n  replicaNodes:\n    - region: us-east-4\n      weight: 40\n    - region: asia-pacific-1\n      weight: 60\n  geminiGatewayProxy:\n    modelAlias: gemini-3.5-flash\n    maxOutputTokens: 2048`
  }
];

export default function DeveloperWorkspace() {
  const [selectedFile, setSelectedFile] = useState<MockFile>(MOCK_FILES[0]);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "JELVAN Virtual POSIX Ingress [Version 3.5.0-Release]",
    "(C) 2026 JELVAN® Corporate Systems. Open connection verified.",
    "Type 'help' to audit available workspace control hooks.",
    " "
  ]);
  const [gitBranchCount, setGitBranchCount] = useState(3);
  const [activeTab, setActiveTab] = useState<"code" | "terminal">("code");
  const [runSuccess, setRunSuccess] = useState<string | null>(null);

  // Chatbot State
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string; source?: string }>>([
    { sender: "bot", text: "Welcome to JELVAN® Workspace AI Assistant. Ask me anything about Jelvan's developer credentials, full-stack projects, AI expertise, or career consulting!" }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollTop = terminalEndRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Terminal Input Parser
  const runTerminalCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    const cleanLogs = [...terminalLogs, `jelvan-node:~$ ${cmdText}`];

    if (trimmed === "help") {
      setTerminalLogs([
        ...cleanLogs,
        "Available shell commands:",
        "  help         - Lists active environment shell utilities.",
        "  projects     - Fetches global JELVAN systems list.",
        "  skills       - Queries core technical alignments.",
        "  commit       - Simulates a Git system update and increments data mesh branch.",
        "  eval {score} - Runs a simulated attrition model scoring (e.g. 'eval 85').",
        "  clear        - Wipes virtual logs buffer.",
        " "
      ]);
    } else if (trimmed === "projects") {
      setTerminalLogs([
        ...cleanLogs,
        "Connected Systems Database Query Result:",
        "  [1] AI HR Analytics Platform - predict attrition",
        "  [2] Smart Recruitment SaaS - applicant scoring agent",
        "  [3] Digital Transformation - systems mesh sync telemetry",
        "  [4] AI Authentication System - cryptographic identification concept",
        "  [5] Dev Productivity Workspace - virtual UNIX pipeline environment",
        " "
      ]);
    } else if (trimmed === "skills") {
      setTerminalLogs([
        ...cleanLogs,
        "Tech Stack Core Alignments:",
        "  Frontend  : React 19, TypeScript, Tailwind CSS, Motion (Framer)",
        "  Backend/AI: Node.js, Express, @google/genai, VectorDB, python-ML",
        "  Strategy  : Digital transformation deployment, personnel platform design",
        " "
      ]);
    } else if (trimmed === "commit") {
      setGitBranchCount(curr => curr + 1);
      setTerminalLogs([
        ...cleanLogs,
        "Initializing index transaction file scanning...",
        "Inserting 1 change-list vector into organization mesh specs.",
        `[Git Branch Sync] branch upgraded securely. branch node id: JLV-0${gitBranchCount + 1}`,
        " "
      ]);
    } else if (trimmed.startsWith("eval")) {
      const parts = trimmed.split(" ");
      const score = parseInt(parts[1] || "50");
      if (isNaN(score)) {
        setTerminalLogs([...cleanLogs, "Command Usage Error: eval [numerical risk factor (0-100)]", " "]);
      } else {
        const risk = score > 75 ? "CRITICAL OUTFLOW DANGER" : "OPTIMIZED RETENTION PATH";
        setTerminalLogs([
          ...cleanLogs,
          `Ingesting risk index probability metric vector: ${score}%`,
          `Calculating attrition classifier gradient boosting predictions...`,
          `MODEL CLASSIFICATION: [${risk}] - Sentiment sync verified level optimal.`,
          " "
        ]);
      }
    } else if (trimmed === "clear") {
      setTerminalLogs([]);
    } else if (trimmed === "") {
      setTerminalLogs([...cleanLogs]);
    } else {
      setTerminalLogs([
        ...cleanLogs,
        `Shell Error: command not found: '${trimmed}'. Type 'help' for layout of commands.`,
        " "
      ]);
    }
    setTerminalInput("");
  };

  // Run File sandbox compilation trigger
  const runActiveFile = () => {
    setRunSuccess(`Executing sandbox compiler on ${selectedFile.name}...`);
    setTimeout(() => {
      setRunSuccess(
        `SUCCESS: Standard compiler output for ${selectedFile.name} returned 0 error vectors. Standard interface diagnostics validated on server.ts`
      );
    }, 800);
  };

  // Chat dispatcher to Express endpoint `/api/chat`
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await res.json();
      if (data && data.text) {
        setChatMessages(prev => [...prev, { 
          sender: "bot", 
          text: data.text, 
          source: data.source 
        }]);
      } else {
        setChatMessages(prev => [...prev, { sender: "bot", text: "Connecting to internal workspace knowledge base failed. Please refresh." }]);
      }
    } catch (err) {
      console.error("Chat backend failure", err);
      setChatMessages(prev => [...prev, { 
        sender: "bot", 
        text: "System offline. Connecting directly to local rules: Jelvan possesses exceptional expertise in Next.js, Node, Gemini models, and HR digitalization." 
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-charcoal" />
          <h3 className="font-display font-bold text-lg text-charcoal">Simulated AI Developer IDE & Core Terminal</h3>
        </div>
        <p className="text-xs text-charcoal/50 font-mono mt-0.5">Explore active repository manifests, emulate POSIX bash commands, and direct chat queries via our live Gemini-backed companion.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Columns (SaaS Development IDE) */}
        <div className="xl:col-span-2 bg-charcoal rounded-2xl border border-charcoal/20 shadow-2xl overflow-hidden flex flex-col h-[520px]">
          
          {/* Header IDE Toolbar */}
          <div className="bg-charcoal/90 border-b border-white/5 p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1.5 select-none">
                <div className="w-3 h-3 rounded-full bg-red-500/85" />
                <div className="w-3 h-3 rounded-full bg-amber-500/85" />
                <div className="w-3 h-3 rounded-full bg-green-500/85" />
              </div>

              {/* IDE Tabs selection */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setActiveTab("code")}
                  className={`text-xs font-mono font-medium px-3 py-1 rounded transition-colors ${
                    activeTab === "code" ? "bg-white/10 text-cream" : "text-cream/50 hover:text-cream/80"
                  }`}
                >
                  Code Editor
                </button>
                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`text-xs font-mono font-medium px-3 py-1 rounded transition-colors ${
                    activeTab === "terminal" ? "bg-white/10 text-cream" : "text-cream/50 hover:text-cream/80"
                  }`}
                >
                  UNIX Console
                </button>
              </div>
            </div>

            {/* Run Button is active if we are on edit code tab */}
            {activeTab === "code" && (
              <button
                onClick={runActiveFile}
                className="flex items-center space-x-1.5 bg-cream/10 hover:bg-cream/15 text-cream font-semibold font-mono text-[11px] p-1.5 px-3.5 rounded border border-white/15 transition-all text-white"
              >
                <Play className="w-3.5 h-3.5 text-green-400 fill-green-400/20" />
                <span>Compiler Sandbox</span>
              </button>
            )}
          </div>

          <div className="flex-1 flex overflow-hidden">
            
            {/* Sidebar navigation for IDE */}
            <div className="w-48 bg-charcoal/98 border-r border-white/5 p-3 flex flex-col justify-between shrink-0 select-none">
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-cream/40 tracking-wider uppercase block px-2">REPOSITORY REPO</span>
                
                <div className="space-y-1">
                  {MOCK_FILES.map((file) => (
                    <button
                      key={file.name}
                      onClick={() => {
                        setSelectedFile(file);
                        setActiveTab("code");
                      }}
                      className={`w-full flex items-center space-x-2 text-left p-2.5 rounded text-xs transition-colors font-mono ${
                        selectedFile.name === file.name && activeTab === "code"
                          ? "bg-white/10 text-cream"
                          : "text-cream/50 hover:bg-white/5 hover:text-cream/80"
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Git Branch Graphic indicators on workspace sidebar */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-mono text-cream/40 px-2">
                  <span>Git Branch Tree</span>
                  <GitBranch className="w-3.5 h-3.5" />
                </div>
                
                <div className="space-y-1 ml-2">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-cream/80">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>main (ingress node)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-cream/50">
                    <span className="w-2 h-2 rounded-full bg-charcoal-light border border-white/20 shrink-0" />
                    <span>deploy-v{gitBranchCount}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* IDE Workspace Core Details */}
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#181816] p-4 text-[#bfbfaa]">
              
              {activeTab === "code" ? (
                // Code Tab Editor screen
                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2 shrink-0">
                    <span className="text-white">Active edit: src/{selectedFile.name} (READ-ONLY)</span>
                    <span>Charset: UTF-8</span>
                  </div>
                  
                  {/* Actual Source code area */}
                  <div className="flex-1 overflow-auto font-mono text-xs leading-relaxed py-4 pr-2 whitespace-pre text-[#cacaaf]">
                    <code>{selectedFile.code}</code>
                  </div>

                  {/* Operational status log banner */}
                  {runSuccess && (
                    <div className="mt-2 p-3 rounded-lg bg-white/10 border border-white/10 font-mono text-[10.5px] text-cream flex items-start space-x-2 shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0 pt-0.5" />
                      <div>{runSuccess}</div>
                    </div>
                  )}
                </div>
              ) : (
                // Interactive UNIX shell terminal tab
                <div 
                  ref={terminalEndRef}
                  className="flex-1 flex flex-col justify-between overflow-y-auto font-mono text-xs space-y-4"
                >
                  <div className="space-y-1 leading-relaxed">
                    {terminalLogs.map((log, idx) => (
                      <div key={idx} className={log.startsWith("jelvan-node") ? "text-white" : ""}>
                        {log}
                      </div>
                    ))}
                  </div>

                  {/* Shell command input line */}
                  <div className="flex items-center space-x-2 border-t border-white/5 pt-3 shrink-0">
                    <span className="text-white font-bold shrink-0">jelvan-node:~$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          runTerminalCommand(terminalInput);
                        }
                      }}
                      placeholder="Type 'help' for layout of terminal nodes..."
                      className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-[#efefc9] font-mono placeholder-[#bfbf9a]/40"
                    />
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Right 1 Column (Full-stack AI assistant conversation framework) */}
        <div className="bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden flex flex-col h-[520px]">
          
          {/* Header companion unit */}
          <div className="p-4 border-b border-charcoal/5 bg-charcoal/[0.01] flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-2">
              <Brain className="w-5.5 h-5.5 text-charcoal" />
              <div>
                <h4 className="font-display font-semibold text-sm text-charcoal">Ecosystem AI Assistant</h4>
                <span className="text-[9.5px] font-mono text-charcoal/40 block">Powered by Gemini 3.5 Engine</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1.5 bg-charcoal/5 px-2 py-0.5 rounded text-[9.5px] font-mono text-charcoal">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-800" />
              <span>Synced</span>
            </div>
          </div>

          {/* Chat Messages Log Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs scrollbar-none">
            {chatMessages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col space-y-1 ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div className={`p-3 rounded-2xl max-w-[90%] leading-relaxed ${
                  msg.sender === "user" 
                    ? "bg-charcoal text-cream rounded-tr-none font-medium" 
                    : "bg-charcoal/[0.03] text-charcoal rounded-tl-none border border-charcoal/10"
                }`}>
                  {msg.text}
                </div>
                
                {/* Visual context source block */}
                {msg.source && (
                  <span className="text-[8px] font-mono text-charcoal/40 px-2 uppercase italic">
                    Source: {msg.source}
                  </span>
                )}
              </div>
            ))}

            {chatLoading && (
              <div className="flex items-center space-x-2 text-charcoal/40 font-mono text-[10px] pl-2">
                <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                <span>Agent scoring query vector telemetry...</span>
              </div>
            )}
          </div>

          {/* Form input messaging block */}
          <form 
            onSubmit={handleChatSubmit}
            className="p-4 border-t border-charcoal/5 bg-charcoal/[0.01] flex gap-2 shrink-0"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Query Jelvan's competence or projects..."
              className="flex-1 font-sans text-xs bg-white border border-charcoal/10 rounded-lg p-2.5 focus:outline-none focus:border-charcoal/40"
            />
            <button
              type="submit"
              className="bg-charcoal text-cream font-mono text-xs p-2.5 px-4 rounded-lg flex items-center justify-center hover:bg-charcoal/90 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}

import { useState, useMemo } from "react";
import { 
  Users, Sliders, RefreshCw, Eye, Sparkles, ShieldAlert, CheckCircle, 
  Search, Shield, PlayCircle, ToggleLeft, Activity, Mail 
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  role: string;
  score: number;
  status: "Optimized" | "Risk Group" | "Critical" | "Pending Screening";
  evaluator: string;
  feedback: string;
}

const INITIAL_USERS: UserProfile[] = [
  { id: "U-042", name: "Daron Vance", role: "Principal Cloud Engineer", score: 96, status: "Optimized", evaluator: "HR Screening Agent", feedback: "Matches 98% of deep cloud parameters. Exceptional technical screening." },
  { id: "U-118", name: "Alissa Moore", role: "AI Security Analyst", score: 48, status: "Risk Group", evaluator: "Continuous Agent AI", feedback: "Incongruency flagged in recent commits rhythm. Retention warning." },
  { id: "U-082", name: "Kaelen Mercer", role: "Venture Relations Manager", score: 12, status: "Critical", evaluator: "Turnover Predictive Model", feedback: "High turnover probability. Sentiment indicator suggests exit signs." },
  { id: "U-156", name: "Elena Rostova", role: "Staff DevOps Specialist", score: 89, status: "Optimized", evaluator: "Talent Affinity Matrix", feedback: "Demonstrated excellent scaling leadership. Recommend immediate promotion review." },
  { id: "U-091", name: "Tariq Kassis", role: "SaaS Growth Specialist", score: 71, status: "Pending Screening", evaluator: "Automated Parser", feedback: "Awaiting final screening verification stage." }
];

export default function SaasDashboardMode() {
  const [users, setUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(INITIAL_USERS[0]);
  const [metricsMultiplier, setMetricsMultiplier] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "System log initialized at 112ms callback threshold.",
    "RAG Vector Database syncing verified. 3 nodes listening."
  ]);

  const handleRefreshMetrics = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      setMetricsMultiplier(Math.random() * 0.4 + 0.8);
      setLogs(l => [
        `Ingress sync refreshed at ${new Date().toLocaleTimeString()} • multiplier calibrated to ${metricsMultiplier.toFixed(3)}`,
        ...l.slice(0, 8)
      ]);
    }, 600);
  };

  const handleSimulateScreening = (userId: string) => {
    setUsers(curr => curr.map(u => {
      if (u.id === userId) {
        const randomScore = Math.floor(Math.random() * 40) + 60; // 60-100
        const updatedStatus = randomScore > 85 ? "Optimized" : randomScore > 70 ? "Pending Screening" : "Risk Group";
        const responseLogs = [
          `Simulated AI screening for ${u.name}... final score calibrated at ${randomScore}%`,
          ...logs
        ];
        setLogs(responseLogs);
        return {
          ...u,
          score: randomScore,
          status: updatedStatus as any,
          evaluator: "Strategic Screening Agent 3.5V",
          feedback: `Recalibrated skill affinity verified. Recommended fit is ${updatedStatus.toLowerCase()}.`
        };
      }
      return u;
    }));
  };

  const currentUsers = useMemo(() => {
    return users.filter(u => {
      const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.role.toLowerCase().includes(searchTerm.toLowerCase());
      if (activeFilter === "ALL") return matchSearch;
      return matchSearch && u.status === activeFilter;
    });
  }, [users, searchTerm, activeFilter]);

  return (
    <div className="space-y-6">
      
      {/* SaaS Dashboard Control Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-charcoal animate-pulse" />
            <h3 className="font-display font-bold text-lg text-charcoal">Global Core Administrative Operations</h3>
          </div>
          <p className="text-xs text-charcoal/50 font-mono">Administrative dashboard interface demonstrating frontend telemetry and grid sync orchestration.</p>
        </div>
        
        {/* Sliders and Refresher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-charcoal/70 bg-charcoal/[0.04] p-2 px-3 rounded-lg">
            <Sliders className="w-3.5 h-3.5" />
            <span>Load Scaler: {metricsMultiplier.toFixed(2)}x</span>
            <input 
              type="range" 
              min="0.5" 
              max="2.0" 
              step="0.1"
              value={metricsMultiplier}
              onChange={(e) => setMetricsMultiplier(parseFloat(e.target.value))}
              className="w-16 h-1 bg-charcoal/10 rounded-lg appearance-none cursor-pointer accent-charcoal" 
            />
          </div>

          <button 
            onClick={handleRefreshMetrics}
            className="flex items-center space-x-1.5 bg-white border border-charcoal/10 hover:bg-charcoal/[0.03] text-charcoal font-semibold font-mono text-xs p-2 px-3.5 rounded-lg active:scale-95 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? "animate-spin" : ""}`} />
            <span>Sync Stats</span>
          </button>
        </div>
      </div>

      {/* Top Indicators Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* Widget 1 */}
        <div className="bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-charcoal/40 uppercase">RAG Queries Ingested</span>
            <Activity className="w-3.5 h-3.5 text-charcoal/60" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-display font-bold text-charcoal">
              {(1420 * metricsMultiplier).toFixed(0)} <span className="text-xs text-charcoal/40 font-mono">sessions</span>
            </div>
            <div className="text-[10px] font-mono text-green-700">Cache hit efficiency 98.4%</div>
          </div>
        </div>

        {/* Widget 2 */}
        <div className="bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-charcoal/40 uppercase">Anomaly Detection</span>
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-display font-bold text-charcoal">
              0 <span className="text-xs text-charcoal/40 font-mono">critical items</span>
            </div>
            <div className="text-[10px] font-mono text-charcoal/50">Core firewalls optimal</div>
          </div>
        </div>

        {/* Widget 3 */}
        <div className="bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-charcoal/40 uppercase">API Ingress Sync</span>
            <RefreshCw className="w-3.5 h-3.5 text-charcoal/60" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-display font-bold text-charcoal">
              {(342 * metricsMultiplier).toFixed(1)} <span className="text-xs text-charcoal/40 font-mono">req/s</span>
            </div>
            <div className="text-[10px] font-mono text-green-700">Network latency stable</div>
          </div>
        </div>

        {/* Widget 4 */}
        <div className="bg-white rounded-xl p-5 border border-charcoal/5 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-charcoal/40 uppercase">Active Core Nodes</span>
            <Shield className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-display font-bold text-charcoal">
              3 <span className="text-xs text-charcoal/40 font-mono">Global Mesh</span>
            </div>
            <div className="text-[10px] font-mono text-emerald-800 font-medium">Uptime certified at 99.98%</div>
          </div>
        </div>

      </div>

      {/* Main SaaS Dashboard Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Employee Table & User Management */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-charcoal/5 shadow-sm overflow-hidden flex flex-col justify-between">
          
          <div className="p-5 border-b border-charcoal/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-0.5">
              <h4 className="font-display font-bold text-sm text-charcoal flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Strategic Personnel Alignment Roster</span>
              </h4>
              <p className="text-[11px] text-charcoal/50 font-mono">Filter by corporate status ratings or type key search parameters.</p>
            </div>

            {/* In-table Search & Filter */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-charcoal/30" />
                <input
                  type="text"
                  placeholder="Search user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="font-sans text-xs bg-charcoal/[0.03] pl-8 pr-3 py-2 rounded-lg border border-charcoal/10 focus:outline-none focus:border-charcoal/35 w-full sm:w-40"
                />
              </div>

              {/* Status Filter Dropdown */}
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="font-mono text-xs bg-charcoal/[0.04] p-2 border border-charcoal/10 rounded-lg focus:outline-none"
              >
                <option value="ALL">ALL STATUSES</option>
                <option value="Optimized">OPTIMIZED</option>
                <option value="Risk Group">RISK GROUP</option>
                <option value="Critical">CRITICAL</option>
                <option value="Pending Screening">PENDING</option>
              </select>
            </div>
          </div>

          {/* Roster Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-charcoal/[0.01] border-b border-charcoal/5 text-[10px] font-mono text-charcoal/50 uppercase">
                  <th className="p-4 px-6">Profile Unit</th>
                  <th className="p-4">Affinity Score</th>
                  <th className="p-4">Status Indicator</th>
                  <th className="p-4">Evaluator Chain</th>
                  <th className="p-4 text-right px-6">Direct Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/[0.04] text-xs font-sans">
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-charcoal/40 font-mono">
                      No personnel matching current filters.
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((u) => (
                    <tr 
                      key={u.id}
                      onClick={() => setSelectedUser(u)}
                      className={`hover:bg-charcoal/[0.012] cursor-pointer transition-colors ${selectedUser?.id === u.id ? "bg-charcoal/[0.02]" : ""}`}
                    >
                      <td className="p-4 px-6">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-charcoal text-sm">{u.name}</span>
                          <span className="font-mono text-[10.5px] text-charcoal/40 block">{u.role}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-charcoal/[0.04] h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-charcoal rounded-full" 
                              style={{ width: `${u.score}%` }}
                            />
                          </div>
                          <span className="font-mono text-xs font-semibold text-charcoal">{u.score}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-0.5 rounded-full font-mono text-[9px] text-center ${
                          u.status === "Optimized" ? "text-green-800 bg-green-50" :
                          u.status === "Risk Group" ? "text-amber-800 bg-amber-50" :
                          u.status === "Critical" ? "text-red-800 bg-red-50" : "text-charcoal/50 bg-charcoal/[0.04]"
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[10px] text-charcoal/60">
                        {u.evaluator}
                      </td>
                      <td className="p-4 text-right px-6 space-x-2 font-mono">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSimulateScreening(u.id);
                          }}
                          className="text-[10px] bg-charcoal text-cream px-2 py-1 rounded hover:bg-charcoal/90 transition-colors cursor-pointer"
                        >
                          Screen
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 px-6 border-t border-charcoal/5 bg-charcoal/[0.01] flex justify-between items-center text-[10px] font-mono text-charcoal/40">
            <span>Roster calibrated globally across continuous webhook integrations.</span>
            <span>Record subset count: {currentUsers.length}</span>
          </div>

        </div>

        {/* Right 1 Col: Mini Profile View Panel & Interactive Diagnostics Terminal */}
        <div className="space-y-6">
          
          {/* Active Detail Summary Panel */}
          <div className="bg-white rounded-xl border border-charcoal/5 shadow-sm p-5 space-y-4">
            <div className="flex justify-between items-start border-b border-charcoal/5 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-charcoal/40 uppercase">ACTIVE DRILLDOWN UNIT</span>
                <h4 className="font-display font-bold text-sm text-charcoal">
                  {selectedUser ? selectedUser.name : "Select Profile"}
                </h4>
              </div>
              <span className="text-[11px] font-mono text-charcoal">{selectedUser?.id}</span>
            </div>

            {selectedUser ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-charcoal/40 block">Assigned Scope / Role</span>
                  <div className="text-xs text-charcoal font-medium">{selectedUser.role}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-charcoal/[0.03] p-2 rounded-lg border border-charcoal/[0.04] space-y-0.5">
                    <span className="text-[9px] font-mono text-charcoal/40 block">Affinity Matrix</span>
                    <div className="font-mono font-semibold">{selectedUser.score}% Score</div>
                  </div>
                  <div className="bg-charcoal/[0.03] p-2 rounded-lg border border-charcoal/[0.04] space-y-0.5">
                    <span className="text-[9px] font-mono text-charcoal/40 block">Operational Stat</span>
                    <div className="font-mono font-semibold text-charcoal/70">{selectedUser.status}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-charcoal/40 block">Evaluated Sentiment Indicator Findings</span>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-sans italic bg-cream/30 p-2.5 rounded-lg border border-charcoal/5">
                    "{selectedUser.feedback}"
                  </p>
                </div>

                <div className="pt-2 border-t border-charcoal/5 space-y-2">
                  <button 
                    onClick={() => {
                      setLogs(l => [`Dispatched instant screening request packet to secure email gateway user ${selectedUser.id}`, ...l]);
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-charcoal text-cream font-mono text-xs py-2 rounded-lg hover:bg-charcoal/90 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Automated Report</span>
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-charcoal/50 font-mono italic">
                Awaiting personnel card selection for deep telemetry breakdown...
              </p>
            )}
          </div>

          {/* Interactive Logs Diagnostics Terminal */}
          <div className="bg-charcoal text-[#c5c5b5] rounded-xl p-5 shadow-inner space-y-3 font-mono text-[11px] h-64 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[9px] text-cream/40 tracking-wider">DIAGNOSTIC EVENT GATEWAY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 py-2 scrollbar-none">
              {logs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">
                  <span className="text-cream/30">[$]</span> {log}
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/5 flex gap-2">
              <button 
                onClick={() => setLogs([])}
                className="text-[9px] text-cream/40 hover:text-cream/70 underline"
              >
                Clear buffer
              </button>
              <span className="text-[9px] text-cream/20">|</span>
              <span className="text-[9px] text-cream/40">SYS LOG READY</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

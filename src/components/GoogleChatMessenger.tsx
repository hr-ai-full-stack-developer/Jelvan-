import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, Send, Settings, CheckCircle, AlertTriangle, 
  Terminal, ShieldCheck, HelpCircle, ExternalLink, Link2, 
  RefreshCw, Info, Bot, User, Sparkles, Plus 
} from "lucide-react";

interface LogEntry {
  timestamp: string;
  type: "info" | "success" | "error" | "payload";
  message: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  { label: "🎯 Hire Architect", prompt: "I would like to hire Jelvan for a full-stack engineering role or contract project." },
  { label: "⚡ AI Workflow", prompt: "We want to automate our operations and build intelligent AI Agent chains with Jelvan." },
  { label: "👔 Consulting Query", prompt: "I want to arrange a consultation regarding HR systems digital transformation." },
  { label: "🔬 Check Reference", prompt: "Hi! I am testing the Google Chat telemetry webhook and want to verify connectivity." }
];

export default function GoogleChatMessenger() {
  // Modes: "ai" for interactive conversational intake, "direct" for immediate single-message form
  const [interfaceMode, setInterfaceMode] = useState<"ai" | "direct">("ai");
  
  // Direct Form State
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [priority, setPriority] = useState("URGENT — Core Engineering Group");

  // AI Chat Mode State
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      sender: "bot",
      text: "Hello! I am Jelvan's Direct Messaging AI Agent. I will help draft and forward your inquiry straight to Jelvan's Google Chat Room.\n\nTo begin, what is your name and the company or organization you represent?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [aiIntakeSuccess, setAiIntakeSuccess] = useState(false);
  const [compiledPayload, setCompiledPayload] = useState<string | null>(null);

  // Webhook Destination Settings
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isUsingDefaultWebhook, setIsUsingDefaultWebhook] = useState(true);
  const [defaultWebhookConfigured, setDefaultWebhookConfigured] = useState(true);

  // General Engine state
  const [submitting, setSubmitting] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages, chatLoading]);

  // Load telemetry logs and settings offline status
  useEffect(() => {
    addLog("info", "Google Chat Dispatch Engine initialized.");
    
    // Probe API status
    fetch("/api/health")
      .then(res => res.json())
      .then(data => {
        addLog("info", "Connected to JELVAN® API Gateway. Telemetry route active.");
        setDefaultWebhookConfigured(data.api_key_configured);
      })
      .catch(() => {
        addLog("error", "Error mapping server-side webhook state. Using gateway routing.");
      });

    // Recover cached custom webhook if present
    try {
      const savedUrl = localStorage.getItem("google_chat_webhook_custom");
      if (savedUrl) {
        setWebhookUrl(savedUrl);
        setIsUsingDefaultWebhook(false);
        addLog("info", "Recovered user custom Google Chat Webhook Space URL.");
      }
    } catch {
      // ignore
    }
  }, []);

  const addLog = (type: "info" | "success" | "error" | "payload", message: string) => {
    const stamp = new Date().toLocaleTimeString();
    setLogs(prev => [
      { timestamp: stamp, type, message },
      ...prev.slice(0, 49) // Keep last 50
    ]);
  };

  const handleCustomWebhookToggle = (useDefault: boolean) => {
    setIsUsingDefaultWebhook(useDefault);
    addLog("info", `Target router mode swapped to: ${useDefault ? "Default Environment Webhook" : "User Custom Webhook Space"}`);
  };

  const saveCustomWebhook = (url: string) => {
    setWebhookUrl(url);
    try {
      localStorage.setItem("google_chat_webhook_custom", url);
      addLog("success", "Stored custom webhook target locally.");
    } catch (e) {
      addLog("error", "Failed to cache target URL locally.");
    }
  };

  // Triggers immediate push payload of direct OR parsed AI summary to Google Chat Webhook
  const forwardToGoogleChat = async (payloadData: {
    senderName: string;
    senderEmail: string;
    priority: string;
    message: string;
  }) => {
    setSubmitting(true);
    addLog("info", "Aesthetic layout formatted. Dispatched package telemetry to backend...");

    addLog("payload", JSON.stringify({
      senderName: payloadData.senderName,
      senderEmail: payloadData.senderEmail,
      priority: payloadData.priority,
      messageLength: payloadData.message.length
    }, null, 2));

    try {
      const payload = {
        webhookUrl: isUsingDefaultWebhook ? "" : webhookUrl,
        useDefaultWebhook: isUsingDefaultWebhook,
        senderName: payloadData.senderName,
        senderEmail: payloadData.senderEmail,
        priority: payloadData.priority,
        message: payloadData.message
      };

      const res = await fetch("/api/google-chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Server endpoint rejected packet.");
      }

      addLog("success", "API HTTP 200: Direct message integrated cleanly into Jelvan's Google Chat Room.");
      setNotification({
        type: "success",
        text: `Success! Your packet has been delivered directly to Jelvan's Google Chat space. Expect a response soon!`
      });
      return true;
    } catch (err: any) {
      addLog("error", `Transport Layer Exception: ${err.message}`);
      setNotification({
        type: "error",
        text: err.message || "Failed to deliver message. Please explore custom webhook settings."
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Handle standard manual transmission
  const handleSendMessageDirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) {
      setNotification({ type: "error", text: "Please input message details to transmit." });
      return;
    }

    const completed = await forwardToGoogleChat({
      senderName: senderName || "Anonymous Visitor",
      senderEmail: senderEmail || "rjelvanbaloaloa@gmail.com",
      priority,
      message: messageText
    });

    if (completed) {
      setMessageText("");
    }
  };

  // Handles presets starting conversational AI
  const handleApplyPreset = (promptText: string) => {
    if (interfaceMode === "direct") {
      setMessageText(promptText);
    } else {
      setAiInput(promptText);
    }
    addLog("info", "Injected message template into the dispatch space.");
  };

  // Submit AI message to conversational backend
  const handleSendAiMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = aiInput.trim();
    if (!cleanInput) return;

    // Add user bubble
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: cleanInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setAiMessages(prev => [...prev, userMsg]);
    setAiInput("");
    setChatLoading(true);
    addLog("info", "Sent visitor reply to conversation manager...");

    try {
      // Map component message array to simple string history for backend
      const historyPayload = aiMessages.map(m => ({
        role: m.sender === "bot" ? "model" : "user",
        text: m.text
      }));

      const res = await fetch("/api/google-chat/ai-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: cleanInput,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error("Local intelligence engine processing block.");
      }

      const data = await res.json();
      const rawText: string = data.text || "";

      // Check if Gemini triggered completion
      if (rawText.includes("TRANS_COMPLETE:")) {
        const parts = rawText.split("TRANS_COMPLETE:");
        const textPre = parts[0].trim();
        const payloadDetails = parts[1].trim();

        const cleanBotText = textPre || "Excellent! I have compiled your details perfectly. Generating structured packet for Google Chat now...";
        
        // Add final bot message bubble
        setAiMessages(prev => [...prev, {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: cleanBotText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }]);

        setAiIntakeSuccess(true);
        setCompiledPayload(payloadDetails);
        addLog("success", "Conversational intake completed. Dispatching leads package!");

        // Forward compiling directly!
        await forwardToGoogleChat({
          senderName: "AI Intake Assistant",
          senderEmail: "jelvan-bot@google-chat",
          priority: "AI INTEL — Inbound Automated Prospect",
          message: payloadDetails
        });

      } else {
        // Just post conversational assistant text
        setAiMessages(prev => [...prev, {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: rawText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }]);
      }

    } catch (err: any) {
      addLog("error", `AI processing interruption: ${err.message}`);
      setAiMessages(prev => [...prev, {
        id: `bot-${Date.now()}-err`,
        sender: "bot",
        text: "I experienced a telemetry drop-frame but my connection is stable. Could you restate your details so I can forward them securely?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleResetAiChat = () => {
    setAiMessages([
      {
        id: "initial-welcome",
        sender: "bot",
        text: "Hello! I am Jelvan's Direct Messaging AI Agent. I will help draft and forward your inquiry straight to Jelvan's Google Chat Room.\n\nTo begin, what is your name and the company or organization you represent?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
    setAiIntakeSuccess(false);
    setCompiledPayload(null);
    setNotification(null);
    addLog("info", "Restarted direct message intake session.");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Header Deck */}
      <div className="space-y-2 border-b border-charcoal/5 pb-6">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-cream flex items-center justify-center shadow-sm">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl tracking-tight text-charcoal">Google Chat Messaging Center</h2>
            <p className="text-xs text-charcoal/55 font-sans">
              Direct telemetry router dispatching instant communications straight to the engineering dashboard space.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Chip Panel */}
      <div className="space-y-2 bg-charcoal/5 p-4 rounded-xl border border-charcoal/[0.03]">
        <div className="flex items-center space-x-1.5 text-charcoal/60 text-[10px] font-mono uppercase tracking-widest leading-none mb-1">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Quick Topic Pre-fills</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_PROMPTS.map((ps, i) => (
            <button
              key={i}
              onClick={() => handleApplyPreset(ps.prompt)}
              className="bg-white hover:bg-orange-50 border border-charcoal/5 text-[11px] font-sans text-charcoal/80 hover:text-orange-950 px-3 py-1.5 rounded-lg font-medium transition-all select-none cursor-pointer"
            >
              {ps.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Message Box or Manual Form */}
        <div className="lg:col-span-7 space-y-6">

          {/* Mode Tabs */}
          <div className="flex border-b border-charcoal/5">
            <button
              onClick={() => setInterfaceMode("ai")}
              className={`pb-3 px-6 text-xs uppercase tracking-widest font-mono font-bold border-b-2 transition-all cursor-pointer ${
                interfaceMode === "ai" 
                  ? "border-orange-500 text-charcoal" 
                  : "border-transparent text-charcoal/40 hover:text-charcoal/60"
              }`}
            >
              AI Dispatch Agent
            </button>
            <button
              onClick={() => setInterfaceMode("direct")}
              className={`pb-3 px-6 text-xs uppercase tracking-widest font-mono font-bold border-b-2 transition-all cursor-pointer ${
                interfaceMode === "direct" 
                  ? "border-orange-500 text-charcoal" 
                  : "border-transparent text-charcoal/40 hover:text-charcoal/60"
              }`}
            >
              Manual Form Post
            </button>
          </div>
          
          {/* Notification Alert */}
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl flex items-start space-x-3 text-xs leading-relaxed border ${
                notification.type === "success" 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                  : "bg-amber-50 border-amber-200 text-amber-800"
              }`}
            >
              {notification.type === "success" ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span className="font-bold uppercase tracking-wider block mb-0.5 text-[10px] font-mono">
                  {notification.type === "success" ? "Transmission Verified" : "Validation Warning"}
                </span>
                <span>{notification.text}</span>
              </div>
            </motion.div>
          )}

          {/* AI INTERACTIVE DISPATCH MODE */}
          {interfaceMode === "ai" && (
            <div className="bg-white rounded-2xl border border-charcoal/10 shadow-sm flex flex-col h-[540px] overflow-hidden">
              
              {/* Chat Header */}
              <div className="bg-charcoal text-cream px-5 py-3.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-2.5">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-orange-500 animate-pulse" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-charcoal animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs leading-none">JELVAN® Inbox Assistant</h4>
                    <span className="text-[9px] text-cream/50 tracking-wider">Autonomous Recruiter Lead Agent</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetAiChat}
                  className="text-[9px] font-mono text-cream/70 hover:text-cream bg-white/5 border border-white/10 rounded px-2 py-1 uppercase hover:bg-white/10"
                >
                  Reset Chat
                </button>
              </div>

              {/* Chat Stream Window */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-cream/[0.15]">
                {aiMessages.map((msg) => {
                  const isBot = msg.sender === "bot";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-2.5 max-w-[85%] ${isBot ? "" : "ml-auto flex-row-reverse"}`}
                    >
                      <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                        isBot ? "bg-orange-500 text-cream" : "bg-charcoal text-cream"
                      }`}>
                        {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>

                      <div className="space-y-1">
                        <div className={`rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                          isBot 
                            ? "bg-white border border-charcoal/[0.05] text-charcoal rounded-tl-none whitespace-pre-wrap" 
                            : "bg-charcoal text-cream rounded-tr-none"
                        }`}>
                          {msg.text}
                        </div>
                        <span className={`text-[8.5px] font-mono block text-charcoal/40 ${isBot ? "text-left" : "text-right"}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                {chatLoading && (
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    <div className="w-7 h-7 rounded-lg bg-orange-500 text-cream flex items-center justify-center">
                      <Bot className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="bg-white border border-charcoal/[0.05] rounded-2xl rounded-tl-none p-3.5 text-xs text-charcoal/50 shadow-sm flex items-center space-x-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-500" />
                      <span>Drafting response with AI systems...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* AI Input Panel */}
              <div className="p-4 border-t border-charcoal/[0.06] bg-white">
                {aiIntakeSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-950">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-bold">Message Packet Dispatched!</span>
                        <p className="text-[10px] opacity-75">Thank you, your summarized details have been integrated.</p>
                      </div>
                    </div>
                    <button
                      onClick={handleResetAiChat}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendAiMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Type your reply to Jelvan's Dispatch Bot here..."
                      className="flex-1 bg-cream/[0.3] hover:bg-cream/[0.5] focus:bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-xs text-charcoal outline-none transition-colors focus:border-charcoal/30 font-sans"
                    />
                    <button
                      type="submit"
                      disabled={chatLoading || !aiInput.trim()}
                      className="bg-charcoal hover:bg-charcoal/90 text-cream px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* DIRECT FORM DISPATCH MODE */}
          {interfaceMode === "direct" && (
            <div className="bg-white rounded-2xl border border-charcoal/5 shadow-sm p-6 space-y-5">
              <h3 className="font-display font-semibold text-sm text-charcoal uppercase tracking-wider border-b border-charcoal/[0.04] pb-3">
                Direct Telemetry Message Setup
              </h3>

              <form onSubmit={handleSendMessageDirect} className="space-y-4 text-xs font-sans">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-charcoal/50 uppercase tracking-widest font-bold">
                      your name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your professional name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-cream/[0.3] hover:bg-cream/[0.5] focus:bg-white border border-charcoal/5 rounded-xl p-3 outline-none text-charcoal text-xs transition-colors focus:border-charcoal/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-charcoal/50 uppercase tracking-widest font-bold">
                      contact email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. recruit@enterprise.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full bg-cream/[0.3] hover:bg-cream/[0.5] focus:bg-white border border-charcoal/5 rounded-xl p-3 outline-none text-charcoal text-xs transition-colors focus:border-charcoal/20"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-charcoal/50 uppercase tracking-widest font-bold">
                    priority selection
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-cream/[0.3] hover:bg-cream/[0.5] border border-charcoal/5 rounded-xl p-3 outline-none text-charcoal text-xs transition-colors"
                  >
                    <option value="URGENT — Core Engineering Group">URGENT — Full-Stack Systems & Dev Opportunities</option>
                    <option value="STRATEGIC — Digital Transformation Consulting">STRATEGIC — Workforce Automations & SaaS Integrations</option>
                    <option value="GENERAL — Professional Inquiry">GENERAL — Networking & Verification Requests</option>
                    <option value="FEEDBACK — Interface Testing Console">FEEDBACK — Sandbox Testing Communications</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-charcoal/50 uppercase tracking-widest font-bold">
                    message body
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Draft your message. This message is converted to professional telemetry logs and pushed right to Jelvan's Google Chat Room..."
                    className="w-full bg-cream/[0.3] hover:bg-cream/[0.5] focus:bg-white border border-charcoal/5 rounded-xl p-3 outline-none text-charcoal text-xs transition-colors focus:border-charcoal/20 leading-relaxed font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full bg-charcoal hover:bg-charcoal/90 text-cream p-3.5 rounded-xl font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer select-none ${
                    submitting ? "opacity-70 cursor-wait" : ""
                  }`}
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-cream/80" />
                      <span>Forwarding packet via mesh tunnel...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-cream/90" />
                      <span>Dispatch Telemetry to Google Chat</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          )}

          {/* Webhook Instruction Block */}
          <div className="bg-white rounded-2xl border border-charcoal/5 shadow-sm p-6 space-y-4">
            <h4 className="font-display font-semibold text-sm text-charcoal flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-charcoal/45" />
              <span>How to Map target Google Chat Spaces</span>
            </h4>
            <div className="space-y-3 font-sans text-xs text-charcoal/70 leading-relaxed list-decimal list-inside pl-1">
              <p>
                Interested in using this panel directly with your own Google Chat Space? Follow this secure setup guide:
              </p>
              <div className="space-y-2 border-l border-orange-500/20 pl-3">
                <p>
                  <strong>Step 1:</strong> Locate your Google Chat client and navigate to the preferred space.
                </p>
                <p>
                  <strong>Step 2:</strong> Open the header dropdown, choose <strong>Apps & Integrations</strong> &gt; <strong>Webhooks</strong>.
                </p>
                <p>
                  <strong>Step 3:</strong> Name the integration webhook and save to retrieve a unique API routing endpoint.
                </p>
                <p>
                  <strong>Step 4:</strong> Click copy on your endpoint link and insert it into the target space option settings card!
                </p>
              </div>
              <a 
                href="https://developers.google.com/workspace/chat/quickstart/webhooks" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-1.5 font-bold font-mono text-[10px] text-blue-800 hover:text-blue-900 pt-2 hover:underline"
              >
                <span>Read Google Chat Developers Integration Guide</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Settings & Live Stream Logs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Target Selection Config Card */}
          <div className="bg-white rounded-2xl border border-charcoal/5 shadow-sm p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-charcoal/[0.04] pb-3">
              <h4 className="font-display font-semibold text-xs text-charcoal uppercase tracking-wider flex items-center space-x-1.5">
                <Settings className="w-4 h-4 text-charcoal/50" />
                <span>Space Destination Settings</span>
              </h4>
              <span className="text-[9px] font-mono bg-charcoal/5 text-charcoal px-1.5 py-0.5 rounded uppercase font-bold">ROUTE</span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleCustomWebhookToggle(true)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all text-xs font-sans ${
                    isUsingDefaultWebhook 
                      ? "border-charcoal bg-charcoal text-cream shadow" 
                      : "border-charcoal/10 hover:bg-charcoal/[0.02] text-charcoal"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-xs">Jelvan's Corporate Space (Default)</span>
                    <span className="text-[10px] opacity-60 block font-mono">Routes live via server default proxy</span>
                  </div>
                  {isUsingDefaultWebhook && <ShieldCheck className="w-4.5 h-4.5 shrink-0 text-cream font-bold" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleCustomWebhookToggle(false)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all text-xs font-sans ${
                    !isUsingDefaultWebhook 
                      ? "border-charcoal bg-charcoal text-cream shadow" 
                      : "border-charcoal/10 hover:bg-charcoal/[0.02] text-charcoal"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-xs">Custom Google Chat Webhook</span>
                    <span className="text-[10px] opacity-60 block font-mono">Provide your own incoming webhook</span>
                  </div>
                  {!isUsingDefaultWebhook && <Link2 className="w-4.5 h-4.5 shrink-0 text-cream" />}
                </button>
              </div>

              {!isUsingDefaultWebhook && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2 pt-2 border-t border-charcoal/5"
                >
                  <label className="font-mono text-[9px] text-charcoal/50 uppercase tracking-widest block font-bold">
                    Target Webhook URL
                  </label>
                  <input
                    type="password"
                    placeholder="https://chat.googleapis.com/v1/spaces/..."
                    value={webhookUrl}
                    onChange={(e) => saveCustomWebhook(e.target.value)}
                    className="w-full bg-cream/[0.3] focus:bg-white border border-charcoal/5 rounded-xl p-3 outline-none text-charcoal text-xs font-mono"
                  />
                  <div className="flex items-start space-x-1.5 pt-1 text-[9.5px] text-amber-800 leading-normal">
                    <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>This URL is stored securely on your local browser's storage and never exposed to other clients or external parties.</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Live Activity Telemetry Terminal Logs */}
          <div className="bg-[#1C1C1E] text-slate-300 rounded-2xl p-5 border border-charcoal shadow-lg space-y-3.5 flex flex-col h-80">
            <div className="flex justify-between items-center pb-2.5 border-b border-white/[0.06] shrink-0">
              <h4 className="font-mono text-[10.5px] uppercase tracking-wider flex items-center space-x-2 text-emerald-400">
                <Terminal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Mesh Dispatch Logs</span>
              </h4>
              <button 
                onClick={() => setLogs([])}
                className="text-[9px] hover:text-white font-mono bg-white/[0.05] hover:bg-white/[0.08] text-slate-400 px-2 py-0.5 rounded uppercase hover:cursor-pointer"
              >
                Clear
              </button>
            </div>

            <div className="font-mono text-[10px] leading-relaxed space-y-2 overflow-y-auto flex-1 select-text scrollbar-thin scrollbar-thumb-white/10 pr-2">
              {logs.length === 0 ? (
                <div className="text-slate-500 italic text-center pt-12">No dispatch traffic detected on secure bus to googlechat.</div>
              ) : (
                logs.map((entry, idx) => {
                  let badgeColor = "text-sky-400";
                  if (entry.type === "success") badgeColor = "text-emerald-400";
                  if (entry.type === "error") badgeColor = "text-rose-400 font-bold";
                  if (entry.type === "payload") badgeColor = "text-amber-300";

                  return (
                    <div key={idx} className="space-y-0.5 border-b border-white/[0.02] pb-1.5 last:border-0 font-mono">
                      <div className="flex items-center justify-between opacity-50 text-[9px]">
                        <span>[{entry.timestamp}]</span>
                        <span className={`uppercase font-bold ${badgeColor}`}>{entry.type}</span>
                      </div>
                      {entry.type === "payload" ? (
                        <pre className="text-amber-200/90 whitespace-pre-wrap overflow-x-auto text-[9.5px] block bg-white/[0.02] p-2 rounded mt-1 border border-white/[0.03] font-mono max-h-24">
                          {entry.message}
                        </pre>
                      ) : (
                        <p className="text-slate-300 break-all">{entry.message}</p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

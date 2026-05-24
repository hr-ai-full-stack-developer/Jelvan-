import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Background portfolio details to ground instructions
const JELVAN_BACKGROUND = `
Jelvan Baloaloa (branded as JELVAN®) is a premier Full Stack Web Developer, AI Practitioner, and Digital Transformation Professional.
Specialties & Core Focus:
1. Full Stack Software Engineering: Experienced in React, Node.js, TypeScript, Next.js, and modern CSS/UI architectures (Tailwind, Framer Motion).
2. Advanced AI Systems: Expertise in Agentic workflows, RAG, LLM integrations, fine-tuning, vector databases, and real-time models.
3. HR Strategy & Digital Transformation: Expert in aligning organizational design, human resources development, and modern automation software (recruitment portals, workforce analytics SaaS, workforce intelligence systems).

Key Projects:
- AI HR Analytics Platform: Predictive workforce retention, performance tracking models, real-time organizational risk analysis. Custom charting & metrics.
- Smart Recruitment SaaS: Resume parsing, candidate scoring pipelines, adaptive automated scheduling, HR-focused screening agents.
- Digital Transformation Dashboard: Real-time API transaction auditing, serverless performance logs, orchestration of legacy database synchronization (Cloud SQL, Spanner).
- AI Authentication System: Multi-factor biometric verification concepts, behavioral anomaly tracking, custom identity management UI.
- Developer Productivity Platform: Collaborative browser terminal environment with terminal command emulation and automated git-branch diagramming.
`;

// Lazy-loaded Gemini Client
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Fallback rule-based responses if Gemini Key is not configured
function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase();
  if (msg.includes("hello") || msg.includes("hi ") || msg.includes("hey")) {
    return "Hello! I am JELVAN's AI Portfolio Assistant. I can tell you about Jelvan's expertise as a Full Stack Web Developer, AI Practitioner, and Digital Transformation Professional. How can I help you today?";
  }
  if (msg.includes("project") || msg.includes("work")) {
    return "Jelvan has built several world-class full-stack projects: \n\n1. **AI HR Analytics Platform** - Predictive analytics with automated org risk scores.\n2. **Smart Recruitment SaaS** - Resume analytics and AI screening pipeline.\n3. **Developer Productivity Platform** - Integrated virtual terminals and collaborative tools.\n4. **Digital Transformation Dashboard** - Visualized system orchestration & logs.\n\nWhich one would you like to explore in more detail?";
  }
  if (msg.includes("experience") || msg.includes("background") || msg.includes("career")) {
    return "Jelvan possesses a unique blend of core software development and strategic consulting expertise. He bridges the gap between complex engineering (TypeScript, AI agent chains) and Digital HR transformation (enterprise personnel platforms and analytics).";
  }
  if (msg.includes("skills") || msg.includes("tech") || msg.includes("stack")) {
    return "Jelvan's tech stack is modern and industrial-strength:\n- **Frontend**: React 19, TypeScript, Tailwind CSS, Motion (Framer), design tokens.\n- **Backend & AI**: Node.js, Express, @google/genai, LangChain, vector lookup, Python.\n- **Data**: PostgreSQL, Firebase Firestore, real-time state synchronization.";
  }
  return "That is an interesting question! As Jelvan's AI Assistant, I can confirm that he excels in full-stack architecture, machine learning model pipeline deployment, and digital corporate transformation (specifically HR Tech). Let me know if you would like me to list his core projects or demonstrate one of our advanced workspace simulation views!";
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    api_key_configured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getAiClient();
    if (!ai) {
      // Graceful fallback when API Key is unset
      const text = getFallbackResponse(message);
      return res.json({ text, source: "offline-knowledge-graph" });
    }

    // Call real Gemini model
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: `You are JELVAN's Autonomous Portfolio Assistant. Your job is to answer questions about Jelvan Baloaloa (Full Stack Developer, AI Practitioner, and Digital Corporate Transformation Specialist). Respond in a highly professional, friendly, and elegant startup-inspired voice.
        
        Use clean Markdown with bold bullet points.
        Here is his credentials, context, and key background:
        ${JELVAN_BACKGROUND}
        
        Keep your output concise, elegant, and directly address user inquiries quickly.`,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text, source: "gemini-3.5-live-grounding" });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    // Graceful error recovery back to mock responder so it NEVER fails the user experience
    const text = getFallbackResponse(req.body.message || "");
    res.json({
      text: `${text}\n\n*(Note: Real-time Gemini connection paused; currently running on optimized local fallback knowledge network)*`,
      source: "error-recovered-offline-knowledge-graph",
    });
  }
});

// AI Direct Messaging Intake Processor
app.post("/api/google-chat/ai-intake", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getAiClient();
    if (!ai) {
      // Rule-based fallback system if Gemini API Key is not loaded
      const count = (history || []).length;
      if (count === 0) {
        return res.json({
          text: "Hi there! I am Jelvan's AI Assistant. I can gather information for you and send it to Jelvan's Google Chat instantaneously. What is your name and company/organization?",
          source: "offline-mock"
        });
      }
      const text = message.toLowerCase();
      if (count === 1 || count === 2) {
        return res.json({
          text: "Got it! Thanks for sharing. What is the best email address or phone number to reach you?",
          source: "offline-mock"
        });
      }
      if (count === 3 || count === 4) {
        return res.json({
          text: "Perfect! Now, please describe in detail what project, opportunity, or corporate transforming query you would like to forward to Jelvan.",
          source: "offline-mock"
        });
      }
      
      // Trigger complete automatically in fallback
      return res.json({
        text: "TRANS_COMPLETE:\n- **Contact Name**: Visitor (via sandbox)\n- **Request Details**: " + message + "\n- **Automated Routing**: Ingress Telemetry System",
        source: "offline-mock"
      });
    }

    // Call real Gemini
    const formattedContents = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    }));
    
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: `You are JELVAN's Automated AI Inbox & Lead Intake Assistant. The user wants to submit an inquiry, hire him, or propose a project. Your job is to guide them smoothly, in a delightful conversational manner, to capture these three crucial details:
        1. Their Name and Organization/Company
        2. Clean, valid Contact Email/Phone
        3. Comprehensive description of their project, inquiry, or recruitment details.
        
        Keep your turns short, human-like, and highly interactive.
        
        CRITICAL ACTION FLAG: 
        As soon as the user has provided these three details (either in one go or step-by-step), you MUST end your response message with exactly this token on a new line:
        TRANS_COMPLETE:
        - **Name / Organization**: <parsed name and organization>
        - **Contact details**: <email or phone parsed>
        - **Project / Offer summary**: <concise summary of their offering>
        
        If they haven't provided all details, DO NOT output TRANS_COMPLETE. Do not say it or mention it prematurely. Just keep asking for the missing pieces gracefully.`,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text, source: "gemini-3.5-live-grounding" });
  } catch (error: any) {
    console.error("AI Chat messenger intake error:", error);
    res.status(500).json({ error: error.message || "Failed to process chat conversation." });
  }
});

// secure Google Chat Integration Gateway
app.post("/api/google-chat/send", async (req, res) => {
  try {
    const { webhookUrl, useDefaultWebhook, senderName, senderEmail, priority, message } = req.body;
    
    let targetWebhook = webhookUrl;
    if (useDefaultWebhook) {
      targetWebhook = process.env.GOOGLE_CHAT_WEBHOOK_URL;
      if (!targetWebhook || targetWebhook.trim() === "" || targetWebhook === "MY_GOOGLE_CHAT_WEBHOOK_URL") {
        return res.status(400).json({ 
          error: "The server-side GOOGLE_CHAT_WEBHOOK_URL is not configured. Please toggle the 'Custom Google Chat Webhook' option on the right settings card to enter and test with your own webhook, or specify GOOGLE_CHAT_WEBHOOK_URL inside your project settings." 
        });
      }
    }

    if (!targetWebhook || !targetWebhook.startsWith("https://chat.googleapis.com")) {
      return res.status(400).json({ error: "Invalid Google Chat Webhook URL destination. Webhook URL must start with https://chat.googleapis.com" });
    }

    const formattedText = `*Incoming Portfolio Message Hub Alert*\n\n` + 
                         `• *Sender:* ${senderName || "Anonymous"}\n` +
                         `• *Email:* ${senderEmail || "No Email Provided"}\n` +
                         `• *Topic Routing:* \`${priority || "General Opportunity"}\`\n\n` +
                         `*Message Payload:*\n` + 
                         `>>> ${message}`;

    const chatResponse = await fetch(targetWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ text: formattedText })
    });

    if (!chatResponse.ok) {
      const errText = await chatResponse.text();
      return res.status(500).json({ error: `Google Chat webhook returned an error status: ${chatResponse.status}. Details: ${errText}` });
    }

    res.json({ success: true, message: "Package dispatched successfully via mesh route." });
  } catch (err: any) {
    console.error("Google Chat forwarder error in server middleware:", err);
    res.status(500).json({ error: err.message || "Failed to process chat message dispatch." });
  }
});

// Real-time server-side metrics simulation endpoint for dashboard
app.get("/api/metrics", (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  res.json([
    { name: "CPU Utilization", value: Math.floor(Math.sin(timestamp / 10) * 15 + 40) + "%" },
    { name: "API Request Rate", value: Math.floor(Math.sin(timestamp / 5) * 40 + 120) + " req/sec" },
    { name: "Global RAG Latency", value: Math.floor(Math.random() * 20 + 85) + "ms" },
    { name: "Vector Database Nodes", value: "3 Active" },
    { name: "System Uptime", value: "99.98%" },
  ]);
});

// Configure Vite or Static Serve
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JELVAN Workspace running on port http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start JELVAN Express-Vite backend:", err);
});

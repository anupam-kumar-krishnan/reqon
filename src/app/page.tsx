"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  FolderTree,
  Send,
  Braces,
  Radio,
  Users,
  Keyboard,
  Check,
  Github,
  ChevronRight,
} from "lucide-react";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

@keyframes reqon-fade-up {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes reqon-pulse-ring {
  0% { transform: scale(0.7); opacity: 0.55; }
  100% { transform: scale(1.9); opacity: 0; }
}
@keyframes reqon-float-up {
  0% { opacity: 0; transform: translateY(10px); }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-14px); }
}
@keyframes reqon-key-press {
  0%, 70%, 100% { transform: translateY(0); box-shadow: 0 2px 0 #232838; }
  80% { transform: translateY(2px); box-shadow: 0 0 0 #232838; }
}
@keyframes reqon-sweep {
  0%, 100% { transform: translateY(0); opacity: 0.9; }
  50% { transform: translateY(44px); opacity: 0.9; }
}
@keyframes reqon-avatar-pop {
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: scale(1); }
}
`;

type Method = "GET" | "POST" | "PUT" | "DELETE" | "WS";

const METHOD_STYLES: Record<
  Method,
  { text: string; bg: string; ring: string }
> = {
  GET: {
    text: "#4ADE80",
    bg: "rgba(74,222,128,0.12)",
    ring: "rgba(74,222,128,0.35)",
  },
  POST: {
    text: "#60A5FA",
    bg: "rgba(96,165,250,0.12)",
    ring: "rgba(96,165,250,0.35)",
  },
  PUT: {
    text: "#FBBF24",
    bg: "rgba(251,191,36,0.12)",
    ring: "rgba(251,191,36,0.35)",
  },
  DELETE: {
    text: "#F87171",
    bg: "rgba(248,113,113,0.12)",
    ring: "rgba(248,113,113,0.35)",
  },
  WS: {
    text: "#C084FC",
    bg: "rgba(192,132,252,0.12)",
    ring: "rgba(192,132,252,0.35)",
  },
};

interface DemoCall {
  method: Method;
  url: string;
  status: number;
  statusText: string;
  time: string;
  size: string;
  body: string;
}

const DEMO_CALLS: DemoCall[] = [
  {
    method: "GET",
    url: "https://api.reqon.dev/v1/users/8f2c1a",
    status: 200,
    statusText: "OK",
    time: "118 ms",
    size: "2.4 KB",
    body: `{\n  "id": "usr_8f2c1a",\n  "name": "Maya Chen",\n  "role": "maintainer",\n  "active": true\n}`,
  },
  {
    method: "POST",
    url: "https://api.reqon.dev/v1/deployments",
    status: 201,
    statusText: "Created",
    time: "342 ms",
    size: "0.9 KB",
    body: `{\n  "id": "dep_44a9",\n  "status": "queued",\n  "branch": "main"\n}`,
  },
  {
    method: "PUT",
    url: "https://api.reqon.dev/v1/flags/dark-mode",
    status: 200,
    statusText: "OK",
    time: "94 ms",
    size: "0.3 KB",
    body: `{\n  "flag": "dark-mode",\n  "enabled": true\n}`,
  },
  {
    method: "WS",
    url: "wss://api.reqon.dev/live/deploys",
    status: 101,
    statusText: "Switching Protocols",
    time: "12 ms",
    size: "—",
    body: `{\n  "event": "connected",\n  "channel": "deploys"\n}`,
  },
];

function LiveConsole() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"sending" | "done">("sending");

  useEffect(() => {
    const sendTimer = setTimeout(() => setPhase("done"), 550);
    const nextTimer = setTimeout(() => {
      setPhase("sending");
      setIndex((i) => (i + 1) % DEMO_CALLS.length);
    }, 3200);
    return () => {
      clearTimeout(sendTimer);
      clearTimeout(nextTimer);
    };
  }, [index]);

  const call = DEMO_CALLS[index];
  const style = METHOD_STYLES[call.method];

  return (
    <div
      className="relative rounded-2xl border overflow-hidden"
      style={{
        borderColor: "#242938",
        background: "linear-gradient(180deg, #12151D 0%, #0D0F16 100%)",
        boxShadow: "0 40px 100px -30px rgba(0,0,0,0.7)",
      }}
    >
      {/* window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: "#1E222E" }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#3A3F4D" }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#3A3F4D" }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#3A3F4D" }}
        />
        <span
          className="ml-3 text-[11px] tracking-wide"
          style={{
            color: "#5B6172",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          reqon — Admin-Backend-Edit
        </span>
      </div>

      {/* request row */}
      <div className="flex items-center gap-2 px-4 py-4">
        <span
          className="text-xs font-semibold px-2.5 py-1.5 rounded-md tabular-nums shrink-0"
          style={{
            color: style.text,
            background: style.bg,
            fontFamily: "'JetBrains Mono', monospace",
            boxShadow: `inset 0 0 0 1px ${style.ring}`,
          }}
        >
          {call.method}
        </span>
        <div
          className="flex-1 text-[13px] px-3 py-1.5 rounded-md truncate"
          style={{
            color: "#C7CBD6",
            background: "#171B24",
            fontFamily: "'JetBrains Mono', monospace",
            border: "1px solid #232838",
          }}
        >
          {call.url}
        </div>
        <span
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md shrink-0"
          style={{ color: "#0D0F16", background: "#7C6CFF" }}
        >
          <Send size={13} /> Send
        </span>
      </div>

      <div className="h-px" style={{ background: "#1E222E" }} />

      {/* response */}
      <div className="px-4 py-4">
        <div
          className="flex items-center gap-4 text-[11px] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span
            className="flex items-center gap-1.5"
            style={{ color: "#4ADE80" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: phase === "sending" ? "#5B6172" : "#4ADE80",
              }}
            />
            {phase === "sending"
              ? "sending…"
              : `${call.status} ${call.statusText}`}
          </span>
          <span style={{ color: "#5B6172" }}>
            {phase === "sending" ? "—" : call.time}
          </span>
          <span style={{ color: "#5B6172" }}>
            {phase === "sending" ? "—" : call.size}
          </span>
        </div>

        <pre
          className="text-[12.5px] leading-relaxed overflow-hidden transition-opacity duration-200"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#8A93A6",
            opacity: phase === "sending" ? 0.35 : 1,
            minHeight: 96,
          }}
        >
          {call.body.split("\n").map((line, i) => (
            <div key={i}>
              <span style={{ color: "#3E4454" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="ml-4"
                dangerouslySetInnerHTML={{ __html: highlightJson(line) }}
              />
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

function highlightJson(line: string) {
  return line
    .replace(/"(.*?)":/g, `<span style="color:#7C6CFF">"$1"</span>:`)
    .replace(/: "(.*?)"/g, `: <span style="color:#4ADE80">"$1"</span>`)
    .replace(/: (true|false)/g, `: <span style="color:#FBBF24">$1</span>`);
}

function FolderTreeVisual() {
  const rows = [
    { label: "Admin-Backend-Edit", depth: 0, open: true },
    { label: "Untitled1", depth: 1, dot: "#F87171" },
    { label: "GetAllUsers", depth: 1, dot: "#4ADE80" },
    { label: "Test Branch", depth: 0, open: true },
    { label: "getGitHubUserData_New", depth: 1, dot: "#4ADE80" },
  ];
  return (
    <div className="space-y-1.5">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className="flex items-center gap-2 text-[12px]"
          style={{
            paddingLeft: r.depth * 16,
            fontFamily: "'JetBrains Mono', monospace",
            color: r.depth === 0 ? "#C7CBD6" : "#8890A0",
            animation: `reqon-fade-up 0.5s ease both`,
            animationDelay: `${i * 90}ms`,
          }}
        >
          {r.depth === 0 ? (
            <FolderTree size={13} style={{ color: "#7C6CFF" }} />
          ) : (
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: r.dot }}
            />
          )}
          <span className="truncate">{r.label}</span>
        </div>
      ))}
    </div>
  );
}

function MethodCycleVisual() {
  const seq: Method[] = ["GET", "POST", "PUT", "DELETE"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % seq.length), 1100);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-2">
      {seq.map((m, idx) => {
        const active = idx === i;
        const s = METHOD_STYLES[m];
        return (
          <span
            key={m}
            className="text-[11px] font-semibold px-2.5 py-1.5 rounded-md transition-all duration-300"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: active ? s.text : "#4A5063",
              background: active ? s.bg : "transparent",
              boxShadow: active
                ? `inset 0 0 0 1px ${s.ring}`
                : "inset 0 0 0 1px #232838",
              transform: active ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            {m}
          </span>
        );
      })}
    </div>
  );
}

function ResponseSweepVisual() {
  const lines = [
    '"id": "usr_8f2c1a"',
    '"role": "maintainer"',
    '"active": true',
  ];
  return (
    <div
      className="relative rounded-lg px-3 py-3 overflow-hidden"
      style={{ background: "#0D0F16", border: "1px solid #1E222E" }}
    >
      <div
        className="absolute left-0 right-0 h-6 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(124,108,255,0.14), transparent)",
          animation: "reqon-sweep 2.6s ease-in-out infinite",
        }}
      />
      {lines.map((l) => (
        <div
          key={l}
          className="text-[11.5px] leading-6"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#8A93A6",
          }}
          dangerouslySetInnerHTML={{ __html: highlightJson(l) }}
        />
      ))}
    </div>
  );
}

function WebSocketPulseVisual() {
  return (
    <div className="relative flex items-center gap-3">
      <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: "rgba(192,132,252,0.35)",
            animation: "reqon-pulse-ring 1.8s ease-out infinite",
          }}
        />
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: "rgba(192,132,252,0.35)",
            animation: "reqon-pulse-ring 1.8s ease-out infinite 0.6s",
          }}
        />
        <span
          className="relative w-2.5 h-2.5 rounded-full"
          style={{ background: "#C084FC" }}
        />
      </div>
      <div className="flex flex-col gap-1 overflow-hidden h-10 justify-center">
        {["subscribe: builds", "event: connected"].map((msg, idx) => (
          <span
            key={msg}
            className="text-[10.5px] px-2 py-0.5 rounded"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#C7CBD6",
              background: "#171B24",
              animation: "reqon-float-up 3.2s ease-in-out infinite",
              animationDelay: `${idx * 1.6}s`,
            }}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}

function TeamAvatarsVisual() {
  const initials = ["MC", "RK", "JT", "+3"];
  const colors = ["#7C6CFF", "#60A5FA", "#4ADE80", "#232838"];
  return (
    <div className="flex items-center">
      {initials.map((label, i) => (
        <div
          key={label}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold border-2"
          style={{
            marginLeft: i === 0 ? 0 : -8,
            background: colors[i],
            color: label === "+3" ? "#8890A0" : "#0A0C10",
            borderColor: "#0A0C10",
            zIndex: initials.length - i,
            animation: "reqon-avatar-pop 0.4s ease both",
            animationDelay: `${i * 120}ms`,
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

function KeyPressVisual() {
  const keys = [
    { combo: ["⌘", "K"], label: "Search", delay: "0s" },
    { combo: ["⌘", "G"], label: "New request", delay: "0.5s" },
    { combo: ["⌘", "S"], label: "Save", delay: "1s" },
  ];
  return (
    <div className="flex items-center gap-5">
      {keys.map((k) => (
        <div key={k.label} className="flex flex-col items-start gap-1.5">
          <div className="flex items-center gap-1">
            {k.combo.map((c) => (
              <span
                key={c}
                className="text-[11px] font-medium w-6 h-6 rounded-md flex items-center justify-center"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#C7CBD6",
                  background: "#171B24",
                  border: "1px solid #232838",
                  animation: "reqon-key-press 2.4s ease-in-out infinite",
                  animationDelay: k.delay,
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <span className="text-[10.5px]" style={{ color: "#5B6172" }}>
            {k.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Bento grid data                                                      */
/* -------------------------------------------------------------------- */

interface BentoItem {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  title: string;
  body: string;
  visual: React.ComponentType;
  accent: string;
  span: string;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    icon: FolderTree,
    title: "Workspaces & collections",
    body: "Group requests the way your API is shaped — by service, by branch, by team. Nest folders as deep as the project needs.",
    visual: FolderTreeVisual,
    accent: "#7C6CFF",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    icon: Send,
    title: "A REST client that keeps up",
    body: "GET, POST, PUT, DELETE — params, headers, and body live side by side, and every change saves as you type.",
    visual: MethodCycleVisual,
    accent: "#4ADE80",
    span: "sm:col-span-2",
  },
  {
    icon: Braces,
    title: "Responses you can read",
    body: "Syntax-highlighted JSON, raw output, and headers in their own tabs.",
    visual: ResponseSweepVisual,
    accent: "#60A5FA",
    span: "",
  },
  {
    icon: Radio,
    title: "WebSockets, natively",
    body: "Connect, send, and watch messages arrive in a running log.",
    visual: WebSocketPulseVisual,
    accent: "#C084FC",
    span: "",
  },
  {
    icon: Users,
    title: "Built for a team",
    body: "Invite teammates into a workspace and share collections directly — everyone points at the same source of truth.",
    visual: TeamAvatarsVisual,
    accent: "#60A5FA",
    span: "sm:col-span-2",
  },
  {
    icon: Keyboard,
    title: "Fast, keyboard-first",
    body: "⌘K to search, ⌘G for a new request, ⌘S to save. Reqon stays out of the way once you know it.",
    visual: KeyPressVisual,
    accent: "#FBBF24",
    span: "sm:col-span-2",
  },
];

const METHODS: { label: Method; desc: string }[] = [
  { label: "GET", desc: "read" },
  { label: "POST", desc: "create" },
  { label: "PUT", desc: "replace" },
  { label: "DELETE", desc: "remove" },
  { label: "WS", desc: "stream" },
];

/* -------------------------------------------------------------------- */
/*  Page                                                                 */
/* -------------------------------------------------------------------- */

export default function ReqonLanding() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "#0A0C10",
        color: "#E7E9EE",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{FONT_IMPORT}</style>

      {/* ambient background texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1A1E28 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #7C6CFF 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        {/* ---------------- Nav ---------------- */}
        <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              reqon
            </span>
            <span
              className="text-lg"
              style={{
                color: "#7C6CFF",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              ()
            </span>
          </div>
          <nav
            className="hidden md:flex items-center gap-8 text-sm"
            style={{ color: "#9AA1B2" }}
          >
            <a href="#product" className="hover:text-white transition-colors">
              Product
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/anupam-kumar-krishnan/reqon"
              className="hidden sm:flex items-center gap-1.5 text-sm px-3 py-2"
              style={{ color: "#9AA1B2" }}
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="/sign-in"
              className="text-sm font-medium px-4 py-2 rounded-lg transition-transform hover:-translate-y-0.5"
              style={{ background: "#7C6CFF", color: "#0A0C10" }}
            >
              Login
            </a>
          </div>
        </header>

        {/* ---------------- Hero ---------------- */}
        <section
          id="product"
          className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <div
              className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-6"
              style={{
                color: "#B7ADFF",
                background: "rgba(124,108,255,0.1)",
                border: "1px solid rgba(124,108,255,0.25)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              now with native WebSocket testing
            </div>

            <h1
              className="text-5xl sm:text-6xl font-semibold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Fire requests.
              <br />
              Read responses.
              <br />
              <span style={{ color: "#7C6CFF" }}>Move on.</span>
            </h1>

            <p
              className="text-lg leading-relaxed mb-9 max-w-md"
              style={{ color: "#9AA1B2" }}
            >
              Reqon is the API workspace for people who'd rather ship than fight
              their tools — collections, environments, WebSockets, and a
              response viewer that doesn't get in your way.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#start"
                className="group flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-lg transition-transform hover:-translate-y-0.5"
                style={{ background: "#7C6CFF", color: "#0A0C10" }}
              >
                Start testing free
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#docs"
                className="flex items-center gap-1 text-sm font-medium px-5 py-3 rounded-lg"
                style={{ color: "#E7E9EE", border: "1px solid #232838" }}
              >
                Read the docs
                <ChevronRight size={16} />
              </a>
            </div>

            <div
              className="flex items-center gap-6 mt-10 text-xs"
              style={{ color: "#5B6172" }}
            >
              <span className="flex items-center gap-1.5">
                <Check size={14} style={{ color: "#4ADE80" }} /> Free for
                individuals
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} style={{ color: "#4ADE80" }} /> No card
                required
              </span>
            </div>
          </div>

          <LiveConsole />
        </section>

        {/* ---------------- Protocol strip ---------------- */}
        <section
          className="border-y"
          style={{ borderColor: "#161A24", background: "#0C0E13" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {METHODS.map((m) => (
              <div key={m.label} className="flex items-baseline gap-2">
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: METHOD_STYLES[m.label].text,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {m.label}
                </span>
                <span className="text-xs" style={{ color: "#5B6172" }}>
                  {m.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Features ---------------- */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-28">
          <div className="max-w-xl mb-16">
            <span
              className="text-xs font-medium tracking-wide uppercase"
              style={{
                color: "#7C6CFF",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              everything in one workspace
            </span>
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight mt-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              One client. Every protocol you actually use.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:auto-rows-[190px]">
            {BENTO_ITEMS.map((item) => {
              const Icon = item.icon;
              const Visual = item.visual;
              const large = item.span.includes("row-span-2");
              return (
                <div
                  key={item.title}
                  className={`group relative rounded-2xl p-6 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 ${item.span}`}
                  style={{
                    background:
                      "linear-gradient(160deg, #12151D 0%, #0D0F16 100%)",
                    border: "1px solid #1E222E",
                  }}
                >
                  {/* accent glow on hover */}
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
                    style={{ background: item.accent }}
                  />

                  <div className="relative flex items-center gap-2.5 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${item.accent}1F` }}
                    >
                      <Icon size={15} style={{ color: item.accent }} />
                    </div>
                    <h3
                      className="text-[15px] font-medium"
                      style={{ color: "#E7E9EE" }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <p
                    className="relative text-[13px] leading-relaxed mb-5"
                    style={{ color: "#8890A0" }}
                  >
                    {item.body}
                  </p>

                  <div className={`relative mt-auto ${large ? "pt-2" : ""}`}>
                    <Visual />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------- WebSocket spotlight ---------------- */}
        <section className="max-w-6xl mx-auto px-6 pb-28">
          <div
            className="rounded-2xl grid lg:grid-cols-2 gap-10 items-center overflow-hidden p-10"
            style={{
              background: "linear-gradient(135deg, #12151D 0%, #0D0F16 100%)",
              border: "1px solid #1E222E",
            }}
          >
            <div>
              <span
                className="text-xs font-medium tracking-wide uppercase"
                style={{
                  color: "#C084FC",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                real-time
              </span>
              <h2
                className="text-3xl font-semibold tracking-tight mt-4 mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Watch messages arrive as they happen.
              </h2>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "#8890A0" }}
              >
                Connect to any WebSocket server, send messages with JSON
                auto-validation, and scroll back through a running log of
                everything sent and received — timestamped, and one click from
                being copied.
              </p>
              <a
                href="#docs"
                className="text-sm font-medium flex items-center gap-1"
                style={{ color: "#C084FC" }}
              >
                See it in action <ChevronRight size={15} />
              </a>
            </div>

            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: "#232838", background: "#0D0F16" }}
            >
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "#1E222E" }}
              >
                <span
                  className="text-xs"
                  style={{
                    color: "#8890A0",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  wss://api.reqon.dev/live
                </span>
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    color: "#4ADE80",
                    background: "rgba(74,222,128,0.1)",
                  }}
                >
                  connected
                </span>
              </div>
              <div
                className="p-4 space-y-3 text-[12px]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <div>
                  <div
                    className="flex items-center gap-2 mb-1"
                    style={{ color: "#4ADE80" }}
                  >
                    ↙ received <span style={{ color: "#5B6172" }}>#1</span>
                  </div>
                  <div
                    className="px-3 py-2 rounded-md"
                    style={{ background: "#171B24", color: "#8A93A6" }}
                  >
                    {`{"event":"connected","channel":"deploys"}`}
                  </div>
                </div>
                <div>
                  <div
                    className="flex items-center gap-2 mb-1"
                    style={{ color: "#60A5FA" }}
                  >
                    ↗ sent <span style={{ color: "#5B6172" }}>#2</span>
                  </div>
                  <div
                    className="px-3 py-2 rounded-md"
                    style={{ background: "#171B24", color: "#8A93A6" }}
                  >
                    {`{"type":"subscribe","room":"builds"}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section className="max-w-6xl mx-auto px-6 pb-28 text-center">
          <h2
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Your next request is one keystroke away.
          </h2>
          <p
            className="text-base mb-9 max-w-md mx-auto"
            style={{ color: "#9AA1B2" }}
          >
            Set up a workspace in under a minute. Bring your own APIs, or start
            from a template.
          </p>
          <a
            href="#start"
            className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3.5 rounded-lg transition-transform hover:-translate-y-0.5"
            style={{ background: "#7C6CFF", color: "#0A0C10" }}
          >
            Start testing free
            <ArrowRight size={16} />
          </a>
        </section>

        {/* ---------------- Footer ---------------- */}
        <footer className="border-t" style={{ borderColor: "#161A24" }}>
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Reqon
              </span>
              <span className="text-xs" style={{ color: "#5B6172" }}>
                © {new Date().getFullYear()}
              </span>
            </div>
            <div
              className="flex items-center gap-6 text-xs"
              style={{ color: "#5B6172" }}
            >
              <a href="#github" className="hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

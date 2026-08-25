"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { Github } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

@keyframes reqon-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
`;

type Method = "GET" | "POST" | "PUT" | "WS";

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
  body: string;
}

const DEMO_CALLS: DemoCall[] = [
  {
    method: "GET",
    url: "/v1/users/8f2c1a",
    status: 200,
    body: `{ "name": "Maya Chen", "role": "maintainer" }`,
  },
  {
    method: "POST",
    url: "/v1/deployments",
    status: 201,
    body: `{ "id": "dep_44a9", "status": "queued" }`,
  },
  {
    method: "PUT",
    url: "/v1/flags/dark-mode",
    status: 200,
    body: `{ "flag": "dark-mode", "enabled": true }`,
  },
  {
    method: "WS",
    url: "/live/deploys",
    status: 101,
    body: `{ "event": "connected" }`,
  },
];

function MiniConsole() {
  const [index, setIndex] = useState(0);
  const [sending, setSending] = useState(true);

  useEffect(() => {
    const sendTimer = setTimeout(() => setSending(false), 500);
    const nextTimer = setTimeout(() => {
      setSending(true);
      setIndex((i) => (i + 1) % DEMO_CALLS.length);
    }, 2800);
    return () => {
      clearTimeout(sendTimer);
      clearTimeout(nextTimer);
    };
  }, [index]);

  const call = DEMO_CALLS[index];
  const style = METHOD_STYLES[call.method];

  return (
    <div className="rounded-2xl border border-[#242938] bg-[linear-gradient(180deg,#12151D_0%,#0D0F16_100%)] shadow-[0_30px_80px_-25px_rgba(0,0,0,0.7)] overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1E222E]">
        <span className="w-2 h-2 rounded-full bg-[#3A3F4D]" />
        <span className="w-2 h-2 rounded-full bg-[#3A3F4D]" />
        <span className="w-2 h-2 rounded-full bg-[#3A3F4D]" />
        <span className="ml-2 text-[10.5px] text-[#5B6172] font-['JetBrains_Mono']">
          reqon
        </span>
      </div>

      <div className="flex items-center gap-2 px-4 py-3.5">
        <span
          className="text-[11px] font-semibold px-2 py-1 rounded-md shrink-0 font-['JetBrains_Mono'] transition-colors duration-300"
          style={{
            color: style.text,
            background: style.bg,
            boxShadow: `inset 0 0 0 1px ${style.ring}`,
          }}
        >
          {call.method}
        </span>
        <span className="flex-1 text-[12px] px-2.5 py-1 rounded-md truncate bg-[#171B24] border border-[#232838] text-[#C7CBD6] font-['JetBrains_Mono']">
          {call.url}
        </span>
      </div>

      <div className="h-px bg-[#1E222E]" />

      <div className="px-4 py-3.5">
        <div className="flex items-center gap-3 text-[10.5px] font-['JetBrains_Mono'] mb-2">
          <span className="flex items-center gap-1.5 text-[#4ADE80]">
            <span
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{ background: sending ? "#5B6172" : "#4ADE80" }}
            />
            {sending ? "sending…" : `${call.status} OK`}
          </span>
        </div>
        <div
          className="text-[11.5px] font-['JetBrains_Mono'] text-[#8A93A6] truncate transition-opacity duration-200"
          style={{ opacity: sending ? 0.35 : 1 }}
        >
          {call.body}
        </div>
      </div>
    </div>
  );
}

function FloatingChip({
  method,
  className,
  delay = "0s",
}: {
  method: Method;
  className: string;
  delay?: string;
}) {
  const style = METHOD_STYLES[method];
  return (
    <span
      className={`absolute text-[11px] font-semibold px-2.5 py-1.5 rounded-md font-['JetBrains_Mono'] backdrop-blur-sm ${className}`}
      style={{
        color: style.text,
        background: style.bg,
        boxShadow: `inset 0 0 0 1px ${style.ring}`,
        animation: `reqon-float 5s ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      {method}
    </span>
  );
}

const LoginPage = () => {
  return (
    <section className="relative min-h-screen flex bg-[#0A0C10] text-[#E7E9EE] font-['Inter'] overflow-hidden">
      <style>{FONT_IMPORT}</style>

      {/* ---------------- Left: animated product panel ---------------- */}
      <div className="hidden lg:flex relative w-1/2 items-center justify-center p-16 border-r border-[#1E222E] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_1px_1px,#1A1E28_1px,transparent_1px)] bg-[length:36px_36px]" />
        <div className="pointer-events-none absolute -top-32 -left-20 w-[520px] h-[420px] rounded-full opacity-20 blur-3xl bg-[radial-gradient(circle,#7C6CFF_0%,transparent_70%)]" />

        <FloatingChip
          method="GET"
          className="top-[14%] left-[10%]"
          delay="0s"
        />
        <FloatingChip
          method="POST"
          className="top-[22%] right-[8%]"
          delay="1.2s"
        />
        <FloatingChip
          method="WS"
          className="bottom-[18%] left-[14%]"
          delay="2.1s"
        />
        <FloatingChip
          method="PUT"
          className="bottom-[26%] right-[12%]"
          delay="0.6s"
        />

        <div className="relative max-w-sm w-full">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-6 text-[#B7ADFF] bg-[#7C6CFF]/10 border border-[#7C6CFF]/25 font-['JetBrains_Mono']">
            built for shipping apis
          </div>
          <h2 className="text-3xl font-semibold tracking-tight leading-[1.15] mb-4 font-['Space_Grotesk']">
            Your requests,
            <br />
            always in reach.
          </h2>
          <p className="text-sm leading-relaxed mb-10 text-[#9AA1B2]">
            Collections, environments, and WebSockets — all saved to your
            account, synced the moment you sign in.
          </p>

          <MiniConsole />

          <div className="flex items-center gap-5 mt-8 text-[11px] font-['JetBrains_Mono'] text-[#5B6172]">
            <span>REST</span>
            <span className="w-1 h-1 rounded-full bg-[#2E3444]" />
            <span>WebSocket</span>
            <span className="w-1 h-1 rounded-full bg-[#2E3444]" />
            <span>Team workspaces</span>
          </div>
        </div>
      </div>

      {/* ---------------- Right: sign-in panel ---------------- */}
      <div className="relative flex-1 flex items-center justify-center px-6 py-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_1px_1px,#1A1E28_1px,transparent_1px)] bg-[length:36px_36px] lg:hidden" />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20 blur-3xl bg-[radial-gradient(circle,#7C6CFF_0%,transparent_70%)] lg:hidden" />

        <div className="relative w-full max-w-sm">
          {/* wordmark (mobile only — desktop already sees the left panel) */}
          <Link
            href="/"
            className="flex items-center justify-center gap-3 mb-10 group w-fit mx-auto lg:hidden"
          >
            <svg
              fill="none"
              height="36"
              viewBox="0 0 48 48"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <linearGradient
                id="c2"
                gradientUnits="userSpaceOnUse"
                x1="24"
                x2="26"
                y1=".000001"
                y2="48"
              >
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#fff" stopOpacity=".12" />
              </linearGradient>
              <clipPath id="i2">
                <rect height="48" rx="12" width="48" />
              </clipPath>
              <g clipPath="url(#i2)">
                <rect fill="#22262F" height="48" rx="12" width="48" />
                <path d="m0 0h48v48h-48z" fill="url(#c2)" />
              </g>
            </svg>
            <span className="text-xl font-semibold tracking-tight transition-colors group-hover:text-[#B7ADFF] font-['Space_Grotesk']">
              reqon
            </span>
          </Link>

          {/* card */}
          <div className="relative rounded-2xl p-8 overflow-hidden border border-[#1E222E] bg-[linear-gradient(160deg,#12151D_0%,#0D0F16_100%)] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
            <div className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-[0.15] blur-3xl bg-[#7C6CFF]" />

            <div className="relative inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-6 text-[#B7ADFF] bg-[#7C6CFF]/10 border border-[#7C6CFF]/25 font-['JetBrains_Mono']">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#4ADE80]" />
              secure sign-in
            </div>

            <h1 className="relative text-2xl font-semibold tracking-tight mb-2 font-['Space_Grotesk']">
              Welcome back
            </h1>
            <p className="relative text-sm leading-relaxed mb-8 text-[#9AA1B2]">
              Sign in to pick up where you left off — your workspaces and
              collections are right where you left them.
            </p>

            <Button
              variant="outline"
              className="relative w-full h-11 font-medium bg-[#171B24] border border-[#232838] text-[#E7E9EE] transition-colors hover:bg-[#1E2330] hover:text-white hover:border-[#2E3448]"
              onClick={() =>
                signIn.social({
                  provider: "github",
                  callbackURL: "/workspace",
                })
              }
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>

            <p className="relative text-xs leading-relaxed text-center mt-6 text-[#5B6172]">
              By continuing, you agree to Reqon's{" "}
              <a
                href="#terms"
                className="underline decoration-dotted hover:text-[#9AA1B2]"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#privacy"
                className="underline decoration-dotted hover:text-[#9AA1B2]"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <p className="text-center text-xs mt-6 text-[#5B6172]">
            <Link href="/" className="hover:text-[#9AA1B2] transition-colors">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

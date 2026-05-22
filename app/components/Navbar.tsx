"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  const targetUrl = "https://me-aryan.vercel.app/neural-graph";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/[0.05]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href={targetUrl} target="_blank" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-accent-purple to-accent-pink p-[1px] purple-glow">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-black group-hover:scale-95 transition-transform duration-300 overflow-hidden">
              <svg viewBox="0 0 100 100" className="h-full w-full p-[2px]">
                <defs>
                  <radialGradient id="logoGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="35%" stopColor="#a855f7" />
                    <stop offset="70%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="50" cy="50" rx="46" ry="18" fill="url(#logoGlow)" transform="rotate(-15 50 50)" />
                <path d="M 12 44 C 28 33, 72 33, 88 44 C 82 58, 18 58, 12 44 Z" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.85" transform="rotate(-15 50 50)" />
                <circle cx="50" cy="50" r="14" fill="#000000" stroke="#c084fc" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            BlackHole
          </span>
        </Link>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-8">
          {["Event Horizon", "Hawking Radiation", "Singularity", "Visualizer"].map((link) => (
            <Link
              key={link}
              href={targetUrl}
              target="_blank"
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-6">
          <Link
            href={targetUrl}
            target="_blank"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
          >
            Explore
          </Link>
          <Link
            href={targetUrl}
            target="_blank"
            className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-black bg-white rounded-full overflow-hidden hover:bg-white/90 active:scale-95 transition-all duration-200 group"
          >
            {/* Pulsing light effect inside button */}
            <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            Launch Visualizer
          </Link>
        </div>
      </div>
    </header>
  );
}

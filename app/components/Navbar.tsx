"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/[0.05]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-accent-purple to-accent-pink p-[1px] purple-glow">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-black text-white group-hover:scale-95 transition-transform duration-300">
              <Sparkles className="h-4 w-4 text-accent-purple group-hover:text-accent-pink transition-colors duration-300" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Reflect
          </span>
        </Link>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-8">
          {["Product", "Pricing", "Company", "Blog", "Changelog"].map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-black bg-white rounded-full overflow-hidden hover:bg-white/90 active:scale-95 transition-all duration-200 group"
          >
            {/* Pulsing light effect inside button */}
            <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            Start free trial
          </Link>
        </div>
      </div>
    </header>
  );
}

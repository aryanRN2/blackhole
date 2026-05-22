"use client";

import { useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AppMockup from "./components/AppMockup";
import BlackHoleCanvas from "./components/BlackHoleCanvas";
import LenisScroll from "./components/LenisScroll";
import { Brain, Link2, Feather, Sparkles } from "lucide-react";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Brain className="h-6 w-6 text-accent-purple" />,
      title: "Bi-directional Linking",
      desc: "Connect your ideas with links. Watch a visual neural network map grow as you write notes.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-accent-pink" />,
      title: "AI Assistant Integration",
      desc: "Directly query your thoughts. Ask Reflect to summarize articles, write emails, or synthesize ideas.",
    },
    {
      icon: <Link2 className="h-6 w-6 text-accent-cyan" />,
      title: "Seamless Integrations",
      desc: "Synchronize highlights instantly from Kindle, Readwise, pocket, or Twitter without effort.",
    },
    {
      icon: <Feather className="h-6 w-6 text-accent-blue" />,
      title: "Whisper Dictation",
      desc: "Speak your thoughts. Reflect translates audio to near-perfect markdown prose instantly.",
    },
  ];

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full min-h-[300vh] text-white overflow-hidden"
    >
      {/* Scroll handler and canvas background */}
      <LenisScroll />
      <BlackHoleCanvas scrollContainerRef={scrollContainerRef} />

      {/* Main UI layout */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Subtle grid backdrop for hero */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <Hero />
      </div>

      {/* Mockup Showcase Section */}
      <div className="relative py-20 flex items-center justify-center">
        <AppMockup />
      </div>

      {/* Features Grid Section */}
      <section id="product" className="relative max-w-7xl mx-auto px-6 py-32 z-20">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            An extension of your mind
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Reflect was built to be fast, secure, and intuitive. It mirrors the
            way you naturally think.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-2xl flex flex-col gap-4 hover:border-accent-purple/30 hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="h-12 w-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:bg-accent-purple/10 group-hover:border-accent-purple/20 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-accent-purple transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / Footer Section */}
      <section className="relative max-w-5xl mx-auto px-6 py-40 z-20 text-center">
        {/* Glow behind final CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent-purple/10 blur-[80px] pointer-events-none" />

        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-gradient">
          Start thinking in networks.
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
          Join thousands of founders, researchers, and creators using Reflect
          to capture their best ideas.
        </p>
        <button className="px-8 py-4 font-bold text-black bg-white rounded-full hover:scale-105 active:scale-95 shadow-xl hover:shadow-white/10 transition-all duration-300">
          Try Reflect free for 14 days
        </button>

        {/* Footer */}
        <footer className="mt-40 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            &copy; {new Date().getFullYear()} Reflect App. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Entrance animation for hero elements
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(
        ".hero-badge",
        { opacity: 0, scale: 0.9, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" }
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center pt-32 pb-16 px-6 text-center z-10 w-full"
    >
      {/* Pill Badge */}
      <div className="hero-badge opacity-0 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md shadow-lg mb-8 hover:border-accent-purple/50 transition-colors duration-300">
        <span className="flex h-2 w-2 rounded-full bg-accent-purple animate-pulse" />
        <span className="text-xs font-semibold text-white/80 tracking-wide flex items-center gap-1">
          ✨ New: Our AI Integration just landed
        </span>
      </div>

      {/* Main Title */}
      <h1 className="hero-title opacity-0 text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-gradient">
        Think better with Reflect
      </h1>

      {/* Subtitle */}
      <p className="hero-subtitle opacity-0 text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
        Never miss a note, idea or connection. Build your digital mind with a sleek, 
        secure, and lightning-fast networked notebook.
      </p>

      {/* CTAs */}
      <div className="hero-cta opacity-0 flex flex-col sm:flex-row items-center gap-4">
        <button className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-accent-purple to-accent-pink rounded-full hover:shadow-lg hover:shadow-accent-purple/20 hover:scale-[1.02] active:scale-95 transition-all duration-300">
          Start free trial
          <ArrowRight className="h-4 w-4" />
        </button>
        <button className="flex items-center gap-2 px-6 py-3 font-semibold text-white/80 hover:text-white rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
          <Play className="h-4 w-4 fill-white/20 text-white/60" />
          Watch video
        </button>
      </div>
    </section>
  );
}

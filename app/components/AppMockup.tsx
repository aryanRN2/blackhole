"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Search, 
  FileText, 
  Network, 
  Calendar, 
  Plus, 
  Hash, 
  BookOpen, 
  Compass, 
  Settings,
  ChevronRight,
  User
} from "lucide-react";

export default function AppMockup() {
  const mockupRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>("Black Holes");

  const nodes = [
    { id: "Black Holes", x: 120, y: 110, size: 10, color: "#a855f7" },
    { id: "Hawking Radiation", x: 260, y: 60, size: 8, color: "#ec4899" },
    { id: "Information Paradox", x: 220, y: 170, size: 8, color: "#3b82f6" },
    { id: "Quantum Mechanics", x: 60, y: 190, size: 7, color: "#06b6d4" },
    { id: "General Relativity", x: 50, y: 60, size: 7, color: "#f59e0b" },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
    { from: 0, to: 4 },
    { from: 1, to: 2 },
    { from: 3, to: 4 },
  ];

  useEffect(() => {
    if (!mockupRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // 3D tilt & zoom on scroll
    const tween = gsap.fromTo(
      mockupRef.current,
      {
        transform: "perspective(1500px) rotateX(12deg) translateY(40px) scale(0.92)",
        opacity: 0.85,
      },
      {
        transform: "perspective(1500px) rotateX(0deg) translateY(0) scale(1.02)",
        opacity: 1,
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top bottom-=100",
          end: "center center+=100",
          scrub: 1,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-20 z-20 relative">
      <div
        ref={mockupRef}
        className="glass-card rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-xs font-mono text-white/30 tracking-widest uppercase">
            reflect.app/physics-notes
          </div>
          <div className="w-12" /> {/* spacer */}
        </div>

        {/* Inner App Interface */}
        <div className="flex h-[550px] bg-black/60 text-white/90">
          {/* Sidebar */}
          <aside className="w-56 border-r border-white/[0.05] bg-black/30 flex flex-col justify-between p-4 hidden sm:flex">
            <div>
              {/* Profile */}
              <div className="flex items-center gap-2 mb-6 px-1">
                <div className="h-6 w-6 rounded-full bg-accent-purple/20 flex items-center justify-center border border-accent-purple/30">
                  <User className="h-3.5 w-3.5 text-accent-purple" />
                </div>
                <span className="text-xs font-semibold text-white/80">
                  Dr. Stephen H.
                </span>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/30" />
                <input
                  type="text"
                  placeholder="Quick Search (⌘K)"
                  className="w-full bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] text-xs py-2 pl-9 pr-3 rounded-md outline-none text-white/60 focus:text-white transition-all duration-200"
                  readOnly
                />
              </div>

              {/* Main Links */}
              <div className="flex flex-col gap-1 mb-6">
                <button className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-xs bg-white/[0.05] text-white font-medium transition-colors">
                  <FileText className="h-4 w-4 text-accent-purple" />
                  Notes
                </button>
                <button className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-xs text-white/50 hover:text-white/80 hover:bg-white/[0.02] transition-colors">
                  <Calendar className="h-4 w-4" />
                  Daily Notes
                </button>
                <button className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-xs text-white/50 hover:text-white/80 hover:bg-white/[0.02] transition-colors">
                  <Network className="h-4 w-4" />
                  Graph View
                </button>
              </div>

              {/* Folders/Tags */}
              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/30 px-2 block mb-2">
                  Tags
                </span>
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 px-2 py-1 rounded-md text-xs text-white/50 hover:bg-white/[0.02] cursor-pointer">
                    <Hash className="h-3.5 w-3.5 text-accent-pink" />
                    physics
                  </span>
                  <span className="flex items-center gap-2 px-2 py-1 rounded-md text-xs text-white/50 hover:bg-white/[0.02] cursor-pointer">
                    <Hash className="h-3.5 w-3.5 text-accent-blue" />
                    cosmology
                  </span>
                  <span className="flex items-center gap-2 px-2 py-1 rounded-md text-xs text-white/50 hover:bg-white/[0.02] cursor-pointer">
                    <Hash className="h-3.5 w-3.5 text-accent-cyan" />
                    ideas
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70">
                <Settings className="h-4 w-4" />
                Settings
              </button>
            </div>
          </aside>

          {/* Main Editor Pane */}
          <main className="flex-1 flex flex-col p-6 overflow-y-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-white/30 mb-6">
              <span>All Notes</span>
              <ChevronRight className="h-3 w-3" />
              <span>Cosmology</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">Black Hole Information Paradox</span>
            </div>

            {/* Document Title */}
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
              Black Hole Thermodynamics
            </h2>

            {/* Body Editor */}
            <div className="space-y-4 text-sm text-white/75 leading-relaxed font-sans max-w-2xl">
              <p>
                In general relativity, a <span className="bg-accent-purple/10 text-accent-purple px-1.5 py-0.5 rounded border border-accent-purple/20 cursor-pointer font-medium">[[Black Hole]]</span> is defined by three quantities: mass, charge, and angular momentum.
              </p>
              <p>
                However, when quantum mechanics is integrated, Stephen Hawking showed that black holes emit thermal radiation, now known as <span className="bg-accent-pink/10 text-accent-pink px-1.5 py-0.5 rounded border border-accent-pink/20 cursor-pointer font-medium">[[Hawking Radiation]]</span>. This leads to the famous <span className="bg-accent-blue/10 text-accent-blue px-1.5 py-0.5 rounded border border-accent-blue/20 cursor-pointer font-medium">[[Information Paradox]]</span>: if a black hole evaporates, what happens to the physical information stored inside it?
              </p>
              <p>
                This boundary lies at the intersection of <span className="bg-accent-cyan/10 text-accent-cyan px-1.5 py-0.5 rounded border border-accent-cyan/20 cursor-pointer font-medium">[[Quantum Mechanics]]</span> and Einstein's Theory of Gravity.
              </p>
            </div>
          </main>

          {/* Connected Graph Overlay Panel (Floating) */}
          <div className="w-80 border-l border-white/[0.05] bg-black/40 p-4 flex flex-col justify-between hidden lg:flex">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
                  Connection Graph
                </span>
                <span className="text-[10px] font-mono text-accent-purple bg-accent-purple/15 px-1.5 py-0.5 rounded">
                  Live View
                </span>
              </div>

              {/* Graphic Visual Representation */}
              <div className="h-60 rounded-xl bg-[#09090b]/80 border border-white/[0.03] relative overflow-hidden flex items-center justify-center p-2">
                {/* Grid backdrop */}
                <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

                {/* SVG Connections and Nodes */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Connection Lines */}
                  {connections.map((conn, idx) => {
                    const fromNode = nodes[conn.from];
                    const toNode = nodes[conn.to];
                    const isSelected = activeNode === fromNode.id || activeNode === toNode.id;
                    return (
                      <line
                        key={idx}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={isSelected ? "url(#pulseGrad)" : "rgba(255, 255, 255, 0.08)"}
                        strokeWidth={isSelected ? 1.5 : 1}
                        className={isSelected ? "animate-pulse" : ""}
                      />
                    );
                  })}
                  
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Nodes rendering */}
                {nodes.map((node) => {
                  const isActive = activeNode === node.id;
                  return (
                    <div
                      key={node.id}
                      className="absolute cursor-pointer flex flex-col items-center group"
                      style={{ left: `${node.x}px`, top: `${node.y}px`, transform: "translate(-50%, -50%)" }}
                      onClick={() => setActiveNode(node.id)}
                    >
                      {/* Outer Ring */}
                      <div
                        className="rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          width: `${node.size * 2 + 10}px`,
                          height: `${node.size * 2 + 10}px`,
                          backgroundColor: isActive ? `${node.color}15` : "transparent",
                          border: isActive ? `1px solid ${node.color}` : "1px solid rgba(255,255,255,0.15)",
                          boxShadow: isActive ? `0 0 15px ${node.color}50` : "none",
                        }}
                      >
                        {/* Dot */}
                        <div
                          className="rounded-full transition-transform duration-300 group-hover:scale-125"
                          style={{
                            width: `${node.size}px`,
                            height: `${node.size}px`,
                            backgroundColor: node.color,
                          }}
                        />
                      </div>
                      
                      {/* Tooltip Label */}
                      <span
                        className="text-[9px] font-sans mt-1.5 whitespace-nowrap bg-black/80 px-1 py-0.5 rounded border border-white/5 transition-opacity duration-200"
                        style={{
                          opacity: isActive ? 1 : 0.4,
                          color: isActive ? "white" : "rgba(255,255,255,0.6)"
                        }}
                      >
                        {node.id}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Tag/Backlinks stats */}
              <div className="mt-4 space-y-3">
                <div className="text-xs">
                  <span className="text-white/40 block mb-1">Active Backlinks</span>
                  <span className="font-semibold text-white/90 text-sm">{activeNode}</span>
                </div>
                <div className="text-[11px] text-white/50 leading-relaxed bg-white/[0.02] border border-white/[0.05] rounded-lg p-2.5">
                  {activeNode === "Black Holes" && "Connected to Hawking Radiation, Information Paradox, Quantum Mechanics and General Relativity."}
                  {activeNode === "Hawking Radiation" && "Connected to Black Holes and Information Paradox. Discusses thermodynamic attributes."}
                  {activeNode === "Information Paradox" && "Connected to Black Holes and Hawking Radiation. Details unitary conservation laws."}
                  {activeNode === "Quantum Mechanics" && "Connected to Black Holes and General Relativity. Deals with subatomic particle spin."}
                  {activeNode === "General Relativity" && "Connected to Black Holes and Quantum Mechanics. Deals with gravity and mass curvature."}
                </div>
              </div>
            </div>

            {/* Backlink footer */}
            <div className="text-[10px] text-white/30 flex items-center justify-between border-t border-white/[0.05] pt-3">
              <span>5 nodes indexed</span>
              <span>12 connections</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

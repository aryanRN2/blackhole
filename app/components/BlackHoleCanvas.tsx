"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BlackHoleCanvas({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    if (!video) return;

    // Fade in once video metadata has loaded
    const handleCanPlay = () => {
      setLoaded(true);
    };

    if (video.readyState >= 3) {
      setLoaded(true);
    } else {
      video.addEventListener("canplay", handleCanPlay);
    }

    const triggerEl = scrollContainerRef.current || document.body;

    // Create GSAP ScrollTrigger animation for the video scale, rotation, and opacity
    const scrollAnimation = gsap.fromTo(
      video,
      {
        scale: 1,
        rotate: 0,
        opacity: 0.65,
      },
      {
        scale: 1.3,
        rotate: 15,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      scrollAnimation.scrollTrigger?.kill();
      scrollAnimation.kill();
    };
  }, [scrollContainerRef]);

  return (
    <>
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 z-0 h-screen w-screen object-cover bg-[#050505] pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: loaded ? 0.65 : 0,
          filter: "blur(1.5px) contrast(1.15) saturate(1.1)",
        }}
      >
        <source src="/blackhole.mp4" type="video/mp4" />
      </video>

      {/* Radial overlay to blend video edges and hide compression noise */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 15%, rgba(5, 5, 5, 0.45) 45%, rgba(5, 5, 5, 0.85) 75%, #050505 95%)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      />

      {/* Subtle organic film grain texture to prevent banding */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: loaded ? 0.035 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      />
    </>
  );
}

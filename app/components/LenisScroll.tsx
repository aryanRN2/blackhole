"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisScroll() {
  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Update ScrollTrigger on Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    // Integrate Lenis with GSAP's ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000); // Lenis uses milliseconds for time
    };
    gsap.ticker.add(updateTicker);

    // Disable GSAP ticker lag smoothing for smoother synchronization
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return null;
}

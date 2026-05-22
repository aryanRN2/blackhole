"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BlackHoleCanvas({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameIndexRef = useRef(0);

  // Total frames: 240
  const totalFrames = 240;

  // Render a specific frame on the canvas
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      drawX = 0;
      drawY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      drawX = (canvasWidth - drawWidth) / 2;
      drawY = 0;
    }

    // Set high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    currentFrameIndexRef.current = index;
  };

  useEffect(() => {
    // Preload all 240 images
    let loadedCount = 0;
    const tempImages: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / totalFrames) * 100);
      setProgress(currentProgress);

      if (loadedCount === totalFrames) {
        imagesRef.current = tempImages;
        console.log("All frames loaded successfully. Preloading complete.");
        setLoaded(true);
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.onload = handleImageLoad;
      img.onerror = () => {
        console.error(`Failed to load frame ${frameNum}`);
        handleImageLoad(); // Still count to avoid hanging
      };
      img.src = `/blackhole/ezgif-frame-${frameNum}.jpg`;
      tempImages.push(img);
    }
  }, []);

  // Set up resize listener and GSAP ScrollTrigger once loaded
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle resizing (high-DPI sharp rendering)
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      // Re-render current frame on resize
      renderFrame(currentFrameIndexRef.current);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing

    // Render initial frame
    renderFrame(0);

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const animationObj = { frame: 0 };
    const triggerEl = scrollContainerRef.current || document.body;

    // Create a ScrollTrigger animation that links scroll depth to frames
    const tween = gsap.to(animationObj, {
      frame: totalFrames - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: triggerEl,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
      onUpdate: () => {
        const currentFrame = Math.min(
          totalFrames - 1,
          Math.max(0, Math.floor(animationObj.frame))
        );
        renderFrame(currentFrame);
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [loaded, scrollContainerRef]);

  return (
    <>
      {/* Sleek Loader Overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <div className="relative flex flex-col items-center">
            {/* Pulsing Glow Ring */}
            <div className="absolute -inset-10 rounded-full bg-accent-purple/10 blur-xl animate-pulse" />
            <div className="h-24 w-24 rounded-full border border-white/5 border-t-accent-purple animate-spin" />

            {/* Reflect Logo & Progress */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold tracking-widest text-white">REFLECT</span>
              <span className="text-xs font-mono text-accent-purple mt-1">{progress}%</span>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-sm tracking-[0.2em] font-medium text-white/50 uppercase">
              Loading Experience
            </h2>
            <p className="text-xs font-mono text-white/30 mt-2">
              Initializing gravitational space-time engine
            </p>
          </div>
        </div>
      )}

      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 h-screen w-screen object-cover bg-[#050505] pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: loaded ? 0.65 : 0,
          filter: "blur(2.5px) contrast(1.15) saturate(1.1)",
        }}
      />

      {/* Radial overlay to blend canvas edges and hide low-res JPEG artifacts */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 15%, rgba(5, 5, 5, 0.45) 45%, rgba(5, 5, 5, 0.85) 75%, #050505 95%)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      />

      {/* Subtle organic film grain texture to prevent banding and mask pixelation */}
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

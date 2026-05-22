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
        setLoaded(true);
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/blackhole/ezgif-frame-${frameNum}.jpg`;
      img.onload = handleImageLoad;
      img.onerror = () => {
        console.error(`Failed to load frame ${frameNum}`);
        handleImageLoad(); // Still count to avoid hanging
      };
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
      scrollTrigger: {
        trigger: triggerEl,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: () => {
          const currentFrame = Math.min(
            totalFrames - 1,
            Math.max(0, Math.floor(animationObj.frame))
          );
          renderFrame(currentFrame);
        },
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
        className="fixed inset-0 -z-10 h-screen w-screen object-cover bg-[#050505] pointer-events-none transition-opacity duration-1000"
        style={{ opacity: loaded ? 0.7 : 0 }}
      />
    </>
  );
}

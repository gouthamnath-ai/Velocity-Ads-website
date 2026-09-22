import React, { useEffect, useRef } from "react";

export interface HalideLandingProps {
  title?: React.ReactNode;
  brandText?: string;
  latitudeText?: string;
  focalText?: string;
  archiveText?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  layers?: string[];
  className?: string;
}

export const DEFAULT_LAYERS = [
  "https://cdn.21st.dev/assets/mirror/e5/e5ef2d30267a4e7f81bc0a61283385f0e59c348d8e69a017f1a87b5323fd8abc.jpg",
  "https://cdn.21st.dev/assets/mirror/80/80f63f867cb6db0e217d01b6b23e0d623b38d7791dc6a5c6b647744541e4f71d.jpg",
  "https://cdn.21st.dev/assets/mirror/59/597353f775e864ce7ab427b39deecf97b8de0560e30cb3749da756c896a17023.jpg",
];

export function HalideLanding({
  title = (
    <>
      <span className="text-white">VELOCITY </span>
      <span className="text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">ADS</span>
    </>
  ),
  brandText = "HALIDE_CORE",
  latitudeText = "LATITUDE: 34.0522° N",
  focalText = "FOCAL DEPTH: 80MM",
  archiveText = "[ ARCHIVE 2026 ] SURFACE TENSION & TOPOGRAPHICAL LIGHT",
  ctaText = "EXPLORE DEPTH",
  onCtaClick,
  layers = DEFAULT_LAYERS,
  className = "",
}: HalideLandingProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse Parallax Logic
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;

      // Rotate the 3D Canvas
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;

      // Apply depth shift to layers
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 20;
        const moveX = x * (index + 1) * 0.25;
        const moveY = y * (index + 1) * 0.25;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Entrance Animation
    canvas.style.opacity = "0";
    canvas.style.transform = "rotateX(90deg) rotateZ(0deg) scale(0.8)";

    const timeout = setTimeout(() => {
      canvas.style.transition = "all 2.5s cubic-bezier(0.16, 1, 0.3, 1)";
      canvas.style.opacity = "1";
      canvas.style.transform = "rotateX(55deg) rotateZ(-25deg) scale(1)";
    }, 300);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden bg-[#0a0a0a] text-[#e0e0e0] font-mono h-screen w-full flex items-center justify-center ${className}`}>
      {/* SVG Filter for Grain */}
      <svg className="absolute w-0 h-0">
        <filter id="halideGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <div className="fixed inset-0 pointer-events-none z-50 opacity-15 [filter:url(#halideGrain)]" />

      {/* Interface Grid HUD Overlay */}
      <div className="fixed inset-0 p-8 sm:p-16 grid grid-cols-2 grid-rows-[auto_1fr_auto] z-10 pointer-events-none">
        <div className="font-extrabold text-sm tracking-widest text-white">{brandText}</div>
        <div className="text-right font-mono text-xs text-[#ff3c00] space-y-1">
          <div>{latitudeText}</div>
          <div>{focalText}</div>
        </div>

        <h1 className="col-span-2 self-center font-sans font-black text-6xl sm:text-8xl md:text-9xl leading-[0.85] tracking-tight mix-blend-difference uppercase">
          {title}
        </h1>

        <div className="col-span-2 flex justify-between items-end">
          <div className="font-mono text-xs text-neutral-400 max-w-sm uppercase">
            <p>{archiveText}</p>
          </div>
          <button
            onClick={onCtaClick}
            className="pointer-events-auto bg-[#e0e0e0] text-[#0a0a0a] px-8 py-4 font-bold text-sm hover:bg-[#ff3c00] hover:text-white transition-all [clip-path:polygon(0_0,100%_0,100%_70%,85%_100%,0_100%)] hover:-translate-y-1 shadow-2xl"
          >
            {ctaText}
          </button>
        </div>
      </div>

      {/* 3D Viewport & Layers */}
      <div className="[perspective:2000px] w-full h-full flex items-center justify-center overflow-hidden">
        <div
          ref={canvasRef}
          className="relative w-[340px] h-[220px] sm:w-[800px] sm:h-[500px] [transform-style:preserve-3d] transition-transform duration-700 ease-out"
        >
          {layers.map((src, idx) => (
            <div
              key={idx}
              ref={(el) => (layersRef.current[idx] = el!)}
              className="absolute inset-0 border border-white/10 bg-cover bg-center transition-transform duration-500 ease-out"
              style={{
                backgroundImage: `url('${src}')`,
                filter:
                  idx === 0
                    ? "grayscale(1) contrast(1.2) brightness(0.5)"
                    : idx === 1
                    ? "grayscale(1) contrast(1.1) brightness(0.7)"
                    : "grayscale(1) contrast(1.3) brightness(0.8)",
                opacity: idx === 0 ? 1 : idx === 1 ? 0.6 : 0.4,
                mixBlendMode: idx === 1 ? "screen" : idx === 2 ? "overlay" : "normal",
              }}
            />
          ))}

          {/* Topographical Contour Radial Overlay */}
          <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[repeating-radial-gradient(circle_at_50%_50%,transparent_0,transparent_40px,rgba(255,255,255,0.05)_41px,transparent_42px)] [transform:translateZ(120px)] pointer-events-none" />
        </div>
      </div>

      {/* Animated Scroll Hint Line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[1px] h-[60px] bg-gradient-to-b from-[#e0e0e0] to-transparent animate-pulse" />
    </div>
  );
}

export default HalideLanding;

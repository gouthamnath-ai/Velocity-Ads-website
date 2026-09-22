import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface MetroHeroProps {
  title?: React.ReactNode;
  subtitle?: string;
  badge?: string;
  videoSrc?: string;
  posterSrc?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export function MetroHero({
  title = (
    <>
      High-Velocity Ads <br />
      <span className="bg-gradient-to-r from-lime-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
        Driven By Motion
      </span>
    </>
  ),
  subtitle = "Experience scroll-locked video dynamics, 3D visual depth, and Apple-grade performance creative built for Velocity Ads.",
  badge = "METRO VIDEO HERO &bull; VELOCITYADS.IN",
  videoSrc = "assets/vid1.mp4",
  posterSrc = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/767d99bb371a54d0d36751e8cecae43c.jpg",
  ctaPrimaryText = "Start a Project",
  ctaSecondaryText = "Explore Work",
  onPrimaryClick,
  onSecondaryClick,
  className = "",
}: MetroHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const videoScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.05, 1.25]);
  const videoRotateX = useTransform(smoothProgress, [0, 0.5, 1], [15, 0, -10]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.2]);
  const textY = useTransform(smoothProgress, [0, 0.5], [0, -100]);

  return (
    <div
      ref={containerRef}
      className={`relative h-[250vh] w-full bg-black text-white ${className}`}
    >
      {/* Sticky Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Glow & Metro Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e15_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-lime-500/10 blur-[140px] rounded-full" />

        {/* Scroll-Locked Video Container */}
        <motion.div
          style={{
            scale: videoScale,
            rotateX: videoRotateX,
            opacity: opacity,
            perspective: 1200,
          }}
          className="relative w-[90%] max-w-5xl h-[60vh] rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl shadow-lime-500/10"
        >
          {/* Video or Image Stream */}
          <video
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transform-gpu"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </motion.div>

        {/* Overlay Content */}
        <motion.div
          style={{ y: textY }}
          className="absolute z-20 max-w-4xl text-center px-6 flex flex-col items-center"
        >
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lime-400/40 bg-lime-400/10 text-lime-400 font-mono text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
              {badge}
            </div>
          )}

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white drop-shadow-2xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed drop-shadow">
              {subtitle}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {ctaPrimaryText && (
              <button
                onClick={onPrimaryClick}
                className="px-8 py-4 rounded-full bg-lime-400 text-black font-bold text-sm tracking-wide hover:bg-lime-300 transition-all shadow-xl shadow-lime-400/25 hover:scale-105"
              >
                {ctaPrimaryText}
              </button>
            )}
            {ctaSecondaryText && (
              <button
                onClick={onSecondaryClick}
                className="px-8 py-4 rounded-full border border-white/20 bg-white/10 text-white font-semibold text-sm tracking-wide hover:border-lime-400/50 hover:bg-lime-400/10 hover:text-lime-400 backdrop-blur-md transition-all"
              >
                {ctaSecondaryText}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function DemoOne() {
  return <MetroHero />;
}

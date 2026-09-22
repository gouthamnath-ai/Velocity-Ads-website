import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const CDN = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev";

export interface StreamImage {
  src: string;
  alt: string;
}

export const DEFAULT_IMAGES: StreamImage[] = [
  {
    src: `${CDN}/stock-images/767d99bb371a54d0d36751e8cecae43c.jpg`,
    alt: "Diver silhouetted inside a sunset seascape shaped like a profile",
  },
  {
    src: `${CDN}/gradients/hero_gradient/hero-gradients-01.png`,
    alt: "Soft multi-tone gradient wash",
  },
  {
    src: `${CDN}/stock-images/821d815affa6496c39cbdeeec7a84603.jpg`,
    alt: "Double-exposure portrait blended with a city skyline at dusk",
  },
  {
    src: `${CDN}/gradients/crimson_aura/crimson-aura-02.png`,
    alt: "Crimson aura gradient",
  },
  {
    src: `${CDN}/stock-images/937438c560ada1c83317f2c11b3454b0.jpg`,
    alt: "Motion-blurred side-profile portrait against a deep orange backdrop",
  },
  {
    src: `${CDN}/gradients/hue-flow/hue-flow-01.png`,
    alt: "Flowing hue gradient",
  },
  {
    src: `${CDN}/stock-images/98f89cb9994f5c382ab964062c4039db.jpg`,
    alt: "Figure holding a racket that dissolves into a swirling colourful cloud",
  },
  {
    src: `${CDN}/gradients/moon/moon-grade-03.png`,
    alt: "Moon-toned gradient",
  },
  {
    src: `${CDN}/stock-images/ddcbee38be8b7274e19e132d7ab35b53.jpg`,
    alt: "Hand gesture with a colourful cutout of a bird flying through the fingers",
  },
  {
    src: `${CDN}/gradients/hero_gradient/hero-gradients-03.png`,
    alt: "Layered hero gradient",
  },
  {
    src: `${CDN}/gradients/hue-flow/hue-flow-02.png`,
    alt: "Second flowing hue gradient",
  },
  {
    src: `${CDN}/gradients/moon/moon-grade-05.png`,
    alt: "Deep moon-toned gradient",
  },
];

interface ImageStreamHeroProps {
  images?: StreamImage[];
  className?: string;
  children?: React.ReactNode;
}

export function ImageStreamHero({
  images = DEFAULT_IMAGES,
  className = "",
  children,
}: ImageStreamHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const row1X = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const row2X = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);
  const row3X = useTransform(smoothProgress, [0, 1], ["-10%", "-50%"]);
  const rotateX = useTransform(smoothProgress, [0, 1], [15, 5]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.05]);

  const row1 = images.slice(0, 4);
  const row2 = images.slice(4, 8);
  const row3 = images.slice(8, 12);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-background perspective-1000 ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* Background Lighting Gradients */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(192,254,4,0.08),transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-b from-lime-500/10 via-cyan-500/5 to-transparent blur-3xl" />

      {/* 3D Image Corridor Container */}
      <motion.div
        style={{ rotateX, scale }}
        className="relative z-0 flex flex-col gap-6 pt-12 pb-16 transform-gpu"
      >
        {/* Row 1 */}
        <motion.div style={{ x: row1X }} className="flex gap-6 min-w-max">
          {[...row1, ...row1, ...row1].map((img, idx) => (
            <div
              key={`r1-${idx}`}
              className="group relative h-48 w-80 sm:h-56 sm:w-96 overflow-hidden rounded-xl border border-white/10 bg-neutral-900/60 shadow-2xl backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-lime-400/50 hover:shadow-lime-500/20"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                <span className="text-xs font-mono tracking-widest text-lime-400 uppercase">
                  {img.alt.slice(0, 32)}...
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div style={{ x: row2X }} className="flex gap-6 min-w-max">
          {[...row2, ...row2, ...row2].map((img, idx) => (
            <div
              key={`r2-${idx}`}
              className="group relative h-48 w-80 sm:h-56 sm:w-96 overflow-hidden rounded-xl border border-white/10 bg-neutral-900/60 shadow-2xl backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-cyan-400/50 hover:shadow-cyan-500/20"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                  {img.alt.slice(0, 32)}...
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div style={{ x: row3X }} className="flex gap-6 min-w-max">
          {[...row3, ...row3, ...row3].map((img, idx) => (
            <div
              key={`r3-${idx}`}
              className="group relative h-48 w-80 sm:h-56 sm:w-96 overflow-hidden rounded-xl border border-white/10 bg-neutral-900/60 shadow-2xl backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-lime-400/50 hover:shadow-lime-500/20"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                <span className="text-xs font-mono tracking-widest text-lime-400 uppercase">
                  {img.alt.slice(0, 32)}...
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Top & Bottom Vignette Overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* Hero Overlay Content */}
      {children}
    </div>
  );
}

export default function DemoOne() {
  return (
    <ImageStreamHero
      images={DEFAULT_IMAGES}
      className="h-[650px] w-full border-b border-white/10 bg-black"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-lime-400 backdrop-blur-md mb-6">
          <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
          Velocity Ads &bull; velocityads.in
        </div>
        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
          Your work, <br />
          <span className="bg-gradient-to-r from-lime-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
            front and centre.
          </span>
        </h1>
        <p className="mt-6 max-w-lg text-balance text-sm sm:text-base text-neutral-400">
          A high-velocity ad hero that leads with visuals. Swap in your campaign assets and watch the visual corridor rebuild around your brand.
        </p>
      </div>
    </ImageStreamHero>
  );
}

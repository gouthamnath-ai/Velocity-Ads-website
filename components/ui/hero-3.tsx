import React from "react";
import { motion } from "framer-motion";

export const DEMO_IMAGES = [
  "https://cdn.21st.dev/assets/mirror/9c/9c0892e59c262cc1da34c88d977221da3f36aaef35ede7924d66b80c219be979.jpg",
  "https://cdn.21st.dev/assets/mirror/cb/cb5e5ebf2a894b2cd0e47b41b1fc76a3021ca1e2d2164e68aedca123cd33144f.jpg",
  "https://cdn.21st.dev/assets/mirror/98/989f6e3fb1763ee781695ca8471c7b5c34ee8162b73cb966a692df7183434dd6.jpg",
  "https://cdn.21st.dev/assets/mirror/d4/d42e2bf7d2616d0f8b7133f77efbc40bfbd042fbe5dd5e2ae3bb0b0cd5bf0b00.jpg",
  "https://cdn.21st.dev/assets/mirror/34/34ec840fc286ece83ac48705cb38c8b7bfae31022d3869530edad1e1b1305933.jpg",
  "https://cdn.21st.dev/assets/mirror/3a/3ad7469aaf0ee239cd4a79d5cbd089e88ee36def81eff12b76288139985a8bea.jpg",
  "https://cdn.21st.dev/assets/mirror/82/82d335fc097e30d74dc1b664327e735c0c2c01f807575623c72e2379f3bb3ae6.jpg",
  "https://cdn.21st.dev/assets/mirror/d5/d55bd9d62a8a40170fdb1bab434888bb28c9f11cf7d20bd6dcbe3befe8077abe.jpg",
  "https://cdn.21st.dev/assets/mirror/9c/9c0892e59c262cc1da34c88d977221da3f36aaef35ede7924d66b80c219be979.jpg",
  "https://cdn.21st.dev/assets/mirror/cb/cb5e5ebf2a894b2cd0e47b41b1fc76a3021ca1e2d2164e68aedca123cd33144f.jpg",
  "https://cdn.21st.dev/assets/mirror/98/989f6e3fb1763ee781695ca8471c7b5c34ee8162b73cb966a692df7183434dd6.jpg",
  "https://cdn.21st.dev/assets/mirror/d4/d42e2bf7d2616d0f8b7133f77efbc40bfbd042fbe5dd5e2ae3bb0b0cd5bf0b00.jpg",
  "https://cdn.21st.dev/assets/mirror/34/34ec840fc286ece83ac48705cb38c8b7bfae31022d3869530edad1e1b1305933.jpg",
  "https://cdn.21st.dev/assets/mirror/3a/3ad7469aaf0ee239cd4a79d5cbd089e88ee36def81eff12b76288139985a8bea.jpg",
  "https://cdn.21st.dev/assets/mirror/82/82d335fc097e30d74dc1b664327e735c0c2c01f807575623c72e2379f3bb3ae6.jpg",
  "https://cdn.21st.dev/assets/mirror/d5/d55bd9d62a8a40170fdb1bab434888bb28c9f11cf7d20bd6dcbe3befe8077abe.jpg",
];

export interface AnimatedMarqueeHeroProps {
  tagline?: string;
  title?: React.ReactNode;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  images?: string[];
}

export function AnimatedMarqueeHero({
  tagline = "Join over 100,000 happy creators",
  title = (
    <>
      Engage Audiences
      <br />
      with Stunning Videos
    </>
  ),
  description = "Boost Your Brand with High-Impact Short Videos from our expert content creators. Our team is ready to propel your business forward.",
  ctaText = "Get Started",
  onCtaClick,
  images = DEMO_IMAGES,
}: AnimatedMarqueeHeroProps) {
  const row1 = images.slice(0, 8);
  const row2 = images.slice(8, 16);

  return (
    <div className="relative overflow-hidden bg-black text-white pt-24 pb-16 min-h-screen flex flex-col justify-between">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-lime-500/10 blur-[120px] rounded-full" />

      {/* Hero Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-8 pb-12 flex flex-col items-center">
        {tagline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
            {tagline}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {ctaText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-lime-400 text-black font-bold text-base hover:bg-lime-300 transition-all shadow-lg shadow-lime-400/20 hover:scale-105"
            >
              <span>{ctaText}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>

      {/* Marquee Image Rows */}
      <div className="relative z-10 w-full overflow-hidden mt-6 space-y-6">
        {/* Row 1 */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex gap-6 min-w-max"
        >
          {[...row1, ...row1, ...row1].map((src, i) => (
            <div
              key={`h3-r1-${i}`}
              className="h-44 w-72 sm:h-52 sm:w-88 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-xl group hover:border-lime-400/50 transition-all duration-300"
            >
              <img
                src={src}
                alt={`Hero Marquee ${i}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          className="flex gap-6 min-w-max"
        >
          {[...row2, ...row2, ...row2].map((src, i) => (
            <div
              key={`h3-r2-${i}`}
              className="h-44 w-72 sm:h-52 sm:w-88 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-xl group hover:border-cyan-400/50 transition-all duration-300"
            >
              <img
                src={src}
                alt={`Hero Marquee reverse ${i}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function AnimatedHeroDemo() {
  return (
    <AnimatedMarqueeHero
      tagline="Join over 100,000 happy creators"
      title={
        <>
          Engage Audiences
          <br />
          with Stunning Videos
        </>
      }
      description="Boost Your Brand with High-Impact Short Videos from our expert content creators. Our team is ready to propel your business forward."
      ctaText="Get Started"
      images={DEMO_IMAGES}
    />
  );
}

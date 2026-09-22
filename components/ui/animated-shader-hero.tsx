import React, { useEffect, useRef } from "react";

export interface TrustBadgeProps {
  text: string;
  icons?: string[];
}

export interface HeadlineProps {
  line1: string;
  line2: string;
}

export interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export interface HeroProps {
  trustBadge?: TrustBadgeProps;
  headline?: HeadlineProps;
  subtitle?: string;
  buttons?: {
    primary?: ButtonProps;
    secondary?: ButtonProps;
  };
  className?: string;
}

export function AnimatedShaderHero({
  trustBadge = {
    text: "Trusted by forward-thinking teams.",
    icons: ["✨"],
  },
  headline = {
    line1: "Launch Your",
    line2: "Workflow Into Orbit",
  },
  subtitle = "Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless, and limitless.",
  buttons = {
    primary: { text: "Get Started for Free" },
    secondary: { text: "Explore Features" },
  },
  className = "",
}: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      time += 0.015;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Deep space backdrop
      ctx.fillStyle = "#04040a";
      ctx.fillRect(0, 0, width, height);

      // Animated WebGL Shader Wave Layers
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        if (i === 0) {
          gradient.addColorStop(0, "rgba(192, 254, 4, 0.15)");
          gradient.addColorStop(1, "rgba(0, 245, 255, 0.05)");
        } else if (i === 1) {
          gradient.addColorStop(0, "rgba(0, 245, 255, 0.12)");
          gradient.addColorStop(1, "rgba(192, 254, 4, 0.03)");
        } else {
          gradient.addColorStop(0, "rgba(168, 85, 247, 0.1)");
          gradient.addColorStop(1, "rgba(192, 254, 4, 0.1)");
        }

        ctx.fillStyle = gradient;

        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 20) {
          const y =
            Math.sin(x * 0.003 + time + i * 1.5) * 60 +
            Math.cos(x * 0.005 - time * 0.8) * 40 +
            height * 0.5 +
            i * 50;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      }

      // Pulsing Aurora Particles
      for (let p = 0; p < 25; p++) {
        const px = (Math.sin(p * 99 + time * 0.5) * 0.5 + 0.5) * width;
        const py = (Math.cos(p * 33 + time * 0.3) * 0.5 + 0.5) * height;
        const radius = Math.sin(time + p) * 3 + 4;

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = p % 2 === 0 ? "rgba(192, 254, 4, 0.4)" : "rgba(0, 245, 255, 0.4)";
        ctx.shadowBlur = 15;
        ctx.shadowColor = p % 2 === 0 ? "#C0FE04" : "#00f5ff";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden bg-black text-white py-24 min-h-[650px] flex items-center justify-center ${className}`}>
      {/* Animated WebGL Shader Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Lighting Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/90 pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 flex flex-col items-center">
        {/* Trust Badge */}
        {trustBadge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 font-mono text-xs tracking-wider uppercase mb-8 backdrop-blur-md shadow-lg shadow-lime-400/10 hover:border-lime-400/60 transition-all cursor-pointer">
            {trustBadge.icons && trustBadge.icons.map((ic, idx) => <span key={idx}>{ic}</span>)}
            <span>{trustBadge.text}</span>
          </div>
        )}

        {/* 2-Line Headline */}
        {headline && (
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
            <span className="block">{headline.line1}</span>
            <span className="bg-gradient-to-r from-lime-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent block mt-2">
              {headline.line2}
            </span>
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed font-normal">
            {subtitle}
          </p>
        )}

        {/* CTAs */}
        {buttons && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {buttons.primary && (
              <button
                onClick={buttons.primary.onClick}
                className="px-8 py-4 rounded-full bg-lime-400 text-black font-bold text-sm tracking-wide hover:bg-lime-300 transition-all shadow-xl shadow-lime-400/25 hover:scale-105"
              >
                {buttons.primary.text}
              </button>
            )}
            {buttons.secondary && (
              <button
                onClick={buttons.secondary.onClick}
                className="px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-sm tracking-wide hover:border-lime-400/50 hover:bg-lime-400/10 hover:text-lime-400 backdrop-blur-md transition-all"
              >
                {buttons.secondary.text}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { AnimatedShaderHero as Hero };
export default AnimatedShaderHero;

export function HeroDemo() {
  const handlePrimaryClick = () => console.log("Get Started clicked!");
  const handleSecondaryClick = () => console.log("Explore Features clicked!");

  return (
    <div className="w-full">
      <AnimatedShaderHero
        trustBadge={{
          text: "Trusted by forward-thinking teams.",
          icons: ["🚀", "⭐", "✨"],
        }}
        headline={{
          line1: "Launch Your",
          line2: "Workflow Into Orbit",
        }}
        subtitle="Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless, and limitless."
        buttons={{
          primary: {
            text: "Get Started for Free",
            onClick: handlePrimaryClick,
          },
          secondary: {
            text: "Explore Features",
            onClick: handleSecondaryClick,
          },
        }}
      />
    </div>
  );
}

import React, { useEffect, useRef } from "react";

export interface VelarisProps {
  height?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Velaris({
  height = "500px",
  className = "",
  children,
}: VelarisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    resize();
    window.addEventListener("resize", resize);

    // Simplex Noise & Living Gradient Shader Animation
    const render = () => {
      time += 0.008;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Deep dark backdrop
      ctx.fillStyle = "#030308";
      ctx.fillRect(0, 0, w, h);

      // Living Gradient Orbs & Noise Mesh
      const colors = [
        { r: 192, g: 254, b: 4, speed: 1.0 },   // Lime (#C0FE04)
        { r: 0, g: 245, b: 255, speed: 0.8 },   // Cyan (#00F5FF)
        { r: 147, g: 51, b: 234, speed: 1.2 },  // Purple (#9333EA)
        { r: 236, g: 72, b: 153, speed: 0.6 },  // Pink (#EC4899)
      ];

      colors.forEach((c, idx) => {
        const cx = (Math.sin(time * c.speed + idx * 2.1) * 0.35 + 0.5) * w;
        const cy = (Math.cos(time * c.speed * 0.7 + idx * 1.5) * 0.35 + 0.5) * h;
        const radius = Math.min(w, h) * (0.35 + Math.sin(time + idx) * 0.1);

        const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        radGrad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, 0.28)`);
        radGrad.addColorStop(0.5, `rgba(${c.r}, ${c.g}, ${c.b}, 0.1)`);
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Vignette Overlay
      const vig = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.7);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(3,3,8,0.85)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div
      style={{ height }}
      className={`relative overflow-hidden bg-black text-white ${className}`}
    >
      {/* WebGL / Simplex Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none z-0"
      />

      {/* Film Grain Texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.9%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

      {/* Foreground Content */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

export default function VelarisDemo() {
  return (
    <Velaris height="500px" className="rounded-xl">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium text-white/80 backdrop-blur">
          Powered by WebGL
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Living gradients in motion
        </h1>
        <p className="max-w-md text-sm text-white/70 sm:text-base">
          An animated simplex-noise background with color blending, vignette glow and film grain.
        </p>
      </div>
    </Velaris>
  );
}

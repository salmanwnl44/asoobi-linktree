"use client";

import React, { useEffect, useRef } from "react";
import { BackgroundConfig, BackgroundPatternType } from "@/types/builder";

interface BackgroundPatternRendererProps {
  config?: BackgroundConfig;
  backgroundColor: string;
  accentColor: string;
  className?: string;
}

export const BackgroundPatternRenderer: React.FC<BackgroundPatternRendererProps> = ({
  config,
  backgroundColor,
  accentColor,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const patternType: BackgroundPatternType = config?.type || "canvas_constellation";
  const opacity = typeof config?.patternOpacity === "number" ? config.patternOpacity : 0.8;
  const speed = typeof config?.particleSpeed === "number" ? config.particleSpeed : 1;
  const color = config?.patternColor || accentColor || "#D4AF37";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only render canvas for canvas-based animations
    if (
      patternType !== "canvas_constellation" &&
      patternType !== "canvas_aurora_waves" &&
      patternType !== "canvas_stardust"
    ) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracking for interactive particle repulsion / parallax
    const mouse = { x: -1000, y: -1000, radius: 100 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parentEl = canvas.parentElement;
    parentEl?.addEventListener("mousemove", handleMouseMove);
    parentEl?.addEventListener("mouseleave", handleMouseLeave);

    // ==========================================
    // 1. CONSTELLATION NETWORK (GSAP / 3JS SIM)
    // ==========================================
    if (patternType === "canvas_constellation") {
      const particleCount = Math.min(42, Math.floor((width * height) / 9000));
      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        radius: number;
        alpha: number;
      }> = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7 * speed,
          vy: (Math.random() - 0.5) * 0.7 * speed,
          radius: Math.random() * 1.8 + 1,
          alpha: Math.random() * 0.6 + 0.3,
        });
      }

      const renderConstellation = () => {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Mouse gentle repulsion
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= Math.cos(angle) * force * 2;
            p.y -= Math.sin(angle) * force * 2;
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = p.alpha * opacity;
          ctx.fill();

          // Connect with nearby neighbors
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const djx = p.x - p2.x;
            const djy = p.y - p2.y;
            const distBetween = Math.sqrt(djx * djx + djy * djy);

            const maxDist = 95;
            if (distBetween < maxDist) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = color;
              ctx.globalAlpha = (1 - distBetween / maxDist) * 0.28 * opacity;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }

        ctx.globalAlpha = 1;
        animationFrameId = requestAnimationFrame(renderConstellation);
      };

      renderConstellation();
    }

    // ==========================================
    // 2. AURORA SINUSOIDAL WAVES (THREE.JS LOOK)
    // ==========================================
    else if (patternType === "canvas_aurora_waves") {
      let step = 0;
      const waveCount = 3;

      const renderWaves = () => {
        ctx.clearRect(0, 0, width, height);
        step += 0.015 * speed;

        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath();
          const baseHeight = height * (0.35 + w * 0.18);
          ctx.moveTo(0, height);
          ctx.lineTo(0, baseHeight);

          for (let x = 0; x <= width; x += 6) {
            const y =
              baseHeight +
              Math.sin(x * 0.008 + step + w * 1.5) * 32 +
              Math.cos(x * 0.015 - step * 0.8) * 18;
            ctx.lineTo(x, y);
          }

          ctx.lineTo(width, height);
          ctx.closePath();

          const gradient = ctx.createLinearGradient(0, baseHeight - 40, width, height);
          gradient.addColorStop(0, `${color}30`);
          gradient.addColorStop(0.5, `${color}15`);
          gradient.addColorStop(1, "transparent");

          ctx.fillStyle = gradient;
          ctx.globalAlpha = 0.55 * opacity;
          ctx.fill();

          // Highlight crest line
          ctx.strokeStyle = color;
          ctx.globalAlpha = 0.35 * opacity;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
        animationFrameId = requestAnimationFrame(renderWaves);
      };

      renderWaves();
    }

    // ==========================================
    // 3. TWINKLING STARDUST PARTICLES
    // ==========================================
    else if (patternType === "canvas_stardust") {
      const starCount = 55;
      const stars: Array<{
        x: number;
        y: number;
        size: number;
        speedY: number;
        alpha: number;
        phase: number;
      }> = [];

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.6,
          speedY: (Math.random() * 0.4 + 0.15) * speed,
          alpha: Math.random(),
          phase: Math.random() * Math.PI * 2,
        });
      }

      const renderStardust = () => {
        ctx.clearRect(0, 0, width, height);

        for (const star of stars) {
          star.y -= star.speedY;
          if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
          }

          star.phase += 0.03 * speed;
          const currentAlpha = (Math.sin(star.phase) * 0.4 + 0.6) * opacity;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = currentAlpha;
          ctx.shadowBlur = 6;
          ctx.shadowColor = color;
          ctx.fill();
        }

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        animationFrameId = requestAnimationFrame(renderStardust);
      };

      renderStardust();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      parentEl?.removeEventListener("mousemove", handleMouseMove);
      parentEl?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [patternType, opacity, speed, color]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden transition-all duration-500 ${className}`}
      style={{ backgroundColor: "transparent" }}
    >
      {/* 1. Canvas layer for dynamic interactive simulations */}
      {(patternType === "canvas_constellation" ||
        patternType === "canvas_aurora_waves" ||
        patternType === "canvas_stardust") && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity }}
        />
      )}

      {/* 2. Geometric Dot Grid */}
      {patternType === "dot_grid" && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: opacity * 0.45,
            backgroundImage: `radial-gradient(${color} 1.5px, transparent 1.5px)`,
            backgroundSize: "22px 22px",
            backgroundPosition: "0 0",
          }}
        />
      )}

      {/* 3. Technical Isometric Grid */}
      {patternType === "isometric_grid" && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: opacity * 0.35,
            backgroundImage: `
              linear-gradient(30deg, ${color}22 12%, transparent 12.5%, transparent 87%, ${color}22 87.5%, ${color}22),
              linear-gradient(150deg, ${color}22 12%, transparent 12.5%, transparent 87%, ${color}22 87.5%, ${color}22),
              linear-gradient(30deg, ${color}22 12%, transparent 12.5%, transparent 87%, ${color}22 87.5%, ${color}22),
              linear-gradient(150deg, ${color}22 12%, transparent 12.5%, transparent 87%, ${color}22 87.5%, ${color}22),
              linear-gradient(60deg, ${color}33 25%, transparent 25.5%, transparent 75%, ${color}33 75%, ${color}33),
              linear-gradient(60deg, ${color}33 25%, transparent 25.5%, transparent 75%, ${color}33 75%, ${color}33)
            `,
            backgroundSize: "40px 70px",
            backgroundPosition: "0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px",
          }}
        />
      )}

      {/* 4. Luxury Art Deco Lattice */}
      {patternType === "art_deco_lattice" && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: opacity * 0.28,
            backgroundImage: `
              linear-gradient(45deg, ${color} 25%, transparent 25%),
              linear-gradient(-45deg, ${color} 25%, transparent 25%),
              linear-gradient(135deg, ${color} 25%, transparent 25%),
              linear-gradient(-135deg, ${color} 25%, transparent 25%)
            `,
            backgroundSize: "32px 32px",
            backgroundPosition: "16px 0, 16px 0, 0 0, 0 0",
          }}
        />
      )}

      {/* 5. Radial Ambient Spotlight */}
      {patternType === "gradient_radial" && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity,
            background: `radial-gradient(circle at 50% 12%, ${color}35 0%, ${color}12 40%, transparent 75%)`,
          }}
        />
      )}

      {/* 6. Animated Fluid Multi-Mesh Gradient */}
      {patternType === "gradient_mesh" && (
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ opacity: opacity * 0.7 }}
        >
          <div
            className="absolute -top-24 -left-20 w-72 h-72 rounded-full blur-3xl animate-pulse"
            style={{ backgroundColor: `${color}40`, animationDuration: "6s" }}
          />
          <div
            className="absolute top-1/3 -right-20 w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{ backgroundColor: `${color}28`, animationDuration: "8s", animationDelay: "2s" }}
          />
          <div
            className="absolute -bottom-24 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse"
            style={{ backgroundColor: `${color}30`, animationDuration: "7s", animationDelay: "1s" }}
          />
        </div>
      )}

      {/* 7. Analog Film Grain / Subtle Noise */}
      {patternType === "subtle_noise" && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: opacity * 0.35, filter: "contrast(130%) brightness(110%)" }}
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      )}

      {/* 8. Solid Color Block (Clean, no extra pattern overlay) */}
      {patternType === "solid_block" && null}
    </div>
  );
};

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

    const updateSize = () => {
      if (!canvas || !canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth || 400;
      const h = canvas.parentElement.clientHeight || 800;
      if (w > 0 && h > 0) {
        width = canvas.width = w;
        height = canvas.height = h;
      }
    };
    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Mouse tracking for interactive particle repulsion
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
    // 1. CONSTELLATION NETWORK
    // ==========================================
    if (patternType === "canvas_constellation") {
      const particleCount = Math.min(48, Math.floor((width * height) / 8000));
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
          radius: Math.random() * 2 + 1.2,
          alpha: Math.random() * 0.6 + 0.35,
        });
      }

      const renderConstellation = () => {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= Math.cos(angle) * force * 2;
            p.y -= Math.sin(angle) * force * 2;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = p.alpha * opacity;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const djx = p.x - p2.x;
            const djy = p.y - p2.y;
            const distBetween = Math.sqrt(djx * djx + djy * djy);

            const maxDist = 100;
            if (distBetween < maxDist) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = color;
              ctx.globalAlpha = (1 - distBetween / maxDist) * 0.35 * opacity;
              ctx.lineWidth = 0.85;
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
    // 2. AURORA WAVES
    // ==========================================
    if (patternType === "canvas_aurora_waves") {
      let step = 0;
      const waveColors = [
        color,
        "#34D399",
        "#06B6D4",
        "#FBBF24",
      ];

      const renderAurora = () => {
        ctx.clearRect(0, 0, width, height);
        step += 0.015 * speed;

        for (let w = 0; w < 3; w++) {
          ctx.beginPath();
          const baseHeight = height * (0.2 + w * 0.28);
          ctx.moveTo(0, baseHeight);

          for (let x = 0; x <= width; x += 15) {
            const yOffset =
              Math.sin(x * 0.006 + step + w) * 45 +
              Math.cos(x * 0.012 - step * 0.7) * 25;
            ctx.lineTo(x, baseHeight + yOffset);
          }

          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.closePath();

          const grad = ctx.createLinearGradient(0, baseHeight - 50, 0, height);
          const c = waveColors[w % waveColors.length];
          grad.addColorStop(0, `${c}33`);
          grad.addColorStop(0.5, `${c}15`);
          grad.addColorStop(1, "transparent");

          ctx.fillStyle = grad;
          ctx.globalAlpha = opacity * 0.8;
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        animationFrameId = requestAnimationFrame(renderAurora);
      };

      renderAurora();
    }

    // ==========================================
    // 3. TWINKLING STARDUST
    // ==========================================
    if (patternType === "canvas_stardust") {
      const starCount = Math.min(60, Math.floor((width * height) / 6000));
      const stars: Array<{
        x: number;
        y: number;
        radius: number;
        baseAlpha: number;
        twinkleSpeed: number;
        phase: number;
      }> = [];

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.2 + 0.8,
          baseAlpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: (Math.random() * 0.04 + 0.015) * speed,
          phase: Math.random() * Math.PI * 2,
        });
      }

      // Occasional shooting star
      let shootingStar: { x: number; y: number; length: number; speed: number; alpha: number } | null = null;
      let shootingStarTimer = 0;

      const renderStardust = () => {
        ctx.clearRect(0, 0, width, height);

        for (const s of stars) {
          s.phase += s.twinkleSpeed;
          const currentAlpha = Math.max(0.1, s.baseAlpha + Math.sin(s.phase) * 0.35);

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = currentAlpha * opacity;
          ctx.shadowBlur = 6;
          ctx.shadowColor = color;
          ctx.fill();
        }

        // Shooting star logic
        shootingStarTimer += speed;
        if (!shootingStar && shootingStarTimer > 180 && Math.random() < 0.03) {
          shootingStar = {
            x: Math.random() * width * 0.8,
            y: Math.random() * height * 0.3,
            length: 80,
            speed: 12 * speed,
            alpha: 1,
          };
          shootingStarTimer = 0;
        }

        if (shootingStar) {
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(shootingStar.x + shootingStar.length, shootingStar.y + shootingStar.length * 0.5);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = shootingStar.alpha * opacity;
          ctx.stroke();

          shootingStar.x += shootingStar.speed;
          shootingStar.y += shootingStar.speed * 0.5;
          shootingStar.alpha -= 0.025;

          if (shootingStar.alpha <= 0 || shootingStar.x > width || shootingStar.y > height) {
            shootingStar = null;
          }
        }

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        animationFrameId = requestAnimationFrame(renderStardust);
      };

      renderStardust();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
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
      {/* Embedded CSS Keyframes for Rich 60fps Smooth Real-Time Animations */}
      <style>{`
        @keyframes fullScanlineDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1200%); }
        }
        @keyframes fullRadarPass {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fullMeshOrbit1 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          50% { transform: translate(40px, 60px) scale(1.15) rotate(90deg); }
          100% { transform: translate(-30px, 30px) scale(0.95) rotate(180deg); }
        }
        @keyframes fullMeshOrbit2 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          50% { transform: translate(-50px, -40px) scale(1.2) rotate(-90deg); }
          100% { transform: translate(30px, -60px) scale(0.9) rotate(-180deg); }
        }
        @keyframes fullMeshOrbit3 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(60px, -30px) scale(1.1); }
          100% { transform: translate(-40px, 50px) scale(0.95); }
        }
        @keyframes fullSpotlightPulse {
          0% { transform: scale(0.92); opacity: 0.75; }
          100% { transform: scale(1.12); opacity: 1; }
        }
        @keyframes fullHoloShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fullBokehFloat1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate(25px, -50px) scale(1.15); opacity: 0.85; }
          100% { transform: translate(-20px, -100px) scale(0.9); opacity: 0.5; }
        }
        @keyframes fullBokehFloat2 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(-30px, -60px) scale(1.2); opacity: 0.8; }
          100% { transform: translate(25px, -120px) scale(0.95); opacity: 0.45; }
        }
        @keyframes fullBokehFloat3 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.65; }
          50% { transform: translate(35px, -40px) scale(1.1); opacity: 0.9; }
          100% { transform: translate(-15px, -90px) scale(1); opacity: 0.55; }
        }
        @keyframes fullMarbleSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes fullSheenSweep {
          0% { transform: translateX(-150%) skewX(-15deg); }
          60%, 100% { transform: translateX(250%) skewX(-15deg); }
        }
        @keyframes fullFilmFlicker {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.65; }
        }
        @keyframes fullHorizonWave {
          0% { transform: translateY(0px) scaleY(1); }
          50% { transform: translateY(-15px) scaleY(1.08); }
          100% { transform: translateY(0px) scaleY(1); }
        }
      `}</style>

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

      {/* 2. Geometric Dot Grid with Active Sweeping Radar Beam */}
      {patternType === "dot_grid" && (
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: opacity * 0.6,
              backgroundImage: `radial-gradient(${color} 2px, transparent 2px)`,
              backgroundSize: "20px 20px",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent"
            style={{
              width: "150%",
              animation: `fullRadarPass ${4 / speed}s linear infinite`,
            }}
          />
        </div>
      )}

      {/* 3. Technical Isometric Grid with Active Cyan Laser Scanline */}
      {patternType === "isometric_grid" && (
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: opacity * 0.5,
              backgroundImage: `
                linear-gradient(30deg, ${color}33 12%, transparent 12.5%, transparent 87%, ${color}33 87.5%, ${color}33),
                linear-gradient(150deg, ${color}33 12%, transparent 12.5%, transparent 87%, ${color}33 87.5%, ${color}33),
                linear-gradient(30deg, ${color}33 12%, transparent 12.5%, transparent 87%, ${color}33 87.5%, ${color}33),
                linear-gradient(150deg, ${color}33 12%, transparent 12.5%, transparent 87%, ${color}33 87.5%, ${color}33)
              `,
              backgroundSize: "32px 56px",
            }}
          />
          <div
            className="absolute inset-x-0 h-2 bg-[#0284C7] opacity-75 blur-xs"
            style={{
              animation: `fullScanlineDown ${3 / speed}s linear infinite`,
            }}
          />
        </div>
      )}

      {/* 4. Luxury Art Deco Lattice with Diagonal Gilded Sheen */}
      {patternType === "art_deco_lattice" && (
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: opacity * 0.45,
              backgroundImage: `
                linear-gradient(45deg, ${color} 25%, transparent 25%),
                linear-gradient(-45deg, ${color} 25%, transparent 25%),
                linear-gradient(135deg, ${color} 25%, transparent 25%),
                linear-gradient(-135deg, ${color} 25%, transparent 25%)
              `,
              backgroundSize: "28px 28px",
              backgroundPosition: "14px 0, 14px 0, 0 0, 0 0",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            style={{
              animation: `fullSheenSweep ${4 / speed}s ease-in-out infinite`,
            }}
          />
        </div>
      )}

      {/* 5. Radial Ambient Spotlight with Breathing Glow */}
      {patternType === "gradient_radial" && (
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: opacity * 0.85,
              background: `radial-gradient(circle at 50% 30%, ${color}66 0%, ${color}22 45%, transparent 75%)`,
              animation: `fullSpotlightPulse ${4 / speed}s ease-in-out infinite alternate`,
            }}
          />
        </div>
      )}

      {/* 6. Fluid Multi-Mesh Glow: Vibrant Orbiting Sunset Blobs */}
      {patternType === "gradient_mesh" && (
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ opacity: opacity * 0.85 }}
        >
          {/* Rose Orb */}
          <div
            className="absolute -top-16 -left-16 w-80 h-80 rounded-full blur-3xl"
            style={{
              backgroundColor: "#F43F5E60",
              animation: `fullMeshOrbit1 ${8 / speed}s ease-in-out infinite alternate`,
            }}
          />
          {/* Amber Orb */}
          <div
            className="absolute top-1/3 -right-20 w-96 h-96 rounded-full blur-3xl"
            style={{
              backgroundColor: "#F59E0B55",
              animation: `fullMeshOrbit2 ${10 / speed}s ease-in-out infinite alternate`,
            }}
          />
          {/* Royal Sky Blue Orb */}
          <div
            className="absolute -bottom-20 left-10 w-88 h-88 rounded-full blur-3xl"
            style={{
              backgroundColor: "#3B82F650",
              animation: `fullMeshOrbit3 ${7 / speed}s ease-in-out infinite alternate`,
            }}
          />
        </div>
      )}

      {/* 7. Analog Film Grain / Subtle Noise with Film Flicker */}
      {patternType === "subtle_noise" && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: opacity * 0.45,
              backgroundImage: "radial-gradient(#918355 1.5px, transparent 0)",
              backgroundSize: "6px 6px",
              animation: `fullFilmFlicker 0.35s steps(2) infinite`,
            }}
          />
        </div>
      )}

      {/* 8. Iridescent Prism Hologram: Fluid Shifting Rainbow Gradient */}
      {patternType === "iridescent_hologram" && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: opacity * 0.65,
            background: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 25%, #A1C4FD 50%, #C2E9FB 75%, #FEE140 100%)",
            backgroundSize: "200% 200%",
            animation: `fullHoloShift ${8 / speed}s ease infinite alternate`,
            filter: "blur(15px)",
          }}
        />
      )}

      {/* 9. Floating Bokeh Orbs: Smoothly Drifting Floating Bubbles */}
      {patternType === "floating_bubbles" && (
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ opacity: opacity * 0.75 }}
        >
          <div
            className="absolute w-52 h-52 rounded-full blur-2xl"
            style={{
              backgroundColor: "#FBBF2455",
              bottom: "10%",
              left: "10%",
              animation: `fullBokehFloat1 ${6 / speed}s ease-in-out infinite alternate`,
            }}
          />
          <div
            className="absolute w-60 h-60 rounded-full blur-2xl"
            style={{
              backgroundColor: "#F472B650",
              bottom: "25%",
              right: "10%",
              animation: `fullBokehFloat2 ${7.5 / speed}s ease-in-out infinite alternate`,
            }}
          />
          <div
            className="absolute w-44 h-44 rounded-full blur-2xl"
            style={{
              backgroundColor: "#38BDF850",
              bottom: "5%",
              left: "50%",
              animation: `fullBokehFloat3 ${5.5 / speed}s ease-in-out infinite alternate`,
            }}
          />
        </div>
      )}

      {/* 10. Neon Sunset Horizon: Radiant Apricot & Tangerine Undulating Twilight Waves */}
      {patternType === "neon_horizon" && (
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ opacity: opacity * 0.75 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, #FB7185 0%, #FB923C 35%, #FDE047 70%, transparent 100%)",
              animation: `fullHorizonWave ${5 / speed}s ease-in-out infinite alternate`,
            }}
          />
        </div>
      )}

      {/* 11. Liquid Luxury Marble: Swirling Fluid Blend */}
      {patternType === "liquid_marble" && (
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ opacity: opacity * 0.6 }}
        >
          <div
            className="absolute inset-[-30%] rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle at 35% 35%, #F472B6 0%, transparent 50%), radial-gradient(circle at 65% 65%, #FBBF24 0%, transparent 50%), radial-gradient(circle at 50% 50%, #38BDF8 0%, transparent 50%)",
              animation: `fullMarbleSpin ${12 / speed}s linear infinite`,
            }}
          />
        </div>
      )}

      {/* 12. Cyber Matrix Stream: Emerald Grid + Continuous Sweeping Digital Scanline */}
      {patternType === "cyber_matrix" && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: opacity * 0.55,
              backgroundImage: `linear-gradient(#059669 1.5px, transparent 1.5px), linear-gradient(90deg, #059669 1.5px, transparent 1.5px)`,
              backgroundSize: "24px 24px",
            }}
          />
          {/* Glowing Green Horizontal Scanline sweeping continuously */}
          <div
            className="absolute inset-x-0 h-2 bg-[#10B981] opacity-80 blur-xs"
            style={{
              boxShadow: "0 0 12px #10B981",
              animation: `fullScanlineDown ${3 / speed}s linear infinite`,
            }}
          />
        </div>
      )}

      {/* 13. Solid Clean Block: Warm Satin Silk with Soft Periodic Sheen */}
      {patternType === "solid_block" && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{
              animation: `fullSheenSweep ${5 / speed}s ease-in-out infinite`,
            }}
          />
        </div>
      )}
    </div>
  );
};

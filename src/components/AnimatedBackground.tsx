// src/components/AnimatedBackground.tsx
import React, { useMemo, useEffect, useRef, useCallback, useState } from 'react';
import { useMouseGlow } from '../hooks/useMouseGlow';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'light' | 'system';
  showGrid?: boolean;
  showOrbs?: boolean;
  showDots?: boolean;
  showNetwork?: boolean; // ← Nouveau : active l'effet plexus
  orbCount?: number;
  dotCount?: number;
  networkNodeCount?: number; // ← Nombre de nœuds du réseau
}

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  className = '',
  variant = 'dark',
  showGrid = true,
  showOrbs = false,        // Désactivé par défaut pour privilégier le réseau
  showDots = false,        // Désactivé par défaut
  showNetwork = true,      // ← Activé par défaut
  orbCount = 3,
  dotCount = 40,
  networkNodeCount = 100,  // Nombre de nœuds pour l'effet capture
}) => {
  const { containerRef, glowRef } = useMouseGlow();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef<number>(0);

  const [prefersDark, setPrefersDark] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false
  );

  useEffect(() => {
    if (variant !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => setPrefersDark(event.matches);

    setPrefersDark(media.matches);
    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, [variant]);

  const isDark = variant === 'dark' || (variant === 'system' && prefersDark);

  // === RÉSEAU DE NŒUDS (CANVAS) ===
  const initNetwork = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const width = canvas.width;
    const height = canvas.height;
    
    const nodes: NetworkNode[] = Array.from({ length: networkNodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3, // Vitesse très lente
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 1,
      baseRadius: Math.random() * 1.5 + 1,
    }));

    const getDistance = (a: NetworkNode, b: NetworkNode) => {
      return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Mise à jour des positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Rebond sur les bords
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Garder dans les limites
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      });

      const connectionDistance = 180;
      const mouseConnectionDistance = 250;

      // Dessiner les connexions
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = getDistance(nodes[i], nodes[j]);
          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.5;
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${opacity})` // cyan-400
              : `rgba(59, 130, 246, ${opacity})`; // blue-500
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Connexions avec la souris
        const mouseDist = Math.sqrt(
          (nodes[i].x - mousePos.current.x) ** 2 + 
          (nodes[i].y - mousePos.current.y) ** 2
        );
        if (mouseDist < mouseConnectionDistance) {
          const opacity = (1 - mouseDist / mouseConnectionDistance) * 0.8;
          ctx.strokeStyle = isDark
            ? `rgba(99, 102, 241, ${opacity})` // indigo
            : `rgba(79, 70, 229, ${opacity})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mousePos.current.x, mousePos.current.y);
          ctx.stroke();
          ctx.lineWidth = 0.8;
        }
      }

      // Dessiner les nœuds
      nodes.forEach(node => {
        const mouseDist = Math.sqrt(
          (node.x - mousePos.current.x) ** 2 + 
          (node.y - mousePos.current.y) ** 2
        );
        
        // Effet de "pulse" quand la souris est proche
        if (mouseDist < 200) {
          const factor = 1 + (1 - mouseDist / 200) * 1.5;
          node.radius = node.baseRadius * factor;
        } else {
          node.radius += (node.baseRadius - node.radius) * 0.1;
        }

        // Glow
        ctx.shadowBlur = isDark ? 15 : 8;
        ctx.shadowColor = isDark ? 'rgba(56, 189, 248, 0.8)' : 'rgba(59, 130, 246, 0.6)';
        
        ctx.fillStyle = isDark
          ? 'rgba(186, 230, 253, 0.9)' // sky-200
          : 'rgba(37, 99, 235, 0.9)';  // blue-600
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });

      rafId.current = requestAnimationFrame(animate);
    };

    animate();
  }, [networkNodeCount, isDark]);

  useEffect(() => {
    if (!showNetwork) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener('resize', resize);

    // Track mouse sur le canvas
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    
    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    initNetwork(canvas, ctx);

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [showNetwork, containerRef, initNetwork]);

  // Génération aléatoire des orbes (stable au render)
  const orbs = useMemo(() => {
    const colors = [
      'rgba(99,102,241,0.4)',   // indigo
      'rgba(236,72,153,0.3)',   // pink
      'rgba(34,211,238,0.25)',  // cyan
      'rgba(168,85,247,0.3)',   // purple
      'rgba(251,146,60,0.25)',  // orange
    ];
    return Array.from({ length: orbCount }, (_, i) => ({
      id: i,
      size: 200 + Math.random() * 250,
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      color: colors[i % colors.length],
      delay: `${i * 2}s`,
      duration: `${6 + Math.random() * 6}s`,
    }));
  }, [orbCount]);

  // Génération aléatoire des particules
  const dots = useMemo(() => {
    return Array.from({ length: dotCount }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${3 + Math.random() * 3}s`,
    }));
  }, [dotCount]);

  const bgClass = isDark
    ? 'bg-[#020617]' // slate-950 plus profond pour matcher la capture
    : 'bg-gray-50';

  const textClass = isDark ? 'text-white' : 'text-gray-900';

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-screen overflow-hidden ${bgClass} ${className}`}
    >
      {/* === RÉSEAU CANVAS (NOUVEAU) === */}
      {showNetwork && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />
      )}

      {/* === ORBES ANIMÉS === */}
      {showOrbs &&
        orbs.map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
              filter: 'blur(60px)',
              animation: `float ${orb.duration} ease-in-out infinite`,
              animationDelay: orb.delay,
              zIndex: 2,
            }}
          />
        ))}

      {/* === GRILLE === */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isDark
              ? `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`
              : `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            zIndex: 2,
          }}
        />
      )}

      {/* === PARTICULES (legacy, optionnel) === */}
      {showDots &&
        dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute w-0.75 h-0.75 rounded-full pointer-events-none"
            style={{
              top: dot.top,
              left: dot.left,
              background: isDark
                ? 'rgba(255,255,255,0.35)'
                : 'rgba(0,0,0,0.2)',
              animation: `pulse-glow ${dot.duration} ease-in-out infinite`,
              animationDelay: dot.delay,
              zIndex: 2,
            }}
          />
        ))}

      {/* === GLOW CURSEUR === */}
      <div
        ref={glowRef}
        className="absolute rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          width: 300,
          height: 300,
          background: isDark
            ? 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          zIndex: 10,
        }}
      />

      {/* === CONTENU === */}
      <div className={`relative ${textClass}`} style={{ zIndex: 20 }}>
        {children}
      </div>

      {/* === KEYFRAMES INLINE === */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
// src/hooks/useMouseGlow.ts
import { useEffect, useRef } from 'react';
import { useMouseStore } from '../stores/useMouseStore';

export const useMouseGlow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { setPosition, setHovering } = useMouseStore();

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = '1';

      setPosition(x, y);
      setHovering(true);
    };

    const handleMouseLeave = () => {
      glow.style.opacity = '0';
      setHovering(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [setPosition, setHovering]);

  return { containerRef, glowRef };
};
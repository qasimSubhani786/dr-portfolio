'use client';

import { useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMouseParallax(strength = 1) {
  const [mouse, setMouse] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2 * strength;
      targetRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2 * strength;
    };

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.05;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.05;

      setMouse({
        x: currentRef.current.x,
        y: currentRef.current.y,
        normalizedX: currentRef.current.x / strength,
        normalizedY: currentRef.current.y / strength,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [strength]);

  return mouse;
}

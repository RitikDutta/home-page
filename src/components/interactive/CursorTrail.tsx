// @ts-nocheck
/**
 * Cursor particle trail for desktop users.
 * Linked styles: Tailwind classes from src/index.css for positioning.
 * External script: none; uses `requestAnimationFrame` for animation.
 */
import { useCallback, useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  createdAt: number;
  vx: number;
  vy: number;
}

export default function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  const addParticle = useCallback((x: number, y: number) => {
    const newId = particleId.current++;
    const newParticle: Particle = {
      id: newId,
      x,
      y,
      size: Math.random() * 4 + 2,
      opacity: 1,
      createdAt: Date.now(),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    };
    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newId));
    }, 600);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (e.clientX === undefined || e.clientY === undefined) return;

      const distance = Math.hypot(
        e.clientX - lastPos.current.x,
        e.clientY - lastPos.current.y
      );

      if (distance > 15) {
        addParticle(e.clientX, e.clientY);
        lastPos.current = { x: e.clientX, y: e.clientY };
      }
    },
    [addParticle]
  );

  const updateParticles = useCallback(() => {
    setParticles((prev) =>
      prev
        .map((p) => {
          const life = (Date.now() - p.createdAt) / 600;
          return {
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: 1 - life,
            size: p.size * (1 - life * 0.5),
          };
        })
        .filter((p) => p.opacity > 0)
    );
    animationFrameId.current = requestAnimationFrame(updateParticles);
  }, []);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId.current = requestAnimationFrame(updateParticles);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleMouseMove, updateParticles]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#FF6B6B]"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            transform: "translate(-50%, -50%)",
            transition:
              "opacity 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out",
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}

"use client";

import { useRef } from "react";
import { usePointerMotion } from "@/app/components/motion";

const attachGlow = (glow: HTMLDivElement) => {
  const hero = glow.closest("section");
  if (!hero) return () => {};
  let frame = 0;
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let pointer: { x: number; y: number } | null = null;
  const animate = () => {
    if (pointer) {
      const bounds = hero.getBoundingClientRect();
      targetX = pointer.x - bounds.left - 160;
      targetY = pointer.y - bounds.top - 100;
    }
    x += (targetX - x) * 0.08;
    y += (targetY - y) * 0.08;
    glow.style.transform = `translate(${x}px, ${y}px)`;
    frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1 ? requestAnimationFrame(animate) : 0;
  };
  const start = () => {
    if (!frame) frame = requestAnimationFrame(animate);
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    // 元の光の中心(160, 100)をポインターへ近づける
    pointer = { x: event.clientX, y: event.clientY };
    start();
  };
  const leave = () => {
    pointer = null;
    targetX = 0;
    targetY = 0;
    start();
  };
  hero.addEventListener("pointermove", move, { passive: true });
  hero.addEventListener("pointerleave", leave, { passive: true });
  return () => {
    cancelAnimationFrame(frame);
    glow.style.removeProperty("transform");
    hero.removeEventListener("pointermove", move);
    hero.removeEventListener("pointerleave", leave);
  };
};

const HeroGlow = () => {
  const ref = useRef<HTMLDivElement>(null);
  usePointerMotion(ref, attachGlow);
  return (
    <>
      {/* 自律移動を外側に分け、内側のポインター追従とtransformを合成する */}
      <div aria-hidden className="hero-glow-drift pointer-events-none absolute -top-40 -left-40 h-[520px] w-[640px]">
        <div ref={ref} className="hero-glow h-full w-full rounded-full bg-accent/15 blur-[120px]" />
      </div>
      <div aria-hidden className="hero-glow-secondary pointer-events-none absolute -right-24 -bottom-24 h-[360px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />
    </>
  );
};

export default HeroGlow;

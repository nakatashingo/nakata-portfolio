"use client";

import { useRef, type ComponentProps } from "react";
import { usePointerMotion } from "@/app/components/motion";
import RippleLayer from "@/app/components/RippleLayer";

// 動くリンク自身ではなく、動く前の中心を基準にしてポインターの揺れを防ぐ
const attachMagnet = (element: HTMLAnchorElement) => {
  let frame = 0;
  let x = 0;
  let y = 0;
  let bounds: DOMRect | undefined;
  let clientX = 0;
  let clientY = 0;
  const move = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    clientX = event.clientX;
    clientY = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      bounds ??= element.getBoundingClientRect();
      x = (clientX - bounds.left - bounds.width / 2) / (bounds.width / 2);
      y = (clientY - bounds.top - bounds.height / 2) / (bounds.height / 2);
      const distance = Math.max(1, Math.hypot(x, y));
      element.style.transform = `translate(${x / distance * 6}px, ${y / distance * 6}px)`;
    });
  };
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    bounds = undefined;
    element.style.removeProperty("transform");
  };
  const scroll = () => {
    if (!frame) frame = requestAnimationFrame(reset);
  };
  // ホバー中だけスクロールを監視し、ページ内の全リンクで常時購読しない
  const enter = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    window.addEventListener("scroll", scroll, { passive: true });
  };
  const leave = () => {
    window.removeEventListener("scroll", scroll);
    reset();
  };
  element.addEventListener("pointerenter", enter, { passive: true });
  element.addEventListener("pointermove", move, { passive: true });
  element.addEventListener("pointerleave", leave, { passive: true });
  return () => {
    leave();
    element.removeEventListener("pointerenter", enter);
    element.removeEventListener("pointermove", move);
    element.removeEventListener("pointerleave", leave);
  };
};

const MagneticLink = ({ className = "", children, ...props }: ComponentProps<"a">) => {
  const ref = useRef<HTMLAnchorElement>(null);
  usePointerMotion(ref, attachMagnet);
  return (
    <a {...props} ref={ref} className={`magnetic-link relative overflow-hidden ${className}`}>
      <span className="relative z-[1] flex items-center gap-2">{children}</span>
      <RippleLayer variant="button" />
    </a>
  );
};

export default MagneticLink;

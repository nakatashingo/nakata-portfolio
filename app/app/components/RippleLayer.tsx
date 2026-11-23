"use client";

import { useEffect, useRef, type RefObject } from "react";

type RippleVariant = "hero" | "button";

// 生成と後片付けを共通化し、Reactの本文や磁気ホバーのtransformには触れない
const useRipples = (ref: RefObject<HTMLSpanElement | null>, variant: RippleVariant) => {
  useEffect(() => {
    const layer = ref.current;
    const container = variant === "hero" ? layer?.closest("section") : layer?.parentElement;
    if (!layer || !container) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clear = () => layer.replaceChildren();
    const click = (event: MouseEvent) => {
      if (media.matches) return;
      // ソーシャルリンクは自身のインクだけを表示し、背景の波紋と重ねない
      if (variant === "hero" && event.target instanceof Element && event.target.closest(".magnetic-link")) return;
      const bounds = layer.getBoundingClientRect();
      const containerBounds = container.getBoundingClientRect();
      const diameter = variant === "hero" ? 320 : Math.max(containerBounds.width, containerBounds.height) * 2;
      const ripple = document.createElement("span");
      ripple.className = `ripple ripple-${variant}`;
      // キーボードなど座標を持たないクリックは中央から広げる
      ripple.style.left = `${event.detail === 0 ? bounds.width / 2 : event.clientX - bounds.left}px`;
      ripple.style.top = `${event.detail === 0 ? bounds.height / 2 : event.clientY - bounds.top}px`;
      ripple.style.width = `${diameter}px`;
      ripple.style.height = `${diameter}px`;
      const removeRipple = () => ripple.remove();
      ripple.addEventListener("animationend", removeRipple, { once: true });
      ripple.addEventListener("animationcancel", removeRipple, { once: true });
      // 連打時もコンテナごとに最大4個までに抑え、古い波紋から取り除く
      while (layer.childElementCount >= 4) layer.firstElementChild?.remove();
      layer.append(ripple);
    };
    const sync = () => {
      if (media.matches) clear();
    };
    container.addEventListener("click", click);
    media.addEventListener("change", sync);
    return () => {
      container.removeEventListener("click", click);
      media.removeEventListener("change", sync);
      clear();
    };
  }, [ref, variant]);
};

const RippleLayer = ({ variant }: { variant: RippleVariant }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useRipples(ref, variant);
  return <span ref={ref} aria-hidden className={`pointer-events-none absolute inset-0${variant === "hero" ? " z-[1]" : " z-0"}`} />;
};

export default RippleLayer;

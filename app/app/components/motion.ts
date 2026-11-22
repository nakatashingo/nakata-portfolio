"use client";

import { useEffect, type RefObject } from "react";

export const POINTER_MOTION = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// 設定変更時にも購読を解除し、軽減設定やタッチへ切り替わった瞬間に静止させる
export const usePointerMotion = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  setup: (element: T) => () => void,
) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia(POINTER_MOTION);
    let cleanup: (() => void) | undefined;
    const sync = () => {
      cleanup?.();
      cleanup = media.matches ? setup(element) : undefined;
    };
    sync();
    media.addEventListener("change", sync);
    return () => {
      cleanup?.();
      media.removeEventListener("change", sync);
    };
  }, [ref, setup]);
};

// 初期HTMLを隠さず、ハイドレーション後にだけ一度きりの表示待ち状態を付ける
export const observeReveals = (elements: HTMLElement[], rule = false) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealed = new Set<HTMLElement>();
  let observer: IntersectionObserver | undefined;
  const targets = new Map(elements.map((element) => [rule ? element.closest("h2") ?? element : element, element]));
  const sync = () => {
    observer?.disconnect();
    elements.forEach((element) => element.removeAttribute("data-reveal-state"));
    if (media.matches || !("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver((entries) => {
      // 同じ通知で新たに見えた要素だけを数え、後から見える項目の待ち時間を増やさない
      let index = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = targets.get(entry.target as HTMLElement);
        if (!element || revealed.has(element)) return;
        element.style.setProperty("--reveal-delay", `${rule ? 0 : index * 0.08}s`);
        index += 1;
        element.dataset.revealState = "visible";
        revealed.add(element);
        observer?.unobserve(entry.target);
      });
    });
    elements.forEach((element) => {
      if (revealed.has(element)) return;
      element.dataset.revealState = "pending";
      observer?.observe(rule ? element.closest("h2") ?? element : element);
    });
  };
  sync();
  media.addEventListener("change", sync);
  return () => {
    observer?.disconnect();
    media.removeEventListener("change", sync);
    elements.forEach((element) => {
      element.removeAttribute("data-reveal-state");
      element.style.removeProperty("--reveal-delay");
    });
  };
};

"use client";

import { useEffect, useRef, type ReactNode } from "react";

const Timeline = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dots = Array.from(list.querySelectorAll<HTMLElement>("[data-timeline-dot]"));
    let frame = 0;
    let needsMeasure = true;
    let positions: number[] = [];
    let end = 0;
    const update = () => {
      frame = 0;
      const bounds = list.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - bounds.top) / bounds.height));
      // ドットの相対位置はサイズ変更時だけ読み、全ての計測をスタイル更新より先に済ませる
      if (needsMeasure) {
        positions = dots.map((dot) => {
          const dotBounds = dot.getBoundingClientRect();
          return dotBounds.top - bounds.top + dotBounds.height / 2;
        });
        // 最後のドットで線を止めつつ、進捗の終点はol全体の下端に合わせる
        end = positions.at(-1) ?? bounds.height;
        needsMeasure = false;
        list.style.setProperty("--timeline-height", `${end}px`);
      }
      list.style.setProperty("--timeline-progress", `${progress}`);
      dots.forEach((dot, index) => {
        dot.dataset.lit = String(progress * end >= positions[index]);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      needsMeasure = true;
      schedule();
    };
    const resize = new ResizeObserver(remeasure);
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      delete list.dataset.progress;
      list.style.removeProperty("--timeline-progress");
      dots.forEach((dot) => delete dot.dataset.lit);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      resize.disconnect();
    };
    const sync = () => {
      reset();
      if (media.matches) return;
      needsMeasure = true;
      update();
      list.dataset.progress = "true";
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", remeasure, { passive: true });
      resize.observe(list);
    };
    sync();
    media.addEventListener("change", sync);
    return () => {
      reset();
      media.removeEventListener("change", sync);
    };
  }, []);
  return <ol ref={ref} className="timeline relative ml-1.5 flex max-w-[760px] list-none flex-col">{children}</ol>;
};

export default Timeline;

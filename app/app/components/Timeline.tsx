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
    const update = () => {
      frame = 0;
      const bounds = list.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - bounds.top) / bounds.height));
      // 最後のドットで線を止めつつ、進捗の終点はol全体の下端に合わせる
      const lastDot = dots.at(-1);
      const end = lastDot ? lastDot.getBoundingClientRect().top - bounds.top + lastDot.offsetHeight / 2 : bounds.height;
      list.style.setProperty("--timeline-height", `${end}px`);
      list.style.setProperty("--timeline-progress", `${progress}`);
      dots.forEach((dot) => {
        const position = dot.getBoundingClientRect().top - bounds.top + dot.offsetHeight / 2;
        dot.dataset.lit = String(progress * end >= position);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      delete list.dataset.progress;
      list.style.removeProperty("--timeline-progress");
      dots.forEach((dot) => delete dot.dataset.lit);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
    };
    const sync = () => {
      reset();
      if (media.matches) return;
      update();
      list.dataset.progress = "true";
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
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

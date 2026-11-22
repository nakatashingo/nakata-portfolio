"use client";

import { useEffect, useRef, useState } from "react";
import MagneticLink from "@/app/components/MagneticLink";
import { usePointerMotion } from "@/app/components/motion";
import type { WorkItem } from "@/app/types";

interface WorkCardProps {
  item: WorkItem;
}

// 傾きと光は同じフレームで更新し、カード外へ出たら元の面へ戻す
const attachTilt = (card: HTMLElement) => {
  let frame = 0;
  let clientX = 0;
  let clientY = 0;
  let bounds: DOMRect | undefined;
  const move = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    clientX = event.clientX;
    clientY = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      bounds ??= card.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (clientX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (clientY - bounds.top) / bounds.height * 2 - 1));
      card.style.setProperty("--tilt-x", `${-y * 4}deg`);
      card.style.setProperty("--tilt-y", `${x * 4}deg`);
      card.style.setProperty("--edge-x", `${(x + 1) * bounds.width / 2}px`);
      card.dataset.tilt = "true";
    });
  };
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    bounds = undefined;
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
    delete card.dataset.tilt;
  };
  const scroll = () => {
    if (!frame) frame = requestAnimationFrame(reset);
  };
  card.addEventListener("pointermove", move, { passive: true });
  card.addEventListener("pointerleave", reset, { passive: true });
  window.addEventListener("scroll", scroll, { passive: true });
  return () => {
    reset();
    card.removeEventListener("pointermove", move);
    card.removeEventListener("pointerleave", reset);
    window.removeEventListener("scroll", scroll);
  };
};

const WorkCard = ({ item }: WorkCardProps) => {
  const ref = useRef<HTMLElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState(0);
  usePointerMotion(surfaceRef, attachTilt);

  useEffect(() => {
    const card = ref.current;
    if (card) card.dataset.hashReady = "true";
    let timer: ReturnType<typeof setTimeout>;
    const show = () => {
      clearTimeout(timer);
      setHighlight((value) => value + 1);
      timer = setTimeout(() => setHighlight(0), 1200);
    };
    const checkHash = () => {
      if (window.location.hash === `#work-${item.id}`) show();
    };
    // 同じハッシュのリンクを再度選んだ場合も、作品の位置を知らせる
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (link && link.origin === window.location.origin && link.pathname === window.location.pathname && link.search === window.location.search && link.hash === `#work-${item.id}`) show();
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    document.addEventListener("click", click);
    return () => {
      clearTimeout(timer);
      if (card) delete card.dataset.hashReady;
      window.removeEventListener("hashchange", checkHash);
      document.removeEventListener("click", click);
    };
  }, [item.id]);

  return (
    <article ref={ref} id={`work-${item.id}`} tabIndex={-1} data-reveal className="work-card relative h-full min-w-0">
      {/* 表示と傾きの面を分け、スクロールの時差とホバーの復帰時間を独立させる */}
      <div ref={surfaceRef} className={`work-card-surface relative flex h-full min-w-0 flex-col gap-5 ${item.featured ? "border border-line bg-surface p-6 sm:p-10" : "border-t border-line px-2 pt-6 pb-2"}`}>
        <span aria-hidden className="work-edge pointer-events-none absolute inset-x-0 top-0 h-12 overflow-hidden" />
        <span key={highlight} aria-hidden className={`work-highlight pointer-events-none absolute -inset-px ${highlight ? "work-highlight-active" : ""}`} />
        <h3 className={`m-0 leading-[1.5] font-bold ${item.featured ? "text-2xl" : "text-xl"}`}>{item.title}</h3>
        {/* 注目作品は本文と技術を横に並べ、説明を読む流れを優先する */}
        <div className={`grid flex-1 gap-5 ${item.featured ? "md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-10" : ""}`}>
          <p className="m-0 max-w-[36em] text-base leading-[1.9] text-muted">{item.description}</p>
          <ul className="m-0 flex list-none flex-wrap content-start gap-x-4 gap-y-2 p-0">
            {item.tags.map((tag) => (
              <li key={tag} className="text-[0.8125rem] font-medium text-accent-text">{tag}</li>
            ))}
          </ul>
        </div>
        {item.link ? (
          <MagneticLink
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 w-fit text-[0.9375rem] font-medium text-accent-text underline decoration-1 underline-offset-4 hover:text-foreground hover:decoration-2"
          >
            {item.linkLabel ?? "GitHubで見る"}
          </MagneticLink>
        ) : (
          <span className="mt-1 text-[0.8125rem] text-muted">リンクは追加予定</span>
        )}
      </div>
    </article>
  );
};

export default WorkCard;

"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { SkillCategory, WorkItem } from "@/app/types";

interface SkillRowsProps {
  categories: SkillCategory[];
  works: Pick<WorkItem, "id" | "title" | "tags">[];
}

const SkillRows = ({ categories, works }: SkillRowsProps) => {
  const [open, setOpen] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDListElement>(null);
  const prefix = useId();
  const suppressFocus = useRef(false);

  useEffect(() => {
    setReady(true);
    const list = ref.current;
    if (!list) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let hovered: string | null = null;
    const pointer = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType === "touch") return;
      const target = event.type === "pointerout" ? event.relatedTarget : event.target;
      const item = target instanceof Element ? target.closest<HTMLElement>("[data-skill]") : null;
      hovered = item && list.contains(item) ? item.dataset.skill ?? null : null;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        const focused = document.activeElement?.closest<HTMLElement>("[data-skill]");
        setOpen(hovered ?? (focused && list.contains(focused) ? focused.dataset.skill ?? null : null));
      });
    };
    const outside = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      if (!(event.target instanceof Node) || !list.contains(event.target)) setOpen(null);
      else if (!(event.target instanceof Element) || !event.target.closest("[data-skill]")) setOpen(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      cancelAnimationFrame(frame);
      const expanded = list.querySelector<HTMLButtonElement>('[aria-expanded="true"]');
      if (!expanded) return;
      if (expanded.parentElement?.contains(document.activeElement)) {
        suppressFocus.current = true;
        expanded.focus();
        suppressFocus.current = false;
      }
      setOpen(null);
    };
    list.addEventListener("pointerover", pointer, { passive: true });
    list.addEventListener("pointerout", pointer, { passive: true });
    document.addEventListener("pointerdown", outside, { passive: true });
    document.addEventListener("keydown", escape);
    return () => {
      cancelAnimationFrame(frame);
      list.removeEventListener("pointerover", pointer);
      list.removeEventListener("pointerout", pointer);
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    const popup = ref.current?.querySelector<HTMLElement>("[data-popover-open]");
    if (!popup) return;
    // 右端のスキルでも画面からはみ出さず、文字サイズ変更にも追従する
    const position = () => {
      popup.style.removeProperty("--popover-shift");
      const bounds = popup.getBoundingClientRect();
      const shift = Math.max(24 - bounds.left, Math.min(0, window.innerWidth - 24 - bounds.right));
      popup.style.setProperty("--popover-shift", `${shift}px`);
    };
    position();
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(position);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(popup);
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [open]);

  return (
    <dl ref={ref} className="m-0 divide-y divide-line">
      {categories.map((category, categoryIndex) => (
        <div key={category.label} data-reveal className="skill-row relative grid gap-4 py-7 first:pt-0 last:pb-0 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
          <dt className="text-[0.9375rem] font-medium text-muted">{category.label}</dt>
          <dd className="m-0 min-w-0">
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
              {category.items.map((skill, index) => {
                const matches = works.filter((work) => work.tags.includes(skill));
                if (!matches.length) return <li key={skill} className="font-medium">{skill}</li>;
                const popupId = `${prefix}-${categoryIndex}-${index}`;
                return (
                  <li key={skill} data-skill={skill} className="relative font-medium"
                    onFocus={() => { if (!suppressFocus.current) setOpen(skill); }}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null);
                    }}
                  >
                    {!ready && <span>{skill}</span>}
                    <button type="button" hidden={!ready} aria-expanded={open === skill} aria-controls={popupId}
                      className="cursor-pointer text-accent-text underline decoration-dotted underline-offset-4"
                      onClick={() => setOpen(skill)}
                    >{skill}</button>
                    <div id={popupId} hidden={open !== skill} data-popover-open={open === skill ? "" : undefined}
                      role="region" aria-label={`${skill}を使った作品`}
                      className="skill-popover absolute top-full left-0 z-20 w-80 max-w-[calc(100vw-48px)] pt-2 text-[0.8125rem]"
                    >
                      <div className="border border-line bg-surface p-4 shadow-lg">
                        <p className="m-0 mb-2 font-bold">使った作品</p>
                        <ul className="m-0 list-none space-y-2 p-0">
                          {matches.map((work) => (
                            <li key={work.id}>
                              <a href={`#work-${work.id}`} className="block text-accent-text underline underline-offset-4"
                                onClick={() => {
                                  setOpen(null);
                                  requestAnimationFrame(() => document.getElementById(`work-${work.id}`)?.focus({ preventScroll: true }));
                                }}
                              >{work.title}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* JSなしでも同じ作品へ辿れるよう、対応関係を通常のリンクとして残す */}
                    <noscript>
                      <details className="text-[0.8125rem]">
                        <summary className="cursor-pointer">使った作品</summary>
                        <ul className="m-0 max-w-64 list-none space-y-2 p-0">
                          {matches.map((work) => <li key={work.id}><a href={`#work-${work.id}`} className="text-accent-text underline">{work.title}</a></li>)}
                        </ul>
                      </details>
                    </noscript>
                  </li>
                );
              })}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default SkillRows;

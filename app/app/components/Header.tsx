"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "#profile", label: "Profile" },
  { href: "#activities", label: "Activities" },
  { href: "#skills", label: "Skills" },
  { href: "#works", label: "Works" },
];

const Header = () => {
  const [current, setCurrent] = useState("#profile");
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const value = distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0;
      progress.style.transform = `scaleX(${value})`;
    };
    // スクロールとリサイズの通知を一描画にまとめ、軽減設定でも現在位置を直接示す
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      progress.style.removeProperty("transform");
    };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = NAV_LINKS.flatMap(({ href }) => {
      const section = document.querySelector<HTMLElement>(href);
      return section ? [section] : [];
    });
    // 画面上部の読書位置を通過したセクションを現在地にする
    const updateCurrent = () => {
      const readingLine = window.innerHeight * 0.35;
      const section = sections.find((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      });
      if (section) setCurrent(`#${section.id}`);
    };
    let observer: IntersectionObserver;
    let frame = 0;
    const observe = () => {
      observer?.disconnect();
      // rootMarginの百分率は横幅基準なので、高さからpxで読書位置を定める
      const height = window.innerHeight;
      observer = new IntersectionObserver(updateCurrent, {
        rootMargin: `-${height * 0.35}px 0px -${height * 0.64}px 0px`,
        threshold: 0,
      });
      sections.forEach((section) => observer.observe(section));
      updateCurrent();
    };
    const resize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(observe);
    };
    observe();
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let frame = 0;
    let transitionFrame = 0;
    let mounted = true;
    const measure = () => {
      const link = nav.querySelector<HTMLAnchorElement>(`a[href="${current}"]`);
      if (!link) return;
      nav.style.setProperty("--nav-x", `${link.offsetLeft}px`);
      nav.style.setProperty("--nav-y", `${link.offsetTop + link.offsetHeight + 4}px`);
      nav.style.setProperty("--nav-width", `${link.offsetWidth}`);
      nav.dataset.measured = "true";
      // 初回の位置を描画してから遷移を有効にし、左端からの滑り込みを防ぐ
      if (!nav.dataset.animated && !transitionFrame) {
        transitionFrame = requestAnimationFrame(() => {
          transitionFrame = requestAnimationFrame(() => {
            nav.dataset.animated = "true";
            transitionFrame = 0;
          });
        });
      }
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    const resize = new ResizeObserver(schedule);
    resize.observe(nav);
    document.fonts.ready.then(() => { if (mounted) schedule(); });
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(transitionFrame);
      resize.disconnect();
    };
  }, [current]);

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-surface-alt/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-4 sm:px-8">
        <a href="#profile" className="text-[1.0625rem] font-bold text-foreground">
          Nakata Shingo
        </a>
        <nav ref={navRef} className="active-nav relative flex flex-wrap gap-5 sm:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={current === link.href ? "true" : undefined}
              className={`relative text-[0.9375rem] font-medium hover:text-accent-text ${current === link.href ? "text-foreground" : "text-muted"}`}
            >
              {link.label}
            </a>
          ))}
          {/* 幅もscaleXで表現し、レイアウトを動かさず一本の線を移動させる */}
          <span aria-hidden className="nav-indicator pointer-events-none absolute top-0 left-0 h-0.5 w-px origin-left bg-accent" />
        </nav>
      </div>
      <span ref={progressRef} aria-hidden className="scroll-progress pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent" />
    </header>
  );
};

export default Header;

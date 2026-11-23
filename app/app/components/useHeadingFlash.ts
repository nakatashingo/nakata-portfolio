import { useEffect, type RefObject } from "react";

export const useHeadingFlash = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stopWaiting = () => {};
    let stopFlash = () => {};
    const clear = () => {
      stopWaiting();
      stopFlash();
    };
    const click = (event: MouseEvent) => {
      // 別タブで開く操作や既に処理されたクリックは通常のリンクに任せる
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href^='#']") : null;
      if (!link || !nav.contains(link)) return;
      clear();
      if (media.matches) return;
      const section = document.getElementById(link.hash.slice(1));
      const rule = section?.querySelector<HTMLElement>(".heading-rule, .hero-rule");
      if (!section || !rule) return;

      let frame = 0;
      let timer = 0;
      const flash = () => {
        stopWaiting();
        if (media.matches) return;
        // 表示待ちの線も完成形を残し、ヒーローの初回入場は再実行しない
        rule.dataset.arrived = "true";
        if (rule.classList.contains("heading-rule")) rule.dataset.revealState = "visible";
        let flashFrame = 0;
        const finish = (animation: AnimationEvent) => {
          // 線の描画が先に終わっても、光のフェードが終わるまでは属性を保つ
          if (animation.target === rule && animation.animationName === "heading-arrival-glow") stopFlash();
        };
        stopFlash = () => {
          cancelAnimationFrame(flashFrame);
          rule.removeEventListener("animationend", finish);
          rule.removeEventListener("animationcancel", finish);
          delete rule.dataset.flash;
        };
        // 連打で直前のフラッシュを消した場合も、一度描画を挟んで再生する
        flashFrame = requestAnimationFrame(() => {
          flashFrame = requestAnimationFrame(() => {
            rule.addEventListener("animationend", finish);
            rule.addEventListener("animationcancel", finish);
            rule.dataset.flash = "true";
          });
        });
      };
      stopWaiting = () => {
        clearTimeout(timer);
        cancelAnimationFrame(frame);
        window.removeEventListener("scrollend", flash);
      };

      const root = document.documentElement;
      const padding = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
      const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
      const max = Math.max(0, root.scrollHeight - window.innerHeight);
      const destination = Math.max(0, Math.min(max, window.scrollY + section.getBoundingClientRect().top - padding - margin));
      // 同じ場所の再クリックやページ末尾ではscrollendが来ないので、次の描画で到着扱いにする
      if (Math.abs(window.scrollY - destination) <= 1) {
        frame = requestAnimationFrame(flash);
        return;
      }
      if ("onscrollend" in window) window.addEventListener("scrollend", flash);
      // 通知のない環境でも約700ms後に確認し、長いスクロールなら静止するまで待つ
      timer = window.setTimeout(() => {
        let previous = window.scrollY;
        let stable = 0;
        const settled = () => {
          stable = window.scrollY === previous ? stable + 1 : 0;
          previous = window.scrollY;
          if (stable >= 2) flash();
          else frame = requestAnimationFrame(settled);
        };
        frame = requestAnimationFrame(settled);
      }, 700);
    };
    nav.addEventListener("click", click);
    media.addEventListener("change", clear);
    return () => {
      clear();
      nav.removeEventListener("click", click);
      media.removeEventListener("change", clear);
    };
  }, [ref]);
};

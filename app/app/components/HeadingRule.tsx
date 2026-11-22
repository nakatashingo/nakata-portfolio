"use client";

import { useEffect, useRef } from "react";
import { observeReveals } from "@/app/components/motion";

const HeadingRule = () => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) return observeReveals([ref.current], true);
  }, []);
  return <span ref={ref} aria-hidden className="heading-rule pointer-events-none absolute -bottom-4 left-0 h-0.5 w-12 origin-left bg-accent" />;
};

export default HeadingRule;

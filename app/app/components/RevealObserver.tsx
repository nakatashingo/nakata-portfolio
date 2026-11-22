"use client";

import { useEffect } from "react";
import { observeReveals } from "@/app/components/motion";

const RevealObserver = ({ sectionId }: { sectionId: string }) => {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(`#${sectionId} [data-reveal]`));
    return observeReveals(elements);
  }, [sectionId]);
  return null;
};

export default RevealObserver;

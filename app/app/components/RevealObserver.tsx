"use client";

import { useEffect } from "react";
import { observeReveals } from "@/app/components/motion";

const RevealObserver = ({ sectionId }: { sectionId: string }) => {
  useEffect(() => {
    // Skillsは行の入場を検知し、行内の各項目に同じ表示状態を共有する
    const elements = Array.from(document.querySelectorAll<HTMLElement>(`#${sectionId} [data-reveal], #${sectionId} [data-reveal-row]`));
    return observeReveals(elements);
  }, [sectionId]);
  return null;
};

export default RevealObserver;

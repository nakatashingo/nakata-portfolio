import type { WorkItem } from "@/app/types";
import WorkCard from "@/app/components/WorkCard";
import Reveal from "@/app/components/Reveal";
import SectionHeading from "@/app/components/SectionHeading";

interface WorksSectionProps {
  items: WorkItem[];
}

const WorksSection = ({ items }: WorksSectionProps) => (
  <section id="works" className="px-6 py-24 sm:px-8">
    <div className="mx-auto max-w-[1080px]">
      <SectionHeading index="03" title="Works" subtitle="制作物" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-6">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.08} className="h-full">
            <WorkCard item={item} index={index} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WorksSection;

import type { WorkItem } from "@/app/types";
import WorkCard from "@/app/components/WorkCard";
import Reveal from "@/app/components/Reveal";

interface WorksSectionProps {
  items: WorkItem[];
}

const WorksSection = ({ items }: WorksSectionProps) => (
  <section id="works" className="px-8 py-22">
    <div className="mx-auto max-w-[1080px]">
      <Reveal>
        <h1 className="m-0 mb-12 text-center text-3xl font-extrabold tracking-[-0.02em]">Works</h1>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-8">
          {items.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default WorksSection;

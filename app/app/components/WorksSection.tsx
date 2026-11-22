import RevealObserver from "@/app/components/RevealObserver";
import type { WorkItem } from "@/app/types";
import WorkCard from "@/app/components/WorkCard";
import SectionHeading from "@/app/components/SectionHeading";

interface WorksSectionProps {
  items: WorkItem[];
}

const WorksSection = ({ items }: WorksSectionProps) => {
  // 配列の順序を保ちながら、注目作品を一覧の先頭で大きく見せる
  const featuredItems = items.filter((item) => item.featured);
  const otherItems = items.filter((item) => !item.featured);

  return (
    <section id="works" className="py-24">
      <RevealObserver sectionId="works" />
      <div className="mx-auto max-w-[1080px] px-6 sm:px-8">
        <SectionHeading title="Works" subtitle="制作物" />
        <div className="flex flex-col gap-12">
          {featuredItems.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
            {otherItems.map((item) => (
              <WorkCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksSection;

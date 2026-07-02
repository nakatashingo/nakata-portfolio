import type { NewsItem } from "@/app/types";
import NewsCard from "@/app/components/NewsCard";
import Reveal from "@/app/components/Reveal";

interface NewsSectionProps {
  items: NewsItem[];
}

const NewsSection = ({ items }: NewsSectionProps) => (
  <section id="news" className="bg-surface-alt px-8 py-22">
    <div className="mx-auto max-w-[720px]">
      <Reveal>
        <h1 className="m-0 mb-12 text-center text-3xl font-extrabold tracking-[-0.02em]">News</h1>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default NewsSection;

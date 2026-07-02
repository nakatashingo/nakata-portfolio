import type { NewsItem } from "@/app/types";

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard = ({ item }: NewsCardProps) => (
  <article className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-background p-6">
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <h2 className="m-0 text-[1.0625rem] font-bold">{item.title}</h2>
      <time className="text-[0.8125rem] whitespace-nowrap text-gray-500">{item.date}</time>
    </div>
    <p className="m-0 text-[0.9375rem] leading-[1.7] text-gray-300">{item.content}</p>
  </article>
);

export default NewsCard;

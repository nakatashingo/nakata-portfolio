import type { WorkItem } from "@/app/types";

interface WorkCardProps {
  item: WorkItem;
}

const WorkCard = ({ item }: WorkCardProps) => (
  <div className="card-surface flex flex-col overflow-hidden">
    <div className="flex h-45 items-center justify-center bg-black/25">
      <span className="text-[0.8125rem] text-white/60">スクリーンショット準備中</span>
    </div>
    <div className="flex flex-1 flex-col gap-3 p-6">
      <h2 className="m-0 text-[1.0625rem] font-bold text-white">{item.title}</h2>
      <div className="flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/40 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-white"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="m-0 flex-1 text-sm leading-[1.7] text-white/85">{item.description}</p>
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white underline"
        >
          GitHubで見る →
        </a>
      ) : (
        <span className="text-xs text-white/60 italic">リンクは追加予定</span>
      )}
    </div>
  </div>
);

export default WorkCard;

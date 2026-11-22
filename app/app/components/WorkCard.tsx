import type { WorkItem } from "@/app/types";

interface WorkCardProps {
  item: WorkItem;
}

const WorkCard = ({ item }: WorkCardProps) => (
  <article className={`flex h-full min-w-0 flex-col gap-5 ${item.featured ? "border border-line bg-surface p-6 sm:p-10" : "border-t border-line pt-6"}`}>
    <h3 className={`m-0 leading-[1.5] font-bold ${item.featured ? "text-2xl" : "text-xl"}`}>{item.title}</h3>
    {/* 注目作品は本文と技術を横に並べ、説明を読む流れを優先する */}
    <div className={`grid flex-1 gap-5 ${item.featured ? "md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-10" : ""}`}>
      <p className="m-0 max-w-[36em] text-base leading-[1.9] text-muted">{item.description}</p>
      <ul className="m-0 flex list-none flex-wrap content-start gap-x-4 gap-y-2 p-0">
        {item.tags.map((tag) => (
          <li key={tag} className="text-[0.8125rem] font-medium text-accent-text">{tag}</li>
        ))}
      </ul>
    </div>
    {item.link ? (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 w-fit text-[0.9375rem] font-medium text-accent-text underline decoration-1 underline-offset-4 transition-colors hover:text-foreground hover:decoration-2"
      >
        {item.linkLabel ?? "GitHubで見る"}
      </a>
    ) : (
      <span className="mt-1 text-[0.8125rem] text-muted">リンクは追加予定</span>
    )}
  </article>
);

export default WorkCard;

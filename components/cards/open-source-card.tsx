import type { OpenSourceTool } from "@/types";
import { Badge } from "@/components/ui";

export type OpenSourceCardProps = OpenSourceTool;

export function OpenSourceCard({
  name,
  description,
  language,
  languageColor,
  stars,
  forks,
  updated,
  href = "#",
  visibility = "Public",
  contributors = [],
}: OpenSourceCardProps) {
  return (
    <a
      href={href}
      className="group flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 border-b border-stroke hover:bg-surface-layer transition-colors duration-300 last:border-b-0 relative"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 w-px h-0 bg-accent group-hover:h-full transition-all duration-500"
      />

      <div className="flex-1 mb-4 md:mb-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-bone-mute text-[18px]">
            book
          </span>
          <span className="font-body-md text-body-md font-medium text-bone group-hover:text-accent transition-colors">
            {name}
          </span>
          <Badge variant="outline">{visibility}</Badge>
        </div>
        <p className="font-body-sm text-body-sm text-bone-mute mb-3 max-w-2xl">
          {description}
        </p>
        <div className="flex items-center gap-5 font-label-mono text-[10px] text-bone-mute flex-wrap tracking-[0.12em] uppercase">
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: languageColor }}
            />
            <span>{language}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">star</span>
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">
              fork_right
            </span>
            <span>{forks}</span>
          </div>
          <span>{updated}</span>
        </div>
      </div>
      {contributors.length > 0 && (
        <div className="flex -space-x-2">
          {contributors.map((contributor, idx) => (
            <div
              key={idx}
              className="w-8 h-8 rounded-full border border-stroke bg-surface-layer-raised flex items-center justify-center font-label-mono text-[10px] text-bone-mute group-hover:border-stroke-hover transition-colors"
              style={{ zIndex: contributors.length - idx }}
            >
              {contributor.initials}
            </div>
          ))}
        </div>
      )}
    </a>
  );
}

import type { OpenSourceTool } from "@/types";
import { Badge } from "@/components/ui";

type OpenSourceCardProps = OpenSourceTool;

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
    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-stroke hover:bg-surface-layer transition-colors group last:border-b-0">
      <div className="flex-1 mb-4 md:mb-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-outline-variant">
            book
          </span>
          <a
            className="font-body-md text-body-md font-medium text-primary hover:underline"
            href={href}
          >
            {name}
          </a>
          <Badge variant="outline">{visibility}</Badge>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
          {description}
        </p>
        <div className="flex items-center gap-4 font-label-mono text-[10px] text-secondary flex-wrap">
          <div className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: languageColor }}
            />
            <span>{language}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[14px]">star</span>
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
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
              className="w-8 h-8 rounded-full border border-stroke bg-surface-layer-raised flex items-center justify-center font-label-mono text-[10px] text-secondary"
              style={{ zIndex: contributors.length - idx }}
            >
              {contributor.initials}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

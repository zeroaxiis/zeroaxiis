import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types";

export type ProjectCardProps = ProjectItem & {
  className?: string;
  priority?: boolean;
};

export function ProjectCard({
  id,
  title,
  description,
  image_url,
  project_url,
  organization,
  created_at,
  className,
  priority = false,
}: ProjectCardProps) {
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div
      className={cn(
        "group flex flex-col w-full bg-transparent hover:bg-[#1a1a1a] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 relative z-10 h-full overflow-hidden rounded-none",
        className
      )}
    >
      <div className="relative w-full aspect-video overflow-hidden flex-shrink-0">
        <Image
          src={image_url}
          alt={title}
          fill
          priority={priority}
          className="object-cover transition-all duration-300 ease-out group-hover:opacity-80"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute top-3 left-3 bg-accent px-2 py-1 z-20">
          <span className="text-black text-[12px] font-label-mono leading-none flex items-center">
            {organization || "Project"}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5 bg-transparent">
        <h3
          className="text-[18px] font-medium text-bone leading-[1.3] mb-4 line-clamp-2 min-h-[46px]"
          title={title}
        >
          {title}
        </h3>

        <div className="flex items-end justify-between gap-4 mt-auto">
          {description && (
            <div className="text-bone-mute font-body text-[12px] leading-[1.5] line-clamp-3 flex-grow max-w-[70%] prose prose-invert prose-sm prose-p:my-0 prose-headings:my-0 prose-headings:text-[14px] prose-a:text-accent prose-p:text-[12px] prose-p:text-bone-mute prose-p:font-body">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]} components={{ p: 'span' }}>{description}</ReactMarkdown>
            </div>
          )}

          <span className="text-bone-mute font-body text-[12px] whitespace-nowrap flex-shrink-0">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
}

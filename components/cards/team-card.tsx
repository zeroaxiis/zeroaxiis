import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types";
import { ArrowUpRightSmallIcon } from "@/components/icons";

export type TeamCardProps = TeamMember & {
  className?: string;
  priority?: boolean;
};

export function TeamCard({
  name,
  role,
  description,
  image,
  imageAlt,
  socialLinks,
  className,
  priority = false,
}: TeamCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col w-full bg-transparent hover:bg-[#1a1a1a] transition-all duration-300 relative z-10 h-full overflow-hidden rounded-none",
        className
      )}
    >
      {/* Aspect Ratio Thumbnail Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={imageAlt || name}
          fill
          priority={priority}
          className="object-cover object-center grayscale contrast-125 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Role Badge (Neon Accent) */}
        <div className="absolute top-4 left-4 bg-accent px-3 py-1.5 z-20">
          <span className="text-black text-[12px] font-label-mono leading-none flex items-center font-bold tracking-wider uppercase">
            {role}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 bg-transparent">
        <h3 className="font-display text-[28px] md:text-[32px] text-bone leading-[1.2] tracking-tight mb-4 min-h-[38px]">
          {name}
        </h3>

        <p className="text-bone-mute font-body text-[14px] md:text-[15px] leading-[1.6] line-clamp-3 mb-8">
          {description}
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-5 mt-auto">
          {socialLinks?.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-1.5 font-label-mono text-[10px] md:text-[11px] uppercase tracking-widest text-bone-dim hover:text-accent transition-colors"
            >
              <span>{link.label}</span>
              <ArrowUpRightSmallIcon className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

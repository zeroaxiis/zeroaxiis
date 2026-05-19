/* eslint-disable @next/next/no-img-element */
import type { TeamMember } from "@/types";
import { IconButton } from "@/components/ui";

export type TeamMemberCardProps = TeamMember;

export function TeamMemberCard({
  name,
  role,
  description,
  image,
  imageAlt,
  icon,
  socialLinks,
}: TeamMemberCardProps) {
  return (
    <div className="glass-panel p-6 rounded-lg glow-hover transition-all duration-300 group">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-1">
            {name}
          </h3>
          <p className="font-label-mono text-label-mono text-secondary uppercase">
            {role}
          </p>
        </div>
        <IconButton icon={icon} />
      </div>
      <div className="h-card-image-md mb-6 bg-canvas rounded border border-stroke overflow-hidden relative group-hover:border-stroke-hover transition-colors">
        <img
          alt={imageAlt}
          className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
          src={image}
        />
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
        {description}
      </p>
      <div className="flex space-x-4 border-t border-stroke pt-4">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            className="font-label-mono text-label-mono text-secondary hover:text-primary transition-colors"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
import type { Project } from "@/types";
import { TechTag, IconButton } from "@/components/ui";

export type ProjectCardProps = Project;

export function ProjectCard({
  title,
  description,
  tags,
  image,
  imageAlt,
  icon,
  colSpan = "col-span-1",
  height = "h-card-image-lg",
  href = "#",
}: ProjectCardProps) {
  return (
    <article
      className={`card-surface p-8 flex flex-col justify-between min-h-card ${colSpan} group transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            {description}
          </p>
        </div>
        <IconButton icon="open_in_new" href={href} />
      </div>

      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>
        <div
          className={`${height} w-full bg-canvas border border-stroke relative overflow-hidden group-hover:border-stroke-hover transition-colors flex items-center justify-center`}
        >
          {image ? (
            <img
              alt={imageAlt || title}
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
              src={image}
            />
          ) : icon ? (
            <span className="material-symbols-outlined text-4xl text-outline transition-colors group-hover:text-secondary">
              {icon}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

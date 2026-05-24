import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/ui/reveal";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "Thoughts, updates, and stories from the Zeroaxiis team.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="pt-40 pb-40 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_60%)]"
      />

      <Section className="!py-0 mb-24 relative">
        <Container>
          <Reveal>
            <p className="font-label-mono text-label-mono text-bone-mute uppercase tracking-[0.22em] mb-6 flex items-center gap-3">
              <span className="inline-block w-7 h-px bg-accent" />
              Field Notes
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[clamp(56px,9vw,140px)] leading-[0.92] text-bone tracking-[-0.04em] mb-10 text-balance">
              Notes from the{" "}
              <span className="italic text-bone-dim">workshop.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body-md text-body-md text-bone-mute max-w-2xl leading-relaxed">
              Engineering deep-dives, process essays, and the occasional
              opinion. Written by the people doing the work.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="!py-0 relative">
        <Container>
          <ul className="border-t border-stroke">
            {posts.map((post, i) => (
              <Reveal
                key={post.slug}
                delay={i * 0.06}
                as="li"
                className="border-b border-stroke"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid grid-cols-12 gap-6 py-10 hover:bg-surface-layer/40 transition-colors duration-300 px-4 -mx-4"
                >
                  <span className="col-span-12 md:col-span-2 font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute md:pt-3">
                    {String(i + 1).padStart(2, "0")}
                    <span className="opacity-50"> · </span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                  <div className="col-span-12 md:col-span-7">
                    <h2 className="font-display text-[clamp(28px,3.5vw,48px)] leading-[1.05] tracking-[-0.025em] text-bone group-hover:text-accent transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="font-body-md text-body-md text-bone-mute mt-4 max-w-xl">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-3 flex md:justify-end items-start gap-2 flex-wrap md:pt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-label-mono text-[10px] uppercase tracking-[0.18em] text-bone-mute border border-stroke rounded-full px-3 py-1 group-hover:border-accent group-hover:text-accent transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}

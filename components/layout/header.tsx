import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect bg-surface/80 border-b border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-label-mono text-body-md font-medium tracking-tight text-primary"
        >
          {siteConfig.name}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button className="font-label-mono text-label-mono uppercase tracking-widest border border-outline-variant/50 hover:border-primary text-primary px-4 py-2 rounded transition-all duration-300">
          Connect
        </button>
      </div>
    </nav>
  );
}

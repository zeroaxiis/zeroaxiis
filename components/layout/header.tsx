import { getPages } from "@/lib/pages";
import { PageNav } from "./page-nav";

export function Header() {
  const pages = getPages();
  return <PageNav pages={pages} />;
}

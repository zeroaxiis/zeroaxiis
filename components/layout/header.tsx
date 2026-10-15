import { getPages } from "@/lib/pages";
import { TopBar } from "./top-bar";

export function Header() {
  const pages = getPages();
  return <TopBar pages={pages} />;
}

import type { Project, OpenSourceTool } from "@/types";

export const projects: Project[] = [
  {
    title: "Nexus Core",
    description:
      "Distributed event streaming platform for real-time financial data processing. Handles 10M+ events/sec with sub-millisecond latency.",
    tags: ["Rust", "Kafka", "Kubernetes"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq8RAL0vax-2BQkOmutr7gWFfbcc5dN4QbAZnoGyRErIKW7Oxg29oYf1pS_QAWh3-CFzEsmyT56mBWpnoeqPfG-45BIuGgqAdMHGMAXay4e094hA_vrJ8ax0GJKuY5gURNjqnWAa4Jp7h_KzABRt9RjwPjQzjRH32PzDrkGfUKXmPgiKjlWB0SWaxJJR7MaHwhvqgTDOM0Sa3ZJ_ZmI8exAtq5tBGMX_00P80L_1B7e01AqB7dI8L9CZBvscMNRcudB3qGeRSUk0aw",
    imageAlt:
      "Abstract data visualization showing high performance streaming data networks",
    colSpan: "md:col-span-8",
    height: "h-card-image-lg",
  },
  {
    title: "Aura UI",
    description: "Component library for enterprise dashboards.",
    tags: ["React", "Tailwind"],
    icon: "widgets",
    colSpan: "md:col-span-4",
    height: "h-card-image-xs",
  },
  {
    title: "Vanguard Identity",
    description: "Zero-trust authentication gateway.",
    tags: ["Go", "gRPC"],
    icon: "security",
    colSpan: "md:col-span-5",
    height: "h-card-image-xs",
  },
  {
    title: "Quantum State",
    description:
      "Global edge caching network for immutable assets deployed across AWS infrastructure.",
    tags: ["TypeScript", "AWS", "Terraform"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARITO-XTq6VdKE1GffbCnQkxR0QmJ04LdjS5FP_R6zTL6R6raqxND4c2diNSjfnypU_-jtTf6OjOanjUdQiLBXSPVzHELf-mVVKnrVWtC83EnucM7gGkH6NcN8sss9Iw5P2VgeTOz5nL98WJ3swXl6j5ziYWCSWJvCtPFnfAoa9WtPLBspQsdGrLZPcrIclUU0Ua-tq8aVttia_s2wpTm1kmzOdSCLC3FWpHbCYVSR6WKS0unUjn-gWa9to0sxsQK97u4Xchddk9m5",
    imageAlt: "Abstract network nodes glowing in a cinematic dark tech style",
    colSpan: "md:col-span-7",
    height: "h-card-image-sm",
  },
];

export const openSourceTools: OpenSourceTool[] = [
  {
    name: "zeroaxiis/core-utils",
    description:
      "Zero-dependency, heavily optimized standard library extensions for TypeScript environments.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: "4.2k",
    forks: "328",
    updated: "Updated 2 days ago",
    contributors: [{ initials: "JB" }, { initials: "AL" }, { initials: "+5" }],
  },
  {
    name: "zeroaxiis/go-router",
    description:
      "High-performance HTTP multiplexer for Go. Designed for microsecond routing.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: "8.1k",
    forks: "842",
    updated: "Updated 5 days ago",
    contributors: [{ initials: "MK" }, { initials: "TR" }],
  },
  {
    name: "zeroaxiis/kube-ops",
    description:
      "CLI tool for managing complex Kubernetes cluster states across multi-cloud environments.",
    language: "Rust",
    languageColor: "#dea584",
    stars: "1.5k",
    forks: "120",
    updated: "Updated 2 weeks ago",
    contributors: [{ initials: "SV" }],
  },
];

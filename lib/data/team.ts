import type { TeamMember, ContactItem } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "AX-01",
    name: "Elias Vance",
    role: "Systems Architect",
    description:
      "Specializes in distributed systems and high-throughput rust backends.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCERUXPT59vz5srXdc0UJe75R86GLXzBpV4zHgsAb8_HpUBoOtpspHMArqUZXa2eTMYxZwpdLUJE0RU69U1F_10WQ2wonbwAD7kYCH-OwERcsbS5ATYFi308Pvea7LTtQGLyR8otvtexfMPBV_q47sDMj6VIbJQS9mca7wzh609B4vfBJvX8jaeeQ8c7MDi3aF40AF6E7B-7AHMYMsbqE46Sd7BuF1YrvgYvuVjFldIzpeDX3ZRHEeJD2vSb6rX9wCYOlZinwB4bUFp",
    imageAlt: "Team member Elias Vance",
    icon: "code",
    socialLinks: [
      { label: "GitHub", href: "#" },
      { label: "Twitter", href: "#" },
    ],
    specializations: [
      "System Architecture",
      "Backend Engineering",
      "Cloud Infrastructure",
      "Product Strategy"
    ],
    techStack: ["RUST", "TYPESCRIPT", "POSTGRESQL", "AWS", "DOCKER"],
    focus: "Building core infrastructure and distributed systems.",
    since: "2024"
  },
  {
    id: "AX-02",
    name: "Sarah Chen",
    role: "Frontend Engineer",
    description:
      "Focuses on high-performance WebGL interfaces and React architecture.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6r2NfARmSrR1lf7byxDvKpiyqnCvO3MoDc3p8Bh-z13KC_-aGyUKfo66l1JVL5A3EX3VdxORdgl71A3TNQ7wZ7RdLBppHqczyi28HmIgBaZ2bCDTS07r2bzpbXsDIoPGp56EKwPlV7AWGylRi2sjVe3tlZt5vcI2GGK4W9hxyolsMen00q3215v7ZOwGKXuXMPn1IAMwBuvi7Fio_YGkjGSy3mUs0HiqNEEAnmWnPcHM-uLfRCt1UDMZzuj5HDxqEWaBxPbPEwwDL",
    imageAlt: "Team member Sarah Chen",
    icon: "terminal",
    socialLinks: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    specializations: [
      "WebGL rendering",
      "Frontend Architecture",
      "UI/UX Implementation",
      "Performance Tuning"
    ],
    techStack: ["REACT", "THREE.JS", "TYPESCRIPT", "TAILWIND", "NEXT.JS"],
    focus: "Pushing the boundaries of browser rendering.",
    since: "2024"
  },
  {
    id: "AX-03",
    name: "Marcus Thorne",
    role: "Security Researcher",
    description:
      "Expert in cryptographic protocols and smart contract auditing.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7ALyrFrMV_dRyKa-q5j1TciAzbUaxNOO5gIRtoubHNLZwkGOgXXBrI3qvj9Phu8ddv8JCiaI-LFcAZJdIq7FEBZPs9KA_cYqRkLMjmhVGU7Jdz8xpa5jSJ1EAOUauOf0GW_NjalJoWNBGvKcs-WeWPdkViXt0D3do_YEBtgboSoHD1CFJXwidj_JE3LEkCviSgpEdY2pyuShh7WWQf5ww350VvPp7vAbdgcz07ibiDfw09cUTRXt8KSm-bPK2NftspNklsyFcWzQz",
    imageAlt: "Team member Marcus Thorne",
    icon: "shield",
    socialLinks: [
      { label: "GitHub", href: "#" },
      { label: "Twitter", href: "#" },
    ],
    specializations: [
      "Smart Contract Security",
      "Zero-Knowledge Proofs",
      "Network Auditing",
      "Cryptography"
    ],
    techStack: ["SOLIDITY", "CIRCOM", "PYTHON", "RUST", "GO"],
    focus: "Auditing L2 networks and core DeFi primitives.",
    since: "2025"
  },
];

export const contactItems: ContactItem[] = [
  {
    label: "Email",
    value: "zeroaxiis.support@gmail.com",
  },
  {
    label: "Timezone",
    value: "UTC-8 to UTC+2",
  },
];

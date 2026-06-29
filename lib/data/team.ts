import type { TeamMember, ContactItem } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "AX-03",
    slug: "steve",
    name: "Steve",
    role: "Backend Developer",
    description:
      "Building robust APIs, scalable systems, and the invisible logic that powers everything. Mining data. Crafting logic. Building the backbone.",
    image: "/Image/Steve.png",
    imageAlt: "Steve from Minecraft",
    icon: "shield",
    socialLinks: [],
    specializations: [
      "API Development",
      "System Scalability",
      "Data Mining",
      "Core Logic"
    ],
    techStack: ["JAVA", "NODE.JS", "POSTGRESQL", "REDIS"],
    focus: "Crafting the invisible logic that powers everything.",
    since: "2024"
  },
  {
    id: "AX-01",
    slug: "bella-goth",
    name: "Bella Goth",
    role: "Frontend Developer",
    description:
      "Crafting intuitive, responsive, and beautiful user experiences that bring ideas to life. UI/UX is more than design, it's how it feels.",
    image: "/Image/bella.png",
    imageAlt: "Bella Goth from Sims 4",
    icon: "terminal",
    socialLinks: [],
    specializations: [
      "UI/UX Design",
      "Frontend Architecture",
      "Responsive Interfaces",
      "User Experience"
    ],
    techStack: ["REACT", "TYPESCRIPT", "TAILWIND", "NEXT.JS"],
    focus: "Bringing ideas to life through intuitive interfaces.",
    since: "2024"
  },
  {
    id: "AX-02",
    slug: "johnny-silverhand",
    name: "Johnny Silverhand",
    role: "AI Developer",
    description:
      "Turning chaos into code. Building systems that think, adapt, and evolve. Code is logic. AI is imagination. Together, we create intelligence.",
    image: "/Image/Jhonny.png",
    imageAlt: "Johnny Silverhand",
    icon: "code",
    socialLinks: [],
    specializations: [
      "Artificial Intelligence",
      "Machine Learning",
      "System Evolution",
      "Neural Networks"
    ],
    techStack: ["PYTHON", "PYTORCH", "TENSORFLOW", "C++"],
    focus: "Building systems that think and adapt.",
    since: "2023"
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

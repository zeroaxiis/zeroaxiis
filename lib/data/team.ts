import type { TeamMember, ContactItem } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "AX-01",
    name: "Bella Goth",
    role: "Frontend Developer",
    description:
      "Crafting intuitive, responsive, and beautiful user experiences that bring ideas to life. UI/UX is more than design, it's how it feels.",
    image: "/Image/Team_bella.png",
    imageAlt: "Team member Bella Goth",
    icon: "terminal",
    socialLinks: [
      { label: "GitHub", href: "#" },
      { label: "Twitter", href: "#" },
    ],
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
    name: "Johnny Silverhand",
    role: "AI Developer",
    description:
      "Turning chaos into code. Building systems that think, adapt, and evolve. Code is logic. AI is imagination. Together, we create intelligence.",
    image: "/Image/Team_jhonny.png",
    imageAlt: "Team member Johnny Silverhand",
    icon: "code",
    socialLinks: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
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
  {
    id: "AX-03",
    name: "Steve",
    role: "Backend Developer",
    description:
      "Building robust APIs, scalable systems, and the invisible logic that powers everything. Mining data. Crafting logic. Building the backbone.",
    image: "/Image/Team_Steve.png",
    imageAlt: "Team member Steve",
    icon: "shield",
    socialLinks: [
      { label: "GitHub", href: "#" },
      { label: "Twitter", href: "#" },
    ],
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

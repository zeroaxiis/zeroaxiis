import type { TeamMember, ContactItem } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "AX-03",
    slug: "ashish",
    githubProfile: {
      username: "DrDead0",
      followers: "124",
      following: "12",
      repos: 42
    },
    name: "Ashish Chaurasia",
    role: "Backend Developer",
    description:
      "Building robust APIs, scalable systems, and the invisible logic that powers everything. Mining data. Crafting logic. Building the backbone.",
    image: "https://avatars.githubusercontent.com/u/112349103?v=4",
    imageAlt: "Team member Ashish Chaurasia",
    icon: "shield",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/DrDead0" },
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
  {
    id: "AX-01",
    slug: "aashishraj",
    githubProfile: {
      username: "aashishrajdev",
      followers: "892",
      following: "45",
      repos: 28
    },
    name: "Aashish Raj",
    role: "Frontend Developer",
    description:
      "Crafting intuitive, responsive, and beautiful user experiences that bring ideas to life. UI/UX is more than design, it's how it feels.",
    image: "https://avatars.githubusercontent.com/u/113645205?v=4",
    imageAlt: "Team member Aashish Raj",
    icon: "terminal",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/aashishrajdev" },
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
    slug: "atomic-joy",
    githubProfile: {
      username: "Atomic-Joy",
      followers: "4.2k",
      following: "0",
      repos: 15
    },
    name: "Atomic Joy",
    role: "AI Developer",
    description:
      "Turning chaos into code. Building systems that think, adapt, and evolve. Code is logic. AI is imagination. Together, we create intelligence.",
    image: "https://avatars.githubusercontent.com/u/100767870?v=4",
    imageAlt: "Team member Atomic Joy",
    icon: "code",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/Atomic-Joy" },
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
    id: "AX-04",
    slug: "varchasva",
    githubProfile: {
      username: "varchasvakhare2022",
      followers: "24",
      following: "10",
      repos: 15
    },
    name: "Varchasva Khare",
    role: "Full Stack Developer",
    description:
      "Crafting seamless applications from the database to the browser. Bridging the gap between robust logic and fluid interfaces.",
    image: "https://github.com/varchasvakhare2022.png",
    imageAlt: "Team member Varchasva Khare",
    icon: "terminal",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/varchasvakhare2022" },
      { label: "LinkedIn", href: "#" },
    ],
    specializations: [
      "Full Stack Development",
      "API Architecture",
      "System Integration",
      "Web Technologies"
    ],
    techStack: ["TYPESCRIPT", "NEXT.JS", "NODE.JS", "POSTGRESQL"],
    focus: "Bridging the gap between robust logic and fluid interfaces.",
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

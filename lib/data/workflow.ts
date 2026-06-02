import type { WorkflowStep } from "@/types";

export const workflowSteps: WorkflowStep[] = [
  {
    number: "1",
    title: "Ideation",
    description: "System architecture planning and rigorous technical scoping.",
    icon: "lightbulb",
  },
  {
    number: "2",
    title: "Assignment",
    description: "Strategic allocation to specialized domain engineers.",
    icon: "hub",
  },
  {
    number: "3",
    title: "Engineering",
    description: "Precision execution with peer review and automated CI/CD.",
    icon: "code_blocks",
  },
  {
    number: "4",
    title: "Scaling",
    description: "Deployment optimization, monitoring, and sustained growth.",
    icon: "rocket_launch",
    highlight: true,
  },
];

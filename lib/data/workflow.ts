import type { WorkflowStep } from "@/types";

export const workflowSteps: WorkflowStep[] = [
  {
    number: "01",
    title: "Ideation",
    description: "System architecture planning and rigorous technical scoping.",
  },
  {
    number: "02",
    title: "Assignment",
    description: "Strategic allocation to specialized domain engineers.",
  },
  {
    number: "03",
    title: "Engineering",
    description: "Precision execution with peer review and automated CI/CD.",
  },
  {
    number: "04",
    title: "Scaling",
    description: "Deployment optimization, monitoring, and sustained growth.",
    highlight: true,
  },
];

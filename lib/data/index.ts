import type { Project, OpenSourceTool, Contributor, ProjectCategory } from "@/types";
import projectsData from "./projects.json";

export { services } from "./services";
export type { Service } from "@/types";

export { workflowSteps } from "./workflow";
export type { WorkflowStep } from "@/types";

export const projects = projectsData.projects as Project[];
export const openSourceTools = projectsData.openSourceTools as OpenSourceTool[];
export type { Project, OpenSourceTool, Contributor, ProjectCategory };

export { teamMembers, contactItems } from "./team";
export type { TeamMember, ContactItem } from "@/types";

export { testimonials } from "./testimonials";
export type { Testimonial } from "./testimonials";

export { creativeItems } from "./creative";
export type { CreativeItem } from "@/types";

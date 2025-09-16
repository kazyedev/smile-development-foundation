export * from "./programs";
export * from "./projects";

// Re-export common types and schemas
import { programs } from "./programs";
import { projects } from "./projects";

export const schema = {
  programs,
  projects,
};

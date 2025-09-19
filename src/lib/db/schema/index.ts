export * from "./programs";
export * from "./projects";
export * from "./videos";
export * from "./images";
export * from "./mediaCategories";

// Re-export common types and schemas
import { programs } from "./programs";
import { projects } from "./projects";
import { videos } from "./videos";
import { images } from "./images";
import { mediaCategories } from "./mediaCategories";

export const schema = {
  programs,
  projects,
  videos,
  images,
  mediaCategories,
};

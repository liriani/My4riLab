import { assetUrl } from "@/components/ui/ProjectImage";

/** The current CV, served from public/. Swap the file in place to update it everywhere. */
export const cv = {
  href: assetUrl("assets/files/liri-saikoski-cv.pdf"),
  /** Name the browser saves it under. */
  download: "Liri-Saikoski-CV.pdf",
  label: "CV / PDF · 1.2 MB",
};

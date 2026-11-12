import { projects } from "./projects";
import { labCaseMeta } from "./lab/labCaseMeta";

/** The canonical home of the site (see public/CNAME). */
export const SITE_ORIGIN = "https://by4ri.com";
export const SITE_NAME = "By4ri";

export type PageMeta = {
  title: string;
  description: string;
  /** Canonical path, without the origin. */
  path: string;
  /** Kept out of search results and the sitemap. */
  noindex?: boolean;
  /** No such page: no canonical URL to point at. */
  notFound?: boolean;
};

const HOME_DESCRIPTION =
  "4ri (Liri): Creative UI Designer & Design QA. Expressive interfaces designed in Figma, legacy design files restructured into systems, and builds audited for visual and interactive fidelity.";

const labId = (index: number) => String(index + 1).padStart(2, "0");

/**
 * Every route the app serves. The build writes an HTML entry for each one, and
 * the indexable ones go into the sitemap.
 */
export const siteRoutes: string[] = [
  "/",
  "/projects",
  ...projects.map((project) => `/projects/${project.slug}`),
  "/about",
  "/lab",
  ...labCaseMeta.map((_, index) => `/lab/${labId(index)}`),
  "/souvenir",
];

/** Title, description and canonical path for any pathname, including unknown ones. */
export function pageMeta(pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/") {
    return { title: `${SITE_NAME} / Creative UI Designer & Design QA`, description: HOME_DESCRIPTION, path };
  }
  if (path === "/projects") {
    return {
      title: `Work / ${SITE_NAME}`,
      description:
        "Selected case studies in product UI, design systems and design QA: the research, the decisions, and the builds checked against the file.",
      path,
    };
  }
  if (path === "/about") {
    return {
      title: `About / ${SITE_NAME}`,
      description:
        "Liri (4ri), a creative UI designer who came to screens from traditional art: color, contrast and gesture, and the habit of noticing when a build is 4px off.",
      path,
    };
  }
  if (path === "/lab") {
    return {
      title: `The Lab: 16 interaction experiments / ${SITE_NAME}`,
      description:
        "Sixteen interactive experiments for breaking the fourth wall between interface and visitor, each with the idea, the timing and the code.",
      path,
    };
  }
  if (path === "/souvenir") {
    // The hidden room: reachable, but kept out of search so it stays a find.
    return {
      title: `Souvenir / ${SITE_NAME}`,
      description: "A live glitch engine that turns any image into a one-of-one souvenir, in your browser.",
      path,
      noindex: true,
    };
  }

  const project = projects.find((item) => path === `/projects/${item.slug}`);
  if (project) {
    return { title: `${project.title}: case study / ${SITE_NAME}`, description: project.description, path };
  }

  const labIndex = labCaseMeta.findIndex((_, index) => path === `/lab/${labId(index)}`);
  if (labIndex >= 0) {
    const exhibit = labCaseMeta[labIndex];
    return {
      title: `${exhibit.title}: Lab ${labId(labIndex)} / ${SITE_NAME}`,
      description: exhibit.description,
      path,
    };
  }

  return {
    title: `Page not found / ${SITE_NAME}`,
    description: "This page doesn't exist. The work, the lab and the about page are one click away.",
    path,
    noindex: true,
    notFound: true,
  };
}

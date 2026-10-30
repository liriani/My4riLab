import { createBrowserRouter } from "react-router";
import SiteLayout from "@/components/layout/SiteLayout";

function HydrateFallback() {
  return (
    <main className="route-fallback" aria-live="polite" aria-label="Loading page">
      <span>4RI.EXE</span>
      <div>
        <i />
        LOADING SIGNAL
      </div>
    </main>
  );
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    HydrateFallback,
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Component } = await import("../pages/HomePage");
          return { Component };
        },
      },
      {
        path: "projects",
        lazy: async () => {
          const { default: Component } = await import("../pages/ProjectsPage");
          return { Component };
        },
      },
      {
        path: "projects/:slug",
        lazy: async () => {
          const { default: Component } = await import("../pages/ProjectDetail");
          return { Component };
        },
      },
      {
        path: "about",
        lazy: async () => {
          const { default: Component } = await import("../pages/AboutPage");
          return { Component };
        },
      },
      {
        // Unlisted: reached only through the header's wet-paint sign or the
        // reward at the end of /about.
        path: "souvenir",
        lazy: async () => {
          const { default: Component } = await import("../pages/SouvenirPage");
          return { Component };
        },
      },
      {
        path: "lab",
        lazy: async () => {
          const { default: Component } = await import("../pages/InteractionGalleryPage");
          return { Component };
        },
      },
      {
        path: "lab/:caseId",
        lazy: async () => {
          const { default: Component } = await import("../pages/LabCaseStudyPage");
          return { Component };
        },
      },
      {
        path: "*",
        lazy: async () => {
          const { default: Component } = await import("../pages/HomePage");
          return { Component };
        },
      },
    ],
  },
], { basename });

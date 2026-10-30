import { createBrowserRouter } from "react-router";

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
    HydrateFallback,
    lazy: async () => {
      const { default: Component } = await import("../pages/HomePage");
      return { Component };
    },
  },
  {
    path: "/projects",
    HydrateFallback,
    lazy: async () => {
      const { default: Component } = await import("../pages/ProjectsPage");
      return { Component };
    },
  },
  {
    path: "/projects/:slug",
    HydrateFallback,
    lazy: async () => {
      const { default: Component } = await import("../pages/ProjectDetail");
      return { Component };
    },
  },
  {
    path: "/about",
    HydrateFallback,
    lazy: async () => {
      const { default: Component } = await import("../pages/AboutPage");
      return { Component };
    },
  },
  {
    path: "/lab",
    HydrateFallback,
    lazy: async () => {
      const { default: Component } = await import("../pages/InteractionGalleryPage");
      return { Component };
    },
  },
  {
    path: "*",
    HydrateFallback,
    lazy: async () => {
      const { default: Component } = await import("../pages/HomePage");
      return { Component };
    },
  },
], { basename });

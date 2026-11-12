import { useEffect } from "react";
import { useLocation } from "react-router";

/** Finds a head tag, creating it on first use. */
function headTag(selector: string, create: () => HTMLElement) {
  let tag = document.head.querySelector<HTMLElement>(selector);
  if (!tag) {
    tag = create();
    document.head.appendChild(tag);
  }
  return tag;
}

function setMeta(key: "name" | "property", name: string, content: string) {
  headTag(`meta[${key}="${name}"]`, () => {
    const meta = document.createElement("meta");
    meta.setAttribute(key, name);
    return meta;
  }).setAttribute("content", content);
}

/**
 * Keeps the title, description and share tags in step with client-side
 * navigation. The first page arrives with them already in its HTML (written at
 * build time from the same data), so the SEO data is loaded lazily and stays
 * out of the initial bundle.
 */
export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    let active = true;
    import("@/data/seo").then(({ pageMeta, SITE_ORIGIN }) => {
      if (!active) return;
      const meta = pageMeta(pathname);
      const url = SITE_ORIGIN + (meta.path === "/" ? "/" : meta.path);

      document.title = meta.title;
      setMeta("name", "description", meta.description);
      setMeta("property", "og:title", meta.title);
      setMeta("property", "og:description", meta.description);
      if (meta.notFound) {
        document.head.querySelector('link[rel="canonical"]')?.remove();
        document.head.querySelector('meta[property="og:url"]')?.remove();
      } else {
        setMeta("property", "og:url", url);
        headTag('link[rel="canonical"]', () => {
          const link = document.createElement("link");
          link.rel = "canonical";
          return link;
        }).setAttribute("href", url);
      }

      const robots = document.head.querySelector('meta[name="robots"]');
      if (meta.noindex) setMeta("name", "robots", "noindex");
      else robots?.remove();
    });
    return () => {
      active = false;
    };
  }, [pathname]);
}

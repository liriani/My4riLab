import { Outlet, ScrollRestoration } from "react-router";
import Header from "./Header";

/**
 * Every route renders inside this shell, so the header mounts once and never
 * re-lays out between pages. ScrollRestoration resets to the top (or to a
 * #hash target) on navigation and restores the old position on Back.
 */
export default function SiteLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

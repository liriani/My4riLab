import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import BootScreen from "@/components/layout/BootScreen";
import { router } from "./routes";

/** The boot screen stays up at least this long, however fast the first page loads. */
const MIN_BOOT_MS = 2000;
/** Then it fades out over this long. */
const BOOT_FADE_MS = 400;

type BootState = "booting" | "leaving" | "done";

export default function App() {
  const [boot, setBoot] = useState<BootState>("booting");

  useEffect(() => {
    const leave = window.setTimeout(() => setBoot("leaving"), MIN_BOOT_MS);
    const done = window.setTimeout(() => setBoot("done"), MIN_BOOT_MS + BOOT_FADE_MS);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, []);

  return (
    <>
      {/* The router loads the first page underneath, so it's ready when the boot ends. */}
      <RouterProvider router={router} />
      {boot !== "done" && (
        <BootScreen overlay leaving={boot === "leaving"} durationMs={MIN_BOOT_MS} />
      )}
    </>
  );
}

import { useEffect, useState } from "react";

/** Phones and tablets: no hover, and a fingertip instead of a pixel-precise cursor. */
const QUERY = "(hover: none) and (pointer: coarse)";

const matches = () => typeof window !== "undefined" && window.matchMedia(QUERY).matches;

/** Primary input is touch. Updates if that changes (e.g. a tablet docks a trackpad). */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(matches);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const update = () => setCoarse(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return coarse;
}

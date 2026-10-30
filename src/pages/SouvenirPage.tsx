import { Link, useLocation } from "react-router";
import SouvenirStudio from "@/features/glitch/SouvenirStudio";

/** Where a visitor found the hidden room; set as router state by each secret door. */
export type SouvenirEntry = "paint" | "about";

const ENTRY_LABEL: Record<SouvenirEntry, string> = {
  paint: "VIA WET PAINT / HEADER",
  about: "VIA END OF /ABOUT",
};

export default function SouvenirPage() {
  const { state } = useLocation();
  const entry = (state as { from?: SouvenirEntry } | null)?.from;

  return (
    <main className="souvenir-page">
      <header className="souvenir-intro">
        <div className="souvenir-intro-meta">
          <span>HIDDEN ROOM / UNLISTED</span>
          <span className="souvenir-access">
            <i />
            ACCESS LOGGED {entry ? `/ ${ENTRY_LABEL[entry]}` : "/ DIRECT LINE"}
          </span>
        </div>

        <h1>
          YOU FOUND
          <br />
          <span>THE BACK ROOM.</span>
        </h1>

        <div className="souvenir-intro-body">
          <p>
            This page isn&apos;t in the menu. It was left here on purpose for the
            curious: the ones who touched the wet paint in the header, or read the
            About page all the way to the end and still wanted to know more.
          </p>
          <p>
            As a thank-you, take a sample of my work home. Below is the same glitch
            engine that renders my portrait, running live in your browser. Feed it
            the demo signal or your own photo, decide where the damage lands, and
            leave with a one-of-one artifact.
          </p>
          <ol className="souvenir-doors" aria-label="Ways into this room">
            <li><b>01</b> WET PAINT SIGN / HEADER</li>
            <li><b>02</b> END OF THE <Link to="/about">ABOUT</Link> PAGE</li>
          </ol>
        </div>
      </header>

      <SouvenirStudio />

      <footer className="projects-footer">
        <Link to="/">← RETURN HOME</Link>
        <span>© {new Date().getFullYear()} 4RI / LIRI</span>
        <Link to="/about">ABOUT ↗</Link>
      </footer>
    </main>
  );
}

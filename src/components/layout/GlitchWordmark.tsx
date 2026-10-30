import { Link } from "react-router";

export default function GlitchWordmark() {
  return (
    <Link
      className="wordmark text-glitch"
      to="/"
      data-text="4RI"
      aria-label="4ri home"
    >
      4RI
    </Link>
  );
}

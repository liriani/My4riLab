export default function ProjectArtwork({ type }: { type: string }) {
  if (type === "visado") {
    return (
      <div className="art-nodes" aria-hidden="true">
        <i className="node-one">INPUT</i>
        <i className="node-two">MAP</i>
        <i className="node-three">OUTPUT</i>
        <b className="edge-one" />
        <b className="edge-two" />
      </div>
    );
  }

  if (type === "pixelator") {
    return (
      <div className="art-pixels" aria-hidden="true">
        {Array.from({ length: 24 }, (_, index) => (
          <i key={index} />
        ))}
        <strong>PX</strong>
      </div>
    );
  }

  return (
    <div className="art-type" aria-hidden="true">
      <span>{type.slice(0, 2).toUpperCase()}</span>
      <i>INTERFACE / SYSTEM / {type.toUpperCase()}</i>
    </div>
  );
}

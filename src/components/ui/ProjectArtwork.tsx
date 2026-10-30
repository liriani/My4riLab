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

  if (type === "creators") {
    return (
      <div className="art-tiers" aria-hidden="true">
        <i>FREE</i>
        <i>FAN / R$19</i>
        <i>VIP / R$49</i>
        <b>R$</b>
      </div>
    );
  }

  if (type === "healthhub") {
    return (
      <div className="art-health" aria-hidden="true">
        <i className="health-card">
          CONSULTA
          <br />
          14 / 03
        </i>
        <i className="health-qr">
          {Array.from({ length: 16 }, (_, index) => (
            <b key={index} />
          ))}
        </i>
        <i className="health-ping">REMINDER / 24H</i>
      </div>
    );
  }

  if (type === "nohs") {
    return (
      <div className="art-map" aria-hidden="true">
        <i className="map-pin map-pin--one" />
        <i className="map-pin map-pin--two" />
        <i className="map-pin map-pin--three" />
        <i className="map-pin map-pin--safe"><span>SAFE</span></i>
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

import React from "react"

const Bio = ({ acf }) => {
  return (
    <div id="bio" className="model__bio flex flex-column relative">
      {acf.bio.height && (
        <span className="model-bio-property">
          HEIGHT{" "}
          <span className="model-bio-value" style={{ fontWeight: "bold" }}>
            {acf.bio.height} CM
          </span>
        </span>
      )}
      {acf.bio.hair && (
        <span className="model-bio-property">
          HAIR{" "}
          <span className="model-bio-value" style={{ fontWeight: "bold" }}>
            {acf.bio.hair}
          </span>
        </span>
      )}
      {acf.bio.eyes && (
        <span className="model-bio-property">
          EYES{" "}
          <span className="model-bio-value" style={{ fontWeight: "bold" }}>
            {acf.bio.eyes}
          </span>
        </span>
      )}
      {acf.bio.bust && (
        <span className="model-bio-property">
          BUST{" "}
          <span className="model-bio-value" style={{ fontWeight: "bold" }}>
            {acf.bio.bust}
            <span
              style={{
                fontFamily: "Avenir",
                fontWeight: 700,
                fontStyle: "italic",
              }}
            >
              ""
            </span>
          </span>
        </span>
      )}
      {acf.bio.suit && (
        <span className="model-bio-property">
          SUIT{" "}
          <span className="model-bio-value" style={{ fontWeight: "bold" }}>
            {acf.bio.suit}
          </span>
        </span>
      )}
      {acf.bio.shirt && (
        <span className="model-bio-property">
          SHIRT{" "}
          <span className="model-bio-value" style={{ fontWeight: "bold" }}>
            {acf.bio.shirt}
          </span>
        </span>
      )}
      {acf.bio.waist && (
        <span className="model-bio-property">
          WAIST{" "}
          <span className="model-bio-value" style={{ fontWeight: "bold" }}>
            {acf.bio.waist}
            <span
              style={{
                fontFamily: "Avenir",
                fontWeight: 700,
                fontStyle: "italic",
              }}
            >
              ""
            </span>
          </span>
        </span>
      )}
      {acf.bio.hips && (
        <span className="model-bio-property">
          HIPS{" "}
          <span className="model-bio-value" style={{ fontWeight: "bold" }}>
            {acf.bio.hips}
            <span
              style={{
                fontFamily: "Avenir",
                fontWeight: 700,
                fontStyle: "italic",
              }}
            >
              ""
            </span>
          </span>
        </span>
      )}
      {acf.bio.inseam && (
        <span className="model-bio-property">
          INSEAM{" "}
          <span className="model-bio-value" style={{ fontWeight: "bold" }}>
            {acf.bio.inseam}
            <span
              style={{
                fontFamily: "Avenir",
                fontWeight: 700,
                fontStyle: "italic",
              }}
            >
              ""
            </span>
          </span>
        </span>
      )}
      {acf.bio.shoes && (
        <span className="model-bio-property">
          SHOES{" "}
          <span className="model-bio-value" style={{ fontWeight: "bold" }}>
            {acf.bio.shoes}
          </span>
        </span>
      )}
    </div>
  )
}

export default Bio

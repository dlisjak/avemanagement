import React from "react"

const Bio = ({ acf }) => (
  <div id="bio" className="model__bio flex flex-column relative">
    {acf.bio.height && (
      <span className="model-bio-property lowercase">
        HEIGHT <span className="model-bio-value bold">{acf.bio.height} CM</span>
      </span>
    )}
    {acf.bio.hair && (
      <span className="model-bio-property lowercase">
        HAIR <span className="model-bio-value bold">{acf.bio.hair}</span>
      </span>
    )}
    {acf.bio.eyes && (
      <span className="model-bio-property lowercase">
        EYES <span className="model-bio-value bold">{acf.bio.eyes}</span>
      </span>
    )}
    {acf.bio.bust && (
      <span className="model-bio-property lowercase">
        BUST{" "}
        <span className="model-bio-value bold">
          {acf.bio.bust}
          <span className="bold">”</span>
        </span>
      </span>
    )}
    {acf.bio.suit && (
      <span className="model-bio-property lowercase">
        SUIT <span className="model-bio-value bold">{acf.bio.suit}</span>
      </span>
    )}
    {acf.bio.shirt && (
      <span className="model-bio-property lowercase">
        SHIRT{" "}
        <span className="model-bio-value bold">
          {acf.bio.shirt}
          <span className="bold">”</span>
        </span>
      </span>
    )}
    {acf.bio.waist && (
      <span className="model-bio-property lowercase">
        WAIST{" "}
        <span className="model-bio-value bold">
          {acf.bio.waist}
          <span className="bold">”</span>
        </span>
      </span>
    )}
    {acf.bio.hips && (
      <span className="model-bio-property lowercase">
        HIPS{" "}
        <span className="model-bio-value bold">
          {acf.bio.hips}
          <span className="bold">”</span>
        </span>
      </span>
    )}
    {acf.bio.inseam && (
      <span className="model-bio-property lowercase">
        INSEAM{" "}
        <span className="model-bio-value bold">
          {acf.bio.inseam}
          <span className="bold">”</span>
        </span>
      </span>
    )}
    {acf.bio.shoes && (
      <span className="model-bio-property lowercase">
        SHOES <span className="model-bio-value bold">{acf.bio.shoes}</span>
      </span>
    )}
  </div>
)

export default Bio

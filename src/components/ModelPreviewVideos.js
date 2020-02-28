import React from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"

const ModelPreviewVideos = ({ thumbnail, onClick }) => {
  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  return (
    <AnchorLink
      href="#slideshow"
      offset={27}
      className="category-card grid-item"
      onClick={onClick}
      style={{
        height: isMobile ? 125 : 200,
        cursor: "pointer",
        background: "#ccc",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundImage: `url(${thumbnail})`,
          backgroundSize: "contain",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            padding: "20%",
            border: "1px solid white",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              borderLeft: "1px solid white",
              width: "29%",
              height: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              borderLeft: "1px solid white",
              width: "29%",
              height: "50%",
              transform: "rotate(120deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              borderLeft: "1px solid white",
              width: "30%",
              height: "50%",
              transform: "rotate(-120deg)",
            }}
          />
        </div>
      </div>
    </AnchorLink>
  )
}

export default ModelPreviewVideos

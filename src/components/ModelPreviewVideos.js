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
      className="category-card grid-item model-preview"
      onClick={onClick}
    >
      <div
        className="flex relative justify-center align-center model-previews--vid"
        style={{
          backgroundImage: `url(${thumbnail})`,
        }}
      >
        <div className="flex absolute model-previews--vid-inside align-center justify-center">
          <div className="absolute model-previews--vid-inside-two" />
          <div className="absolute model-previews--vid-inside-two -two" />
          <div className="absolute model-previews--vid-inside -three" />
        </div>
      </div>
    </AnchorLink>
  )
}

export default ModelPreviewVideos

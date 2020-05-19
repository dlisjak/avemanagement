import React from "react"

import AnchorLink from "react-anchor-link-smooth-scroll"

const PortfolioImage = ({ url, alt, title, name, onClick }) => (
  <AnchorLink
    role="button"
    href="#slideshow"
    offset={27}
    onClick={onClick}
    className="flex grid-item"
  >
    <img
      src={url}
      alt={alt}
      className="model-portfolio-image"
      title={title}
      name={name}
    />
  </AnchorLink>
)

export default PortfolioImage

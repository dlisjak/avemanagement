import React, { useState } from "react"
import { Link } from "gatsby"
import VizSensor from "react-visibility-sensor"

const VizAwareImg = ({
  id,
  src,
  alt,
  title,
  firstName,
  lastName,
  path,
  index,
}) => {
  const [imgViz, setImgViz] = useState(false)
  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  id = id.replace(" ", "")

  let top = 100
  index++
  index = index % 4

  if (isMobile) {
    if (index % 2) top = 50
  } else {
    if (index === 1) top = 80
    if (index === 2) top = 160
    if (index === 3) top = 240
    if (index === 0) top = 320
  }

  return (
    <VizSensor
      partialVisibility
      minTopValue={50}
      active={imgViz ? false : true}
      onChange={isVisible => {
        setImgViz(isVisible)
      }}
    >
      <Link
        id={id}
        to={path}
        className="flex flex-column justify-between category-card"
        style={{
          opacity: imgViz ? 1 : 0,
          top: imgViz ? 0 : top,
        }}
      >
        <div className="viz-aware">
          <img
            className="category-card-image"
            src={src}
            alt={alt}
            title={title}
          />
        </div>
        <h3 className="category-card-title flex flex-wrap width-100 relative">
          <span className="width-100">{firstName}</span>
          <span className="width-100 last-name-model">{lastName}</span>
        </h3>
      </Link>
    </VizSensor>
  )
}

export default VizAwareImg

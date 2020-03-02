import React, { useState, useEffect } from "react"
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
  lazyLoad,
}) => {
  const [imgViz, setImgViz] = useState(lazyLoad ? false : true)
  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  useEffect(() => {
    setImgViz(lazyLoad ? false : true)
  }, [])

  id = id.replace(" ", "")

  let k = 4
  let top = 50
  if (isMobile) {
    if (index % 2) top = 100
  } else {
    if (index % 2) top = 175
    if (index % 3) top = 200
    if (index % 4) top = 225
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
          position: "relative",
          overflow: "hidden",
          opacity: imgViz ? 1 : 0,
          top: imgViz ? 0 : top,
          transition: "500ms linear",
        }}
      >
        <div style={{ overflow: "hidden", height: "100%", width: "100%" }}>
          <img
            className="category-card-image"
            src={src}
            alt={alt}
            title={title}
          />
        </div>
        <h3
          className="category-card-title flex flex-wrap width-100 relative"
          style={{ marginTop: -3 }}
        >
          <span className="width-100">{firstName}</span>
          <span className="width-100" style={{ top: 15 }}>
            {lastName}
          </span>
        </h3>
      </Link>
    </VizSensor>
  )
}

export default VizAwareImg

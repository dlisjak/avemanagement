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
  lazyLoad,
}) => {
  const [imgViz, setImgViz] = useState(lazyLoad ? false : true)

  useEffect(() => {
    setImgViz(lazyLoad ? false : true)
  }, [])

  id = id.replace(" ", "")

  return (
    <VizSensor
      partialVisibility
      minTopValue={100}
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
          top: imgViz ? 0 : 100,
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

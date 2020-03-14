import React from "react"

import Slider from "./Slider"

const Instagram = ({ posts }) => {
  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  return (
    <Slider>
      {posts.map(({ node }, i) => {
        return (
          <img
            style={{
              maxHeight: 400,
              height: isMobile ? "auto" : "100%",
              width: "auto",
              objectFit: "cover",
            }}
            src={node.localFile.publicURL}
            key={i}
          />
        )
      })}
    </Slider>
  )
}

export default Instagram

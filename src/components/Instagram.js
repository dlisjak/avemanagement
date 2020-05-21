import React from "react"

import Slider from "./Slider"

const Instagram = ({ posts }) => (
  <Slider>
    {posts.map(({ node }, i) => (
      <img
        className="instagram--image"
        style={{
          width: "auto",
        }}
        src={node.localFile.publicURL}
        key={i}
      />
    ))}
  </Slider>
)

export default Instagram

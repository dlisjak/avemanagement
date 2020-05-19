import React from "react"

import Slider from "./Slider"

const Instagram = ({ posts }) => (
  <Slider>
    {posts.map(({ node }, i) => {
      return (
        <img
          className="instagram--image width-auto"
          src={node.localFile.publicURL}
          key={i}
        />
      )
    })}
  </Slider>
)

export default Instagram

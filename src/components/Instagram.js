import React, { Fragment } from "react"
import { graphql } from "gatsby"

import Slider from "./Slider"
import TickerText from "./Ticker"

const Instagram = ({ posts }) => {
  console.log(posts)
  return (
    <Fragment>
      <TickerText title="INSTAGRAM" left={true} />
      <TickerText title="@AVEMANAGEMENT" />
      <TickerText title="#AVEGIRLS #AVEBOYS" left={true} />
      <Slider>
        {posts.edges.map(({ node }, i) => (
          <img
            style={{
              height: "auto",
              width: "100%",
              objectFit: "cover",
            }}
            src={node.localFile.publicURL}
            key={i}
          />
        ))}
      </Slider>
    </Fragment>
  )
}

export default Instagram

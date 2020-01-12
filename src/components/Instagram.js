import React, { Fragment } from "react"
import { Link } from "gatsby"

import Slider from "./Slider"
import TickerText from "./Ticker"

const Instagram = ({ posts }) => {
  return (
    <Fragment>
      <a
        href="https://www.instagram.com/avemanagement/"
        target="_blank"
        rel="noopener"
        style={{ textTransform: "none", textDecoration: "none" }}
      >
        <TickerText title="INSTAGRAM" left={true} />
        <TickerText title="@AVEMANAGEMENT" />
        <TickerText title="#AVEGIRLS #AVEBOYS" left={true} />
      </a>
      <Slider>
        {posts.edges.map(({ node }, i) => (
          <img
            style={{
              height: "100%",
              maxHeight: 300,
              width: "auto",
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

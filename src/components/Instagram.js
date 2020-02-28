import React, { Fragment } from "react"
import { useInView } from "react-intersection-observer"

import Slider from "./Slider"
import TickerText from "./Ticker"

const Instagram = ({ posts }) => {
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0,
  })

  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  return (
    <Fragment>
      <a
        href="https://www.instagram.com/avemanagement/"
        target="_blank"
        rel="noopener"
        style={{ textTransform: "none", textDecoration: "none" }}
      >
        {isMobile ? (
          <TickerText title="INSTAGRAM" left={true} />
        ) : (
          <React.Fragment>
            <TickerText title="INSTAGRAM" left={true} />
            <TickerText title="@AVEMANAGEMENT" />
            <TickerText title="#AVEGIRLS #AVEBOYS" left={true} />
          </React.Fragment>
        )}
      </a>
      <Slider>
        {posts.map(({ node }, i) => {
          if (!(node.localFile || {}).publicURL) return

          return (
            <img
              ref={ref}
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
    </Fragment>
  )
}

export default Instagram

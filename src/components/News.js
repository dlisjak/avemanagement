import React, { useEffect } from "react"
import { Link } from "gatsby"

import Slider from "./Slider"
import TickerText from "./Ticker"

const News = ({ posts }) => {
  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  useEffect(() => {
    const muteVideos = () => {
      setTimeout(() => {
        const vids = Array.from(document.getElementsByTagName("video"))

        vids.map(vid => {
          vid.muted = true
        })
      })
    }

    muteVideos()
  }, [])

  return (
    <>
      <Link
        to="/news/1"
        style={{ textTransform: "none", textDecoration: "none" }}
      >
        <TickerText title="NEWS" />
      </Link>
      <div className="width-100 flex">
        <Slider>
          {posts.map(({ node: { title, acf, height, width } }, i) => {
            if (acf.video_1 && acf.video_1.url) {
              return (
                <video
                  style={{
                    maxHeight: !isMobile && 400,
                    height: isMobile ? "auto" : 400,
                    width: "auto",
                  }}
                  autoPlay
                  muted
                  loop
                  src={acf.video_1.url}
                  key={i}
                />
              )
            } else {
              return (
                <img
                  key={i}
                  style={{
                    maxHeight: !isMobile && 400,
                    minHeight: isMobile ? height : 400,
                    width: isMobile ? "100%" : "auto",
                    objectFit: "cover",
                  }}
                  src={acf.news_post_image.url}
                  alt={title}
                  title={title}
                />
              )
            }
          })}
        </Slider>
      </div>
    </>
  )
}

export default News

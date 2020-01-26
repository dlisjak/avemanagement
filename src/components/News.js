import React, { useEffect } from "react"
import { StaticQuery, Link, graphql } from "gatsby"

import Slider from "./Slider"
import TickerText from "./Ticker"

const News = () => {
  let isMobile
  let coverOrContain
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
    coverOrContain = window.innerWidth < 480 ? "contain" : "cover"
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
      <StaticQuery
        query={graphql`
          query News {
            allWordpressWpNews(limit: 10) {
              edges {
                node {
                  title
                  slug
                  acf {
                    news_post_image {
                      title
                      url
                    }
                    video_1 {
                      url
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ allWordpressWpNews }) => (
          <div className="width-100 flex">
            <Slider>
              {allWordpressWpNews.edges.map(
                ({ node: { title, slug, acf } }, i) => {
                  if (acf.video_1 && acf.video_1.url) {
                    return (
                      <video
                        style={{
                          maxHeight: 400,
                          height: isMobile ? "auto" : "100%",
                          width: "auto",
                        }}
                        autoPlay
                        muted
                        loop
                        src={acf.video_1.url}
                      />
                    )
                  } else {
                    return (
                      <img
                        key={i}
                        style={{
                          maxHeight: 400,
                          height: isMobile ? "auto" : "100%",
                          width: "auto",
                          objectFit: coverOrContain,
                        }}
                        src={acf.news_post_image.url}
                        alt={title}
                        title={title}
                      />
                    )
                  }
                }
              )}
            </Slider>
          </div>
        )}
      />
    </>
  )
}

export default News

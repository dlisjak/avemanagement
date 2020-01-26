import React, { useEffect } from "react"
import { StaticQuery, Link, graphql } from "gatsby"

import Slider from "./Slider"
import TickerText from "./Ticker"

const News = () => {
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
                      <Link
                        to={`/news/${slug}`}
                        style={{
                          height: "100%",
                          width: "auto",
                        }}
                        key={i}
                      >
                        <video
                          style={{
                            height: "auto",
                            maxHeight: 400,
                            width: "100%",
                          }}
                          autoPlay
                          loop
                          src={acf.video_1.url}
                        />
                      </Link>
                    )
                  } else {
                    return (
                      <Link
                        to={`/news/${slug}`}
                        style={{
                          maxHeight: 400,
                          height: isMobile ? "auto" : "100%",
                          width: isMobile ? "100%" : "auto",
                        }}
                        key={i}
                      >
                        <img
                          style={{
                            objectFit: "contain",
                            height: "100%",
                          }}
                          src={acf.news_post_image.url}
                          alt={title}
                          title={title}
                        />
                      </Link>
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

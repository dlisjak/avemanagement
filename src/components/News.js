import React, { useEffect } from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import { useInView } from "react-intersection-observer"

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
                      <Link
                        to={`/news/${slug}`}
                        style={{
                          display: "flex",
                          height: "100%",
                          width: "auto",
                        }}
                        key={i}
                      >
                        <video
                          style={{
                            height: "100%",
                            maxHeight: 400,
                            width: "auto",
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
                          display: "flex",
                          maxHeight: 400,
                          height: isMobile ? "auto" : "100%",
                          width: isMobile ? "100%" : "auto",
                        }}
                        key={i}
                      >
                        <img
                          style={{
                            objectFit: coverOrContain,
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

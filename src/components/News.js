import React, { useEffect } from "react"
import { StaticQuery, Link, graphql } from "gatsby"

import Slider from "./Slider"
import TickerText from "./Ticker"

const News = () => {
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
                          height: "auto",
                          width: "100%",
                        }}
                        key={i}
                      >
                        <video
                          style={{
                            height: "auto",
                            maxHeight: 300,
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
                          display: "flex",
                          maxHeight: 400,
                          height: "auto",
                          width: "100%",
                        }}
                        key={i}
                      >
                        <img
                          style={{
                            objectFit: "cover",
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

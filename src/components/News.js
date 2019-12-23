import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

import Slider from "./Slider"
import TickerText from "./Ticker"

const News = () => {
  return (
    <>
      <TickerText title="NEWS" />
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
                ({ node: { title, slug, acf } }, i) => (
                  <Link
                    to={`/news/${slug}`}
                    style={{ display: "flex" }}
                    key={i}
                  >
                    <img
                      style={{
                        height: "auto",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      src={acf.news_post_image.url}
                      alt={title}
                      title={title}
                    />
                  </Link>
                )
              )}
            </Slider>
          </div>
        )}
      />
    </>
  )
}

export default News

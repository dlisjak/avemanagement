import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

import Slider from "./Slider"
import TickerText from "./Ticker"

const News = () => {
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
                    style={{
                      display: "flex",
                      maxHeight: 300,
                      height: "100%",
                      width: "auto",
                    }}
                    key={i}
                  >
                    <img
                      style={{
                        height: "100%",
                        maxHeight: 300,
                        width: "auto",
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

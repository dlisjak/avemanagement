import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

import Slider from "./Slider"
import TickerText from "./Ticker"

const News = () => (
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
                <img
                  src={acf.news_post_image.url}
                  alt={title}
                  title={title}
                  key={i}
                />
              )
            )}
          </Slider>
        </div>
      )}
    />
  </>
)

export default News

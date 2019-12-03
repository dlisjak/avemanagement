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
                    source_url
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
                <Link to={`/news/${slug}`} key={i}>
                  <img
                    className="news-card-image"
                    src={acf.news_post_image.source_url}
                    alt={title}
                    title={title}
                    style={{ width: "100%" }}
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

import React, { useEffect, useContext } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import BlackBar from "../components/BlackBar"
import Pagination from "../components/Pagination"

const NewsPage = ({ data, pageContext }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const { currentPage, numOfPages } = pageContext
  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  useEffect(() => {
    const setPath = () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("ave-ticker")
        const tickerText = window.location.pathname
        localStorage.setItem("ave-ticker", tickerText)
        dispatch({ type: "SET_PATH", payload: tickerText })
      }
    }
    setPath()
  }, [])

  const formatContent = content => {
    const splitContent = content.split("<p>")
    const lastContent = splitContent.length
    content = splitContent[lastContent - 1]
    content = content.replace("</p>", "")
    return content
  }

  return (
    <Layout showGetToTop={true}>
      <Pagination
        numOfPages={numOfPages}
        currentPage={currentPage}
        isMobile={isMobile}
      />
      <BlackBar height={100} />
      <div className="flex flex-wrap" style={{ marginTop: 5 }}>
        <div className="masonry-with-columns width-100">
          {data.allWordpressWpNews.edges.map(
            ({ node: { title, content, slug, acf } }, index) => (
              <div
                className="flex-column justify-between grid-item"
                key={index}
              >
                <Link
                  to={`/news/${slug}`}
                  className="all-news-card category-card"
                  style={{ textDecoration: "none" }}
                >
                  <img
                    className="model-portfolio-image"
                    src={acf.news_post_image.url}
                    alt={title}
                    style={{ marginBottom: 0 }}
                  />
                  <h3
                    className="category-card-title flex flex-wrap width-100 relative"
                    dangerouslySetInnerHTML={{
                      __html: formatContent(content),
                    }}
                    style={{
                      paddingBottom: 25,
                      marginBottom: 0,
                      textDecoration: "none",
                      lineHeight: 0.8,
                      marginTop: -7,
                    }}
                  />
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query AllNews($skip: Int, $limit: Int) {
    allWordpressWpNews(skip: $skip, limit: $limit) {
      edges {
        node {
          title
          slug
          content
          acf {
            news_post_image {
              title
              url
              width
              height
            }
          }
        }
      }
    }
  }
`
export default NewsPage

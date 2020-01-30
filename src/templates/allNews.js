import React, { useEffect, useContext } from "react"
import { Link, graphql } from "gatsby"
import SmoothImage from "react-smooth-image"

import Layout from "../components/layout"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import BlackBar from "../components/BlackBar"
import Pagination from "../components/Pagination"
import AddressTicker from "../components/AddressTicker"

const NewsPage = ({ data, pageContext }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const { currentPage, numOfPages } = pageContext
  let tickerText

  useEffect(() => {
    // componentDidMount
    const setPath = () => {
      localStorage.removeItem("ave-ticker")
      tickerText = window.location.pathname
      localStorage.setItem("ave-ticker", tickerText)
      dispatch({ type: "SET_PATH", payload: tickerText })
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
    <Layout>
      <Pagination numOfPages={numOfPages} currentPage={currentPage} />
      <BlackBar height={100} />
      <div id="content" className="flex flex-wrap" style={{ marginTop: 5 }}>
        <div className="masonry-with-columns width-100">
          {data.allWordpressWpNews.edges.map(
            ({ node: { title, content, slug, acf } }, index) => {
              const ratio =
                acf.news_post_image.height / acf.news_post_image.width
              return (
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
            }
          )}
        </div>
      </div>
      <AddressTicker />
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

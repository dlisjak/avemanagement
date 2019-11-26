import React, { useEffect } from "react"
import { Link } from "gatsby"
if (window) {
  import Colcade from "colcade"
}

import Layout from "../components/layout"
import Ticker from "../components/Ticker"

const NewsPage = ({ data, pageContext }) => {
  const { currentPage, numOfPages } = pageContext
  useEffect(() => {
    // componentDidMount
    const initGrid = async () => {
      var grid = document.querySelector(".grid")
      if (!window) return
      var colc = new Colcade(grid, {
        columns: ".grid-col",
        items: ".grid-item",
      })
    }
    initGrid()
  }, [])

  const formatContent = content => {
    const splitContent = content.split("<p>")
    const lastContent = splitContent.length
    content = splitContent[lastContent - 1]
    content = content.replace("</p>", "")
    content = content.split(" ")
    content[0] = `<b>${content[0]}</b>`
    content[1] = `<b>${content[1]}</b>`
    content = content.join(" ")
    return content
  }

  return (
    <Layout>
      <Ticker title="NEWS" />
      <div className="grid" style={{ marginTop: 50 }}>
        <div className="grid-col grid-col--1"></div>
        <div className="grid-col grid-col--2"></div>
        <div className="grid-col grid-col--3"></div>
        <div className="grid-col grid-col--4"></div>

        {data.allWordpressWpNews.edges.map(
          ({ node: { title, content, slug, acf } }, index) => (
            <div
              className="grid-item news-card"
              style={{ minWidth: 250 }}
              key={index}
            >
              <Link to={`/news/${slug}`} key={index}>
                <img
                  src={acf.news_post_image.url}
                  style={{ marginBottom: 0 }}
                />
              </Link>
              <div
                className="news-card-title"
                dangerouslySetInnerHTML={{ __html: formatContent(content) }}
              />
            </div>
          )
        )}
      </div>
      <div
        className="flex justify-center align-center"
        style={{ position: "relative", height: 50, marginBottom: 50 }}
      >
        {currentPage !== 1 && currentPage > 3 && (
          <Link className="pagination-item first" to={`/news/1`}>
            1
          </Link>
        )}
        {currentPage !== 1 && (
          <Link
            className="pagination-item prev"
            to={`/news/${currentPage - 1}`}
          >
            {currentPage - 1}
          </Link>
        )}
        <div className="pagination-item current">
          <b>{currentPage}</b>
        </div>
        {currentPage === numOfPages ? null : (
          <Link
            className="pagination-item next"
            to={`/news/${currentPage + 1}`}
          >
            {currentPage + 1}
          </Link>
        )}
        {currentPage !== numOfPages && currentPage < numOfPages - 3 && (
          <Link className="pagination-item last" to={`/news/${numOfPages}`}>
            {numOfPages}
          </Link>
        )}
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
          acf {
            news_post_image {
              url
              title
              height
              width
              name
            }
          }
          content
        }
      }
    }
  }
`
export default NewsPage

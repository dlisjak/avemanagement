import React, { useEffect, useContext } from "react"
import { Link } from "gatsby"
import SmoothImage from "react-smooth-image"

import Layout from "../components/layout"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import BlackBar from "../components/BlackBar"
import Pagination from "../components/Pagination"

const NewsPage = ({ data, pageContext }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const { currentPage, numOfPages } = pageContext
  let Colcade
  let tickerText

  useEffect(() => {
    // componentDidMount
    const initGrid = async () => {
      const grid = document.querySelector(".grid")

      if (typeof window !== "undefined") {
        Colcade = require("colcade")
        const colc = new Colcade(grid, {
          columns: ".grid-col",
          items: ".grid-item",
        })
      }
    }
    const setPath = () => {
      localStorage.removeItem("ave-ticker")
      tickerText = window.location.pathname
      localStorage.setItem("ave-ticker", tickerText)
      dispatch({ type: "SET_PATH", payload: tickerText })
    }
    setPath()
    initGrid()
  }, [])

  const formatContent = content => {
    const splitContent = content.split("<p>")
    const lastContent = splitContent.length
    content = splitContent[lastContent - 1]
    content = content.replace("</p>", "")
    content = content.split(" ")
    content[0] = `<b><span class="news-bold-title">${content[0]}`
    content[1] = `${content[1]}</span> <br />`
    content = content.join(" ")
    content += "</b>"
    return content
  }

  return (
    <Layout>
      <Pagination numOfPages={numOfPages} currentPage={currentPage} />
      <BlackBar height={100} />
      <div id="content" className="grid" style={{ marginTop: 5 }}>
        <div className="grid-col grid-col--1"></div>
        <div className="grid-col grid-col--2"></div>
        <div className="grid-col grid-col--3"></div>
        <div className="grid-col grid-col--4"></div>

        {data.allWordpressWpNews.edges.map(
          ({ node: { title, content, slug, acf } }, index) => {
            const ratio = acf.news_post_image.height / acf.news_post_image.width
            return (
              <div
                className="flex-column justify-between grid-item"
                key={index}
              >
                <Link
                  to={`/news/${slug}`}
                  className="all-news-card"
                  style={{ textDecoration: "none" }}
                >
                  <SmoothImage
                    src={acf.news_post_image.url}
                    alt={title}
                    transitionTime={0.5}
                    containerStyles={{
                      paddingBottom: `${ratio * 100}%`,
                    }}
                    style={{ marginBottom: 0 }}
                  />
                  <h3
                    dangerouslySetInnerHTML={{ __html: formatContent(content) }}
                    style={{
                      fontWeight: 400,
                      color: "rgba(0,0,0,0.2)",
                      paddingBottom: 25,
                      marginBottom: 0,
                      textDecoration: "none",
                      fontSize: "1.5rem",
                      lineHeight: 0.9,
                    }}
                  />
                </Link>
              </div>
            )
          }
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

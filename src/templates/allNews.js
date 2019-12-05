import React, { useEffect } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import SmoothImage from 'react-smooth-image';

import Layout from "../components/layout"
import Ticker from "../components/Ticker"

const NewsPage = ({ data, pageContext }) => {
  const { currentPage, numOfPages } = pageContext
  let Colcade
  console.log(data)

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
              style={{ marginTop: 10 }}
              className="grid-item news-card"
              key={index}
            >
              <Link to={`/news/${slug}`} style={{ textDecoration: "none" }}>
                <Img
                  fluid={acf.news_post_image.localFile.childImageSharp.fluid}
                  alt={title}
                  transitionTime={0.5}
                  containerStyles={{ paddingBottom: "130%" }}
                  style={{ marginBottom: 0 }}
                />
                <div
                  style={{ textDecoration: "none", color: "black" }}
                  className="news-card-title"
                  dangerouslySetInnerHTML={{ __html: formatContent(content) }}
                />
              </Link>
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
          content
          acf {
            news_post_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }

`
export default NewsPage

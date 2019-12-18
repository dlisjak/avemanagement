import React, { useContext, useState, useEffect } from "react"
import SmoothImage from "react-smooth-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const News = ({ pageContext, data }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [image, setImage] = useState(data.wordpressWpNews.acf.news_post_image)
  const [tab, setTab] = useState("GALLERY")
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
      tickerText = typeof window !== "undefined" ? window.location.pathname : ""
      dispatch({ type: "SET_PATH", payload: tickerText })
    }
    setPath()
    initGrid()

    return () => {
      localStorage.setItem("ave-ticker", tickerText)
    }
  }, [])

  console.log(pageContext)
  console.log(data)

  const formatContent = content => {
    const splitContent = content.split("<p>")
    const lastContent = splitContent.length
    content = splitContent[lastContent - 1]
    content = content.replace("</p>", "")
    content = content.split(" ")
    content[0] = `<b>${content[0]}</b>`
    content[1] = `<b>${content[1]}</b> </br>`
    content = content.join(" ")
    return content
  }

  return (
    <Layout>
      <div
        className="flex flex-column content-padding"
        style={{ marginBottom: 50 }}
      >
        <h2
          className="news-card-title model__name "
          dangerouslySetInnerHTML={{
            __html: formatContent(pageContext.content),
          }}
          style={{ fontWeight: 400 }}
        />
        <img
          className="news-card__image"
          src={image.url}
          alt={data.wordpressWpNews.acf.news_post_image.title}
          style={{
            marginBottom: 0,
            objectFit: "contain",
            height: "auto",
            maxHeight: 620,
          }}
        />
        <div className="flex model__menu">
          {data.allNews.edges.length &&
          data.allNews.edges[0] &&
          data.allNews.edges[0].node &&
          data.allNews.edges[0].node.acf &&
          data.allNews.edges[0].node.acf.video ? (
            <div
              href="#content"
              onClick={() => setTab("VIDEOS")}
              style={{
                cursor: "pointer",
                color: "black",
                textDecoration: "none",
                fontWeight: tab === "VIDEOS" ? 700 : 400,
              }}
            >
              VIDEOS
            </div>
          ) : null}
          {data.allNews.edges &&
          data.allNews.edges.length &&
          data.allNews.edges[0].node.acf &&
          data.allNews.edges[0].node.acf.gallery_image ? (
            <div
              href="#content"
              onClick={() => setTab("GALLERY")}
              style={{
                cursor: "pointer",
                color: "black",
                textDecoration: "none",
                fontWeight: tab === "GALLERY" ? 700 : 400,
              }}
            >
              GALLERY
            </div>
          ) : null}
        </div>
        {tab === "GALLERY" ? (
          <div
            id="content"
            className="flex flex-wrap grid"
            style={{ marginTop: 5 }}
          >
            <>
              <div className="grid-col grid-col--1"></div>
              <div className="grid-col grid-col--2"></div>
              <div className="grid-col grid-col--3"></div>
              <div className="grid-col grid-col--4"></div>
              {data.allNews.edges &&
              data.allNews.edges.length &&
              data.allNews.edges[0] &&
              data.allNews.edges[0].node &&
              data.allNews.edges[0].node.acf
                ? data.allNews.edges[0].node.acf.gallery_image.map(
                    ({ description, height, url, width, title }, index) => {
                      const ratio = height / width
                      return (
                        <div
                          role="button"
                          className="flex-column justify-between grid-item"
                          onClick={() => {
                            setImage({ title, url })
                            window.scrollTo(0, 27)
                          }}
                          style={{ cursor: "pointer", marginBottom: 5 }}
                          key={index}
                        >
                          <SmoothImage
                            src={url}
                            className="model-portfolio-image"
                            transitionTime={0.5}
                            containerStyles={{
                              paddingBottom: `${ratio * 100}%`,
                            }}
                            imageStyles={{ height: "100%", objectFit: "cover" }}
                            title={title}
                          />
                        </div>
                      )
                    }
                  )
                : null}
            </>
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.allNews.edges[0].node.acf.video,
            }}
          />
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query AllNewsQuery($slug: String) {
    wordpressWpNews(slug: { eq: $slug }) {
      title
      slug
      content
      acf {
        news_post_image {
          title
          width
          url
          height
        }
      }
    }
    allNews(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          acf {
            video
            gallery_image {
              description
              height
              url
              width
              title
            }
          }
          id
          slug
        }
      }
    }
  }
`

export default News

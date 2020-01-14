import React, { useContext, useState, useEffect } from "react"
import { graphql } from "gatsby"
import AnchorLink from "react-anchor-link-smooth-scroll"

import Layout from "../components/layout"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import AddressTicker from "../components/AddressTicker"
import BlackBar from "../components/BlackBar"
import ModelVideo from "../components/ModelVideo"
import ModelPreviewVideos from "../components/ModelPreviewVideos"

const News = ({
  pageContext: { content },
  data: {
    allNews,
    wordpressWpNews: { title, slug, acf },
  },
}) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [image, setImage] = useState(acf.news_post_image)
  const [tab, setTab] = useState("GALLERY")

  const videos = [
    {
      video: acf.video_1,
      thumbnail: acf.thumbnail_1,
    },
    {
      video: acf.video_2,
      thumbnail: acf.thumbnail_2,
    },
  ]

  if (!allNews.edges[0].node.acf.gallery_image) {
    allNews.edges[0].node.acf.gallery_image = []
  }

  acf.video_1 = ""

  const newsContent = [...allNews.edges[0].node.acf.gallery_image, ...videos]

  console.log({ newsContent })

  useEffect(() => {
    // componentDidMount
    const initGrid = async () => {
      const grid = document.querySelector(".grid")

      if (typeof window !== "undefined") {
        const Colcade = require("colcade")
        const colc = new Colcade(grid, {
          columns: ".grid-col",
          items: ".grid-item",
        })
      }
    }
    if (typeof window !== "undefined") {
      let tickerText
      tickerText = localStorage.getItem("ave-ticker")
      dispatch({ type: "SET_PATH", payload: tickerText })
    }
    initGrid()
  }, [dispatch])

  const formatContent = content => {
    const splitContent = content.split("<p>")
    const lastContent = splitContent.length
    content = splitContent[lastContent - 1]
    content = content.replace("</p>", "")
    content = content.split(" ")
    content[0] = `<b class="black-font">${content[0]}`
    content[1] = `${content[1]}</b> </br>`
    content = content.join(" ")
    return content
  }

  return (
    <Layout>
      <div
        className="flex flex-column content-padding"
        style={{ marginBottom: 50, alignItems: "flex-start" }}
      >
        <h2
          className="news-card-title model__name "
          dangerouslySetInnerHTML={{
            __html: formatContent(content),
          }}
          style={{
            fontWeight: 700,
            color: "#ccc",
            marginTop: 0,
            marginBottom: 5,
          }}
        />
        <BlackBar height={100} />
        <img
          id="slideshow"
          className="news-card__image"
          src={image.url}
          alt={acf.news_post_image.title}
          style={{
            objectFit: "contain",
            height: "auto",
            maxHeight: 760,
            marginTop: 5,
            marginBottom: 5,
          }}
        />
        <BlackBar height={100} />
        <div
          id="content"
          className="flex flex-wrap grid width-100"
          style={{ marginTop: 5 }}
        >
          <div className="grid-col grid-col--1"></div>
          <div className="grid-col grid-col--2"></div>
          <div className="grid-col grid-col--3"></div>
          <div className="grid-col grid-col--4"></div>
          {newsContent &&
            newsContent.map(({ url, title }, index) => {
              return (
                <AnchorLink
                  role="button"
                  offset={205}
                  href="#slideshow"
                  className="flex-column justify-between grid-item"
                  onClick={() => setImage({ title, url })}
                  style={{
                    cursor: "pointer",
                    marginBottom: 5,
                    display: "block",
                  }}
                  key={index}
                >
                  <img
                    src={url}
                    className="model-portfolio-image"
                    title={title}
                  />
                </AnchorLink>
              )
            })}
        </div>
        {tab === "videos" && (
          <div
            className="category-cards"
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {acf.videos &&
              acf.videos.map(({ video, thumbnail }, index) => (
                <ModelPreviewVideos thumbnail={thumbnail.url} key={index} />
              ))}
          </div>
        )}
      </div>
      <AddressTicker />
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
        video_2 {
          url
          filename
        }
        news_post_image {
          title
          width
          url
          height
        }
        thumbnail_2 {
          url
          filename
        }
      }
    }
    allNews(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          acf {
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

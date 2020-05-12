import React, { useContext, useState, useEffect } from "react"
import { graphql } from "gatsby"
import AnchorLink from "react-anchor-link-smooth-scroll"

import Layout from "../components/layout"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import BlackBar from "../components/BlackBar"
import ModelVideo from "../components/ModelVideo"
import NewsPreviewVideos from "../components/NewsPreviewVideos"

const News = ({
  pageContext: { content },
  data: {
    allNews,
    wordpressWpNews: { acf },
  },
}) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [image, setImage] = useState(acf.news_post_image)
  const [video, setVideo] = useState(null)

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

  let newsContent = []

  const galleryImages =
    allNews &&
    allNews.edges[0] &&
    allNews.edges[0].node &&
    allNews.edges[0].node.acf
      ? allNews.edges[0].node.acf.gallery_image
      : []
  if (galleryImages && galleryImages.length > 0) {
    newsContent = [...galleryImages, ...videos]
  } else {
    newsContent = videos
  }

  useEffect(() => {
    // componentDidMount
    const initGrid = async () => {
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

  const setUpVideo = video => {
    setImage(null)
    setVideo(video.url)
  }

  const setUpImage = (title, url) => {
    setVideo(null)
    setImage(title, url)
  }

  return (
    <Layout showGetToTop={true}>
      <div
        className="flex flex-column"
        style={{ marginBottom: 50, alignItems: "flex-start" }}
      >
        <h2
          className="news-card-title model__name content-padding"
          dangerouslySetInnerHTML={{
            __html: formatContent(content),
          }}
          style={{
            fontWeight: 700,
            color: "black",
            marginTop: 0,
            width: "75%",
            lineHeight: 0.7,
          }}
        />
        <BlackBar height={100} />
        <div
          id="news-slideshow"
          className="content-padding flex justify-center"
          style={{
            marginTop: 5,
            padding: "25 0",
            marginBottom: video ? 0 : 5,
            width: "100%",
            background: "#ccc",
          }}
        >
          {image && !video && (
            <img
              className="news-card__image"
              src={image.url}
              alt={acf.news_post_image.title}
              style={{
                objectFit: "contain",
                height: "auto",
                maxHeight: 760,
                padding: "10px 0",
                width: "95vw",
              }}
            />
          )}
          {video && !image && <ModelVideo videoUrl={video} />}
        </div>
        <BlackBar height={100} />

        <div id="content" className="flex flex-wrap " style={{ marginTop: 5 }}>
          <div className="width-100 masonry-with-columns" style={{}}>
            {newsContent &&
              newsContent.map(({ url, title, video, thumbnail }, index) => {
                if (video && thumbnail) {
                  return (
                    <AnchorLink
                      role="button"
                      offset={205}
                      href="#news-slideshow"
                      className="flex-column justify-between grid-item"
                      onClick={() => setUpVideo(video)}
                      style={{
                        cursor: "pointer",
                        marginBottom: 5,
                        display: "inline-block",
                        height: "100%",
                        minHeight: 250,
                      }}
                      key={index}
                    >
                      <NewsPreviewVideos
                        thumbnail={thumbnail.url}
                        key={index}
                      />
                    </AnchorLink>
                  )
                } else if (url) {
                  return (
                    <AnchorLink
                      role="button"
                      offset={205}
                      href="#news-slideshow"
                      className="flex-column justify-between grid-item"
                      onClick={() => setUpImage({ title, url })}
                      style={{
                        cursor: "pointer",
                        marginBottom: 5,
                        display: "inline-block",
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
                }
              })}
          </div>
        </div>
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

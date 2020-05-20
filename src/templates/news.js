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
    {
      video: acf.video_3,
      thumbnail: acf.thumbnail_3,
    },
    {
      video: acf.video_4,
      thumbnail: acf.thumbnail_4,
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
      <div className="flex flex-column new-main-container">
        <div className="flex justify-between">
          <h2
            className="news-card-title model__name content-padding"
            dangerouslySetInnerHTML={{
              __html: formatContent(content),
            }}
          />
          <button
            className="category-search category-search__button news-back-button"
            onClick={() => window.history.back()}
          >
            *back
          </button>
        </div>

        <BlackBar height={100} />
        <div
          id="news-slideshow"
          className="flex justify-center news-slideshow--video"
        >
          {image && !video && (
            <img
              className="news-card__image"
              src={image.url}
              alt={acf.news_post_image.title}
            />
          )}
          {video && !image && <ModelVideo videoUrl={video} />}
        </div>
        <hr className="hr-news" />
        <BlackBar height={100} />
        <hr className="hr-news bottom" />

        <div id="content" className="flex flex-wrap ">
          <div className="width-100 masonry-with-columns">
            {newsContent &&
              newsContent.map(({ url, title, video, thumbnail }, index) => {
                if (video && thumbnail) {
                  return (
                    <AnchorLink
                      role="button"
                      offset={20}
                      href="#news-slideshow"
                      className="flex-column justify-between grid-item news-grid-item"
                      onClick={() => setUpVideo(video)}
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
                      offset={20}
                      href="#news-slideshow"
                      className="flex-column justify-between grid-item news-grid-item-img"
                      onClick={() => setUpImage({ title, url })}
                      key={index}
                    >
                      <img
                        src={url}
                        alt=""
                        className="model-portfolio-image"
                        title={title}
                      />
                    </AnchorLink>
                  )
                } else return null
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

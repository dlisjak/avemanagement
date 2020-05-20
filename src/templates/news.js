import React, { useContext, useState, useEffect } from "react"
import { graphql } from "gatsby"
import AnchorLink from "react-anchor-link-smooth-scroll"
import Swiper from "react-id-swiper"

import "../css/swiper.min.css"

import Layout from "../components/layout"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import BlackBar from "../components/BlackBar"
import ModelVideo from "../components/ModelVideo"
import NewsPreviewVideos from "../components/NewsPreviewVideos"
import Model from "./model"

const News = ({
  pageContext: { content },
  data: {
    allNews,
    wordpressWpNews: { acf },
  },
}) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [swiper, updateSwiper] = useState(null)
  const [videoEnd, setVideoEnded] = useState(false)

  const startVideoPlaying = () => {
    if (!videoEnd) return
    const video = document.querySelector("video")
    setVideoEnded(false)
    video.play()
  }

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

  let params = {
    centeredSlides: true,
    autoHeight: true,
    slideClass: "model-swiper-slide",
    slidesPerView: 1,
    spaceBetween: 5,
  }

  useEffect(() => {
    const initGrid = async () => {
      let tickerText
      tickerText = localStorage.getItem("ave-ticker")
      dispatch({ type: "SET_PATH", payload: tickerText })
    }
    initGrid()
  }, [dispatch])

  useEffect(() => {
    const muteVideos = () => {
      document.querySelectorAll("video").forEach(vid => {
        vid.muted = "true"
      })
    }

    const swiperUpdate = () => {
      setTimeout(() => {
        if (swiper !== null) {
          swiper.update()
        }
      }, 500)
    }

    muteVideos()
    swiperUpdate()
  }, [swiper, newsContent])

  const checkIfVideoInSwiper = () => {
    const activeSlide = document
      .querySelector(".swiper-slide-active")
      .querySelector("video")
    if (!activeSlide) {
      document.querySelectorAll("video").forEach(vid => {
        vid.pause()
        vid.currentTime = 0
      })
    } else {
      activeSlide.play()
    }
  }

  const navigateSliderNext = () => {
    if (swiper !== null) {
      swiper.slideNext()

      checkIfVideoInSwiper()
    }
  }

  const navigateSliderPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev()

      checkIfVideoInSwiper()
    }
  }

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
          className="flex justify-center news-slideshow--video relative"
        >
          {newsContent && (
            <>
              <Swiper loop key={1} {...params} getSwiper={updateSwiper}>
                {newsContent.map((content, i) => {
                  if (content.video && content.video.url) {
                    return (
                      <div className="news-video--container">
                        <ModelVideo
                          videoUrl={content.video.url}
                          showVideoEnd={false}
                        />
                      </div>
                    )
                  }

                  if (content.url) {
                    return (
                      <img
                        key={i}
                        src={content.url}
                        alt={content.alt}
                        className="relative flex justify-center model-portfolio-image--swiper"
                        title={content.title}
                        name={content.name}
                        style={{ maxHeight: 760 }}
                      />
                    )
                  }
                })}
              </Swiper>
              <span
                offset={27}
                className="absolute model-slider-navigate prev"
                onClick={() => navigateSliderPrev()}
                style={{
                  display: "block",
                  height: "100%",
                }}
              />
              <span
                offset={27}
                className="absolute model-slider-navigate next"
                onClick={() => navigateSliderNext()}
                style={{
                  display: "block",
                  height: "100%",
                }}
              />
            </>
          )}
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
                      onClick={() => console.log(video)}
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
                      onClick={() => console.log({ title, url })}
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

import React, { useState, useEffect, useContext } from "react"
import Layout from "../components/layout"
import BlackBar from "../components/BlackBar"
import Swiper from "react-id-swiper"
import AnchorLink from "react-anchor-link-smooth-scroll"

import "../components/swiper.css"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import Bio from "../components/Bio"
import ModelName from "../components/ModelName"
import ModelVideo from "../components/ModelVideo"
import ModelPreviewVideos from "../components/ModelPreviewVideos"

const Model = ({ pageContext: { firstName, lastName, acf } }) => {
  const dispatch = useContext(GlobalDispatchContext)

  const mainVideo =
    acf.videos[0] && acf.videos[0].video && acf.videos[0].video.url

  const [swiper, updateSwiper] = useState(null)
  const [videoUrl, selectVideo] = useState(mainVideo || null)
  const [tab, setTab] = useState("portfolio")

  const isVideoAvailable = acf.videos.some(
    ({ video, thumbnail }) => video !== null && thumbnail !== null
  )

  let isMobile
  let isTablet
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
    isTablet = window.innerWidth < 850
  }

  let params = {
    centeredSlides: true,
    autoHeight: true,
    slideClass: "model-swiper-slide",
    slidesPerView: 1,
    spaceBetween: 5,
  }
  let tickerText

  useEffect(() => {
    // componentDidMount

    const setPath = () => {
      if (typeof window !== "undefined") {
        tickerText = localStorage.getItem("ave-ticker")
        dispatch({ type: "SET_PATH", payload: tickerText })
        dispatch({
          type: "SET_MODEL_INDEX",
          payload: (firstName + lastName).replace(" ", ""),
        })
      }
    }

    setPath()
  }, [])

  useEffect(() => {
    const swiperUpdate = () => {
      setTimeout(() => {
        if (swiper !== null) {
          swiper.update()
        }
      }, 500)
    }

    swiperUpdate()
  }, [swiper])

  const navigateSliderNext = () => {
    if (swiper !== null) {
      swiper.slideNext()
    }
  }

  const navigateSliderPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev()
    }
  }

  const setImage = index => {
    setTimeout(() => {
      if (swiper !== null) {
        swiper.slideTo(index + 1, 1500, false)
      }
    })
  }

  return (
    <Layout showGetToTop={true}>
      <div className="flex model flex-column">
        <ModelName firstName={firstName} lastName={lastName} />
        <BlackBar height={100} />
        <div
          id="slideshow"
          className="flex model__main"
          style={{
            position: "relative",
            marginBottom: tab === "videos" ? 0 : 5,
            background: tab === "bio" ? "white" : "#ccc",
            flexDirection: tab === "bio" && (isMobile || isTablet) && "column",
          }}
        >
          <div
            id="model_menu"
            className="flex model__main-container flex-column"
            style={{
              justifyContent: "space-between",
              zIndex: 98,
              position: tab === "videos" && "absolute",
              position: tab === "bio" && "relative",
              top: 2,
              bottom: 7,
              paddingBottom: isMobile ? 10 : 25,
              width: tab === "bio" && !isMobile && !isTablet && 200,
            }}
          >
            <div
              className="flex model__menu"
              style={{
                position: "relative",
                zIndex: 100,
                lineHeight: 0.9,
                fontFamily: "HelveticaNeueCondensed",
              }}
            >
              {acf.portfolio && (
                <AnchorLink
                  href="#slideshow"
                  offset={27}
                  onClick={() => setTab("portfolio")}
                  style={{
                    fontWeight: "bold",
                    zIndex: 100,
                    cursor: "pointer",
                    color: tab === "portfolio" ? "white" : "black",
                    textDecoration: "none",
                  }}
                >
                  PORTFOLIO
                </AnchorLink>
              )}
              {isVideoAvailable && (
                <AnchorLink
                  href="#slideshow"
                  offset={27}
                  onClick={() => setTab("videos")}
                  style={{
                    fontWeight: "bold",
                    zIndex: 100,
                    cursor: "pointer",
                    color: tab === "videos" ? "white" : "black",
                    textDecoration: "none",
                  }}
                >
                  VIDEOS
                </AnchorLink>
              )}
              {acf.about && (
                <AnchorLink
                  href="#slideshow"
                  offset={27}
                  onClick={() => setTab("bio")}
                  style={{
                    cursor: "pointer",
                    zIndex: 100,
                    color: tab === "bio" ? "rgba(0,0,0,0.7)" : "black",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  BIO
                </AnchorLink>
              )}
              {acf.instagram && (
                <a
                  href={`https://www.instagram.com/${acf.instagram.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  style={{
                    cursor: "pointer",
                    zIndex: 100,
                    fontWeight: "bold",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  INSTAGRAM
                </a>
              )}
            </div>
            {tab !== "bio" && <Bio acf={acf} />}
          </div>
          <div style={{ display: tab === "portfolio" ? "block" : "none" }}>
            <Swiper loop key={1} {...params} getSwiper={updateSwiper}>
              {acf.portfolio.map(({ url, alt, title, name }, i) => (
                <img
                  key={i}
                  src={url}
                  alt={alt}
                  className="model-portfolio-image--swiper"
                  title={title}
                  name={name}
                  style={{
                    padding: isMobile ? "10px 0" : "30px 0",
                    margin: 0,
                  }}
                />
              ))}
            </Swiper>
            <AnchorLink
              href="#slideshow"
              offset={27}
              className="absolute model-slider-navigate prev"
              onClick={navigateSliderPrev}
              style={{
                position: "absolute",
                bottom: 0,
                height: isMobile ? "68%" : "80%",
                width: "50%",
                left: 0,
                zIndex: 99,
                maxHeight: 820,
                top: isMobile && 0,
                display: isMobile || isTablet ? "none" : "block",
              }}
            />
            <AnchorLink
              href="#slideshow"
              offset={27}
              className="absolute model-slider-navigate next"
              onClick={navigateSliderNext}
              style={{
                position: "absolute",
                bottom: 0,
                height: isMobile ? "68%" : "80%",
                width: "50%",
                right: 0,
                zIndex: 99,
                maxHeight: 820,
                top: isMobile && 0,
                display: isMobile || isTablet ? "none" : "block",
              }}
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: acf.about }}
            style={{
              width: "100%",
              marginTop: !isMobile && !isTablet && 200,
              fontSize: "18px",
              lineHeight: 1.2,
              textTransform: "none",
              display: tab === "bio" ? "block" : "none",
            }}
          />
          <div
            className="width-100"
            style={{ display: tab === "videos" ? "block" : "none" }}
          >
            <ModelVideo videoUrl={videoUrl} />
          </div>
        </div>

        {tab !== "bio" && <BlackBar height={100} />}

        <div id="content" className="flex flex-wrap " style={{ marginTop: 5 }}>
          {
            <div
              className="width-100 masonry-with-columns"
              style={{ display: tab === "portfolio" ? "block" : "none" }}
            >
              {acf.portfolio &&
                acf.portfolio.map(({ title, name, url, alt = "" }, index) => (
                  <AnchorLink
                    role="button"
                    href="#slideshow"
                    offset={27}
                    className="flex-column justify-between grid-item"
                    onClick={() => {
                      setImage(index)
                    }}
                    style={{
                      cursor: "pointer",
                      marginBottom: 2,
                      display: "inline-block",
                    }}
                    key={index}
                  >
                    <img
                      src={url}
                      alt={alt}
                      className="model-portfolio-image"
                      title={title}
                      name={name}
                    />
                  </AnchorLink>
                ))}
            </div>
          }
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
                  <ModelPreviewVideos
                    thumbnail={thumbnail.url}
                    onClick={() => selectVideo(video.url)}
                    key={index}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Model

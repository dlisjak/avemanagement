import React, { useState, useEffect, useContext } from "react"
import Layout from "../components/layout"
import BlackBar from "../components/BlackBar"
import Swiper from "react-id-swiper"
import AnchorLink from "react-anchor-link-smooth-scroll"

import "../components/swiper.css"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import AddressTicker from "../components/AddressTicker"
import Bio from "../components/Bio"
import ModelName from "../components/ModelName"
import ModelVideo from "../components/ModelVideo"
import ModelPreviewVideos from "../components/ModelPreviewVideos"

const Category = ({ pageContext: { firstName, lastName, acf } }) => {
  const dispatch = useContext(GlobalDispatchContext)

  const mainVideo = acf.videos ? acf.videos[0].video_url.split(".be/")[1] : ""

  const [swiper, updateSwiper] = useState(null)
  const [videoId, selectVideo] = useState(mainVideo)
  const [tab, setTab] = useState("portfolio")

  let params = {
    centeredSlides: true,
    autoHeight: true,
    slideClass: "model-swiper-slide",
    slidesPerView: 1,
    spaceBetween: 5,
  }
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
      if (typeof window !== "undefined") {
        tickerText = localStorage.getItem("ave-ticker")
        dispatch({ type: "SET_PATH", payload: tickerText })
        dispatch({
          type: "SET_MODEL_INDEX",
          payload: (firstName + lastName).replace(" ", ""),
        })
      }
    }

    initGrid()
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

  // useEffect(() => {
  //   const updateMainLayout = () => {
  //     if (tab === "videos") {
  //       const ytVideos = document.querySelectorAll("iframe")
  //       if (!ytVideos.length) return
  //       const mainVideoLayout = document.getElementById("youtubeVideo")
  //       const modelMenu = document.getElementById("model_menu")

  //       const width = ytVideos[0].getAttribute("width")
  //       const height = ytVideos[0].getAttribute("height")

  //       const ratio = width / height
  //       // (ratio = width / height) * height
  //       // ratio * height = width
  //       // height = width / ratio
  //       console.log(ratio)

  //       modelMenu.style.position = "absolute"
  //       modelMenu.style.height = "calc(100% - 25px)"

  //       ytVideos[0].style.width = "100%"

  //       console.log(ytVideos[0].clientWidth)

  //       const newHeight = Math.ceil(ytVideos[0].clientWidth / ratio)

  //       ytVideos[0].style.height = `${newHeight.toString()}px`

  //       mainVideoLayout.appendChild(ytVideos[0])
  //       ytVideos[0].setAttribute("autoplay", "1")
  //     }
  //   }

  //   updateMainLayout()
  // }, [tab])

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
    if (swiper !== null) {
      swiper.slideTo(index + 1, 0, false)
    }
  }

  const updateVideoId = videoUrl => {
    const videoId = videoUrl.split(".be/")[1]

    selectVideo(videoId)
  }

  return (
    <Layout>
      <div className="flex model flex-column">
        <ModelName firstName={firstName} lastName={lastName} />
        <BlackBar height={100} />
        <div
          id="slideshow"
          className="flex model__main content-padding"
          style={{
            marginTop: 5,
            position: "relative",
            marginBottom: tab === "videos" ? 0 : 5,
            flexDirection: tab === "bio" ? "column" : "row",
            paddingRight: tab === "bio" ? "35%" : 0,
          }}
        >
          <div
            id="model_menu"
            className="flex model__main-container flex-column"
            style={{ justifyContent: "space-between", zIndex: 100 }}
          >
            <div
              className="flex model__menu"
              style={{ top: -5, position: "relative" }}
            >
              {acf.portfolio && (
                <AnchorLink
                  href="#slideshow"
                  offset="200"
                  onClick={() => setTab("portfolio")}
                  style={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    color: tab === "portfolio" ? "black" : "#ccc",
                    textDecoration: "none",
                  }}
                >
                  PORTFOLIO
                </AnchorLink>
              )}
              {acf.videos && (
                <AnchorLink
                  href="#slideshow"
                  offset="200"
                  onClick={() => setTab("videos")}
                  style={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    color: tab === "videos" ? "black" : "#ccc",
                    textDecoration: "none",
                  }}
                >
                  VIDEOS
                </AnchorLink>
              )}
              {acf.about && (
                <AnchorLink
                  href="#slideshow"
                  offset={200}
                  onClick={() => setTab("bio")}
                  style={{
                    cursor: "pointer",
                    color: tab === "bio" ? "black" : "#ccc",
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
                    fontWeight: "bold",
                    color: "#ccc",
                    textDecoration: "none",
                  }}
                >
                  INSTAGRAM
                </a>
              )}
            </div>
            {tab !== "bio" && <Bio acf={acf} />}
          </div>
          {tab === "portfolio" && (
            <>
              <Swiper loop key={1} {...params} getSwiper={updateSwiper}>
                {acf.portfolio.map(
                  ({ url, alt, title, name, height, width }, i) => (
                    <div key={i}>
                      <img
                        src={url}
                        alt={alt}
                        className="model-portfolio-image--swiper"
                        title={title}
                        name={name}
                      />
                    </div>
                  )
                )}
              </Swiper>
              <div
                className="absolute model-slider-navigate prev"
                onClick={navigateSliderPrev}
                style={{
                  height: "100%",
                  width: "50%",
                  left: 0,
                  zIndex: 99,
                  maxHeight: 760,
                }}
              />
              <div
                className="absolute model-slider-navigate next"
                onClick={navigateSliderNext}
                style={{
                  height: "100%",
                  width: "50%",
                  right: 0,
                  zIndex: 99,
                  maxHeight: 760,
                }}
              />
            </>
          )}
          {tab === "bio" && (
            <div
              dangerouslySetInnerHTML={{ __html: acf.about }}
              style={{ width: "100%", marginTop: 50 }}
            />
          )}
          {tab === "videos" && <ModelVideo videoId={videoId} />}
        </div>

        <BlackBar height={100} />

        <div
          id="content"
          className="flex flex-wrap grid"
          style={{ marginTop: 5 }}
        >
          {
            <div
              className="width-100 flex"
              style={{ display: tab === "portfolio" ? "flex" : "none" }}
            >
              <div className="grid-col grid-col--1"></div>
              <div className="grid-col grid-col--2"></div>
              <div className="grid-col grid-col--3"></div>
              <div className="grid-col grid-col--4"></div>
              {acf.portfolio &&
                acf.portfolio.map(({ title, name, url, alt = "" }, index) => (
                  <AnchorLink
                    role="button"
                    href="#slideshow"
                    offset={210}
                    className="flex-column justify-between grid-item"
                    onClick={() => {
                      setImage(index)
                    }}
                    style={{
                      cursor: "pointer",
                      marginBottom: 5,
                      display: "block",
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
          <div
            style={{
              display: tab === "videos" ? "flex" : "none",
              width: "100%",
              height: "auto",
            }}
          >
            {acf.videos &&
              acf.videos.map(({ video_url }, index) => (
                <ModelPreviewVideos
                  videoUrl={video_url}
                  onClick={() => updateVideoId(video_url)}
                  key={index}
                />
              ))}
          </div>
        </div>
      </div>
      <AddressTicker />
    </Layout>
  )
}

export default Category

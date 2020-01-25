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

  let params = {
    centeredSlides: true,
    autoHeight: true,
    slideClass: "model-swiper-slide",
    slidesPerView: 1,
    spaceBetween: 5,
  }
  let tickerText
  let Colcade

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
            flexDirection: tab === "bio" && "column",
            marginRight: tab === "bio" ? "35%" : 0,
          }}
        >
          <div
            id="model_menu"
            className="flex model__main-container flex-column"
            style={{
              justifyContent: "space-between",
              zIndex: 100,
              position: tab === "videos" && "absolute",
              top: 2,
              bottom: 7,
            }}
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
              {isVideoAvailable && (
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
                {acf.portfolio.map(({ url, alt, title, name }, i) => (
                  <div key={i}>
                    <img
                      src={url}
                      alt={alt}
                      className="model-portfolio-image--swiper"
                      title={title}
                      name={name}
                    />
                  </div>
                ))}
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
          {tab === "videos" && <ModelVideo videoUrl={videoUrl} />}
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
      <AddressTicker />
    </Layout>
  )
}

export default Model

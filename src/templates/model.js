import React, { useState, useEffect, useContext } from "react"
import Layout from "../components/layout"
import BlackBar from "../components/BlackBar"
import Swiper from "react-id-swiper"
import AnchorLink from "react-anchor-link-smooth-scroll"

import "../css/swiper.min.css"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import Bio from "../components/Bio"
import ModelName from "../components/ModelName"
import ModelVideo from "../components/ModelVideo"
import ModelPreviewVideos from "../components/ModelPreviewVideos"
import PortfolioImage from "../components/PortfolioImage"

const Model = ({ pageContext: { firstName, lastName, acf } }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const mainVideo =
    acf.videos[0] && acf.videos[0].video && acf.videos[0].video.url
  const [portfolio, setPortfolio] = useState(null)
  const [swiper, updateSwiper] = useState(null)
  const [videoUrl, selectVideo] = useState(mainVideo || null)
  const [tab, setTab] = useState("portfolio")

  const isVideoAvailable = acf.videos.some(
    ({ video, thumbnail }) => video !== null && thumbnail !== null
  )

  let columns
  let isMobile
  let isTablet

  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
    isTablet = window.innerWidth < 850
    columns = window.innerWidth < 768 ? 2 : window.innerWidth < 1080 ? 3 : 4
  }

  let params = {
    centeredSlides: true,
    autoHeight: true,
    slideClass: "model-swiper-slide",
    slidesPerView: 1,
    spaceBetween: 5,
  }

  useEffect(() => {
    const setPath = () => {
      if (typeof window !== "undefined") {
        const tickerText = localStorage.getItem("ave-ticker")
        dispatch({ type: "SET_PATH", payload: tickerText })
        dispatch({
          type: "SET_MODEL_INDEX",
          payload: (firstName + lastName).replace(" ", ""),
        })
      }
    }

    setPath()
  }, [dispatch, firstName, lastName])

  useEffect(() => {
    const swiperUpdate = () => {
      setTimeout(() => {
        if (swiper !== null) {
          swiper.update()
        }
      }, 500)
    }

    swiperUpdate()
  }, [swiper, portfolio])

  useEffect(() => {
    const reorder = (arr, columns) => {
      const cols = columns
      const out = []
      let col = 0
      while (col < cols) {
        for (let i = 0; i < arr.length; i += cols) {
          let _val = arr[i + col]
          if (_val !== undefined) out.push(_val)
        }
        col++
      }

      acf.portfolio.forEach((img, i) => {
        img._index = i
        img._columns = (img._index + 1) % columns
      })
      setPortfolio(out)
    }

    reorder(acf.portfolio, columns)
  }, [acf.portfolio, columns])

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
        swiper.slideTo(index, 1500, false)
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
            marginBottom: tab === "videos" ? 0 : 5,
            background: tab === "bio" || tab === "videos" ? "white" : "#ccc",
          }}
        >
          <div
            id="model_menu"
            className="flex model__main-container flex-column"
            style={{
              position: tab === "bio" ? "relative" : "absolute",
              width: tab === "bio" && !isMobile && !isTablet && 200,
            }}
          >
            <div className="flex model__menu">
              {portfolio && (
                <AnchorLink
                  className="model-anchor-link"
                  href="#slideshow"
                  offset={27}
                  onClick={() => setTab("portfolio")}
                  style={{
                    color: tab === "portfolio" ? "white" : "black",
                  }}
                >
                  PORTFOLIO
                </AnchorLink>
              )}
              {isVideoAvailable && (
                <AnchorLink
                  className="model-anchor-link"
                  href="#slideshow"
                  offset={27}
                  onClick={() => setTab("videos")}
                  style={{
                    color: tab === "videos" ? "white" : "black",
                  }}
                >
                  VIDEOS
                </AnchorLink>
              )}
              {acf.about && (
                <AnchorLink
                  className="model-anchor-link"
                  href="#slideshow"
                  offset={27}
                  onClick={() => setTab("bio")}
                  style={{
                    color: tab === "bio" ? "rgb(204, 204, 204)" : "black",
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
                  className="model-anchor-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "black",
                  }}
                >
                  INSTAGRAM
                </a>
              )}
            </div>
            {tab !== "bio" && <Bio acf={acf} />}
          </div>
          <div style={{ display: tab === "portfolio" ? "block" : "none" }}>
            {portfolio && (
              <Swiper loop key={1} {...params} getSwiper={updateSwiper}>
                {acf.portfolio.map(({ url, alt, title, name }, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={alt}
                    className="model-portfolio-image--swiper"
                    title={title}
                    name={name}
                  />
                ))}
              </Swiper>
            )}
            <AnchorLink
              href="#slideshow"
              offset={27}
              className="absolute model-slider-navigate prev"
              onClick={navigateSliderPrev}
              style={{
                display: isMobile || isTablet ? "none" : "block",
              }}
            />
            <AnchorLink
              href="#slideshow"
              offset={27}
              className="absolute model-slider-navigate next"
              onClick={navigateSliderNext}
              style={{
                display: isMobile || isTablet ? "none" : "block",
              }}
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: acf.about }}
            className="model--about"
            style={{
              marginTop: !isMobile && !isTablet && 200,
              display: tab === "bio" ? "block" : "none",
            }}
          />
          <div
            className="width-100"
            style={{
              display: tab === "videos" ? "block" : "none",
              marginBottom: 5,
            }}
          >
            <ModelVideo videoUrl={videoUrl} />
          </div>
        </div>

        {tab !== "bio" && <BlackBar height={100} />}

        <div
          id="content"
          className="flex flex-wrap"
          style={{ padding: "5px 0 0 0" }}
        >
          {
            <div
              className="width-100 masonry-with-columns"
              style={{ display: tab !== "portfolio" && "none" }}
            >
              <div className="column column--1">
                {portfolio &&
                  portfolio.map(
                    (
                      { title, name, url, alt = "", _index, _columns },
                      index
                    ) => {
                      if (_columns !== 1) return null

                      return (
                        <PortfolioImage
                          title={title}
                          name={name}
                          onClick={() => setImage(_index + 1)}
                          url={url}
                          alt={alt}
                          _index={_index}
                          key={index}
                        />
                      )
                    }
                  )}
              </div>
              <div className="column column--2">
                {portfolio &&
                  portfolio.map(
                    (
                      { title, name, url, alt = "", _index, _columns },
                      index
                    ) => {
                      if (_columns !== 2) return null

                      return (
                        <PortfolioImage
                          title={title}
                          name={name}
                          onClick={() => setImage(_index + 1)}
                          url={url}
                          alt={alt}
                          _index={_index}
                          key={index}
                        />
                      )
                    }
                  )}
              </div>
              <div className="column column--3">
                {portfolio &&
                  portfolio.map(
                    (
                      { title, name, url, alt = "", _index, _columns },
                      index
                    ) => {
                      if (_columns !== 3) return null

                      return (
                        <PortfolioImage
                          title={title}
                          name={name}
                          onClick={() => setImage(_index + 1)}
                          url={url}
                          alt={alt}
                          _index={_index}
                          key={index}
                        />
                      )
                    }
                  )}
              </div>
              <div className="column column--4">
                {portfolio &&
                  portfolio.map(
                    (
                      { title, name, url, alt = "", _index, _columns },
                      index
                    ) => {
                      if (_columns !== 0) return null

                      return (
                        <PortfolioImage
                          title={title}
                          name={name}
                          onClick={() => setImage(_index + 1)}
                          url={url}
                          alt={alt}
                          _index={_index}
                          key={index}
                        />
                      )
                    }
                  )}
              </div>
            </div>
          }
          {tab === "videos" && (
            <div
              className="category-cards width-100 flex flex-wrap"
              style={{
                height: "auto",
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

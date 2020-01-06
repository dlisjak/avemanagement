import React, { useState, useEffect, useContext } from "react"
import SmoothImage from "react-smooth-image"
import Layout from "../components/layout"
import BlackBar from "../components/BlackBar"
import Swiper from "react-id-swiper"

import "../components/swiper.css"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const Category = ({ pageContext: { firstName, lastName, acf } }) => {
  const dispatch = useContext(GlobalDispatchContext)

  const [swiper, updateSwiper] = useState(null)
  const [tab, setTab] = useState("portfolio")
  let params = {
    autoHeight: true,
    slideClass: "model-swiper-slide",
    slidesPerView: 1,
    spaceBetween: 0,
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
      })
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
    if (swiper !== null) {
      swiper.slideTo(index + 1, 0, false)
    }
  }

  return (
    <Layout>
      <div className="flex model flex-column">
        <h2
          className="flex model__name flex-column content-padding relative"
          style={{ marginBottom: 5 }}
        >
          <span>{firstName}</span>
          <span>{lastName}</span>
        </h2>
        <BlackBar height={100} />
        <div
          className="flex model__main content-padding"
          style={{ marginTop: 10 }}
        >
          <div
            className="flex model__main-container flex-column"
            style={{ justifyContent: "space-between" }}
          >
            <div className="flex model__menu">
              {acf.portfolio && (
                <a
                  href="#content"
                  onClick={() => setTab("portfolio")}
                  style={{
                    fontWeight: tab === "portfolio" ? "bold" : "normal",
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  PORTFOLIO
                </a>
              )}
              {acf.videos && (
                <a
                  href="#content"
                  onClick={() => setTab("videos")}
                  style={{
                    fontWeight: tab === "videos" ? "bold" : "normal",
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  VIDEOS
                </a>
              )}
              {false && (
                <a
                  href="#bio"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  BIO
                </a>
              )}
              {acf.instagram && (
                <span style={{ cursor: "pointer" }}>INSTAGRAM</span>
              )}
            </div>
            <div id="bio" className="model__bio flex flex-column relative">
              {acf.bio.height && (
                <span className="model-bio-property">
                  HEIGHT{" "}
                  <span
                    className="model-bio-value"
                    style={{ fontWeight: "bold" }}
                  >
                    {acf.bio.height}
                  </span>
                </span>
              )}
              {acf.bio.hair && (
                <span className="model-bio-property">
                  HAIR{" "}
                  <span
                    className="model-bio-value"
                    style={{ fontWeight: "bold" }}
                  >
                    {acf.bio.hair}
                  </span>
                </span>
              )}
              {acf.bio.eyes && (
                <span className="model-bio-property">
                  EYES{" "}
                  <span
                    className="model-bio-value"
                    style={{ fontWeight: "bold" }}
                  >
                    {acf.bio.eyes}
                  </span>
                </span>
              )}
              {acf.bio.bust && (
                <span className="model-bio-property">
                  BUST{" "}
                  <span
                    className="model-bio-value"
                    style={{ fontWeight: "bold" }}
                  >
                    {acf.bio.bust}
                  </span>
                </span>
              )}
              {acf.bio.suit && (
                <span className="model-bio-property">
                  SUIT{" "}
                  <span
                    className="model-bio-value"
                    style={{ fontWeight: "bold" }}
                  >
                    {acf.bio.suit}
                  </span>
                </span>
              )}
              {acf.bio.shirt && (
                <span className="model-bio-property">
                  SHIRT{" "}
                  <span
                    className="model-bio-value"
                    style={{ fontWeight: "bold" }}
                  >
                    {acf.bio.shirt}
                  </span>
                </span>
              )}
              {acf.bio.waist && (
                <span className="model-bio-property">
                  WAIST{" "}
                  <span
                    className="model-bio-value"
                    style={{ fontWeight: "bold" }}
                  >
                    {acf.bio.waist}
                  </span>
                </span>
              )}
              {acf.bio.hips && (
                <span className="model-bio-property">
                  HIPS{" "}
                  <span
                    className="model-bio-value"
                    style={{ fontWeight: "bold" }}
                  >
                    {acf.bio.hips}
                  </span>
                </span>
              )}
              {acf.bio.inseam && (
                <span className="model-bio-property">
                  INSEAM{" "}
                  <span
                    className="model-bio-value"
                    style={{ fontWeight: "bold" }}
                  >
                    {acf.bio.inseam}
                  </span>
                </span>
              )}
              {acf.bio.shoes && (
                <span className="model-bio-property">
                  SHOES{" "}
                  <span
                    className="model-bio-value"
                    style={{ fontWeight: "bold" }}
                  >
                    {acf.bio.shoes}
                  </span>
                </span>
              )}
            </div>
          </div>
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
        </div>

        <BlackBar height={100} />

        <div
          id="content"
          className="flex flex-wrap grid"
          style={{ marginTop: 5 }}
        >
          {tab === "portfolio" && (
            <>
              <div className="grid-col grid-col--1"></div>
              <div className="grid-col grid-col--2"></div>
              <div className="grid-col grid-col--3"></div>
              <div className="grid-col grid-col--4"></div>
              {acf.portfolio &&
                acf.portfolio.map(
                  ({ title, name, url, alt = "", height, width }, index) => {
                    const ratio = height / width
                    return (
                      <div
                        role="button"
                        className="flex-column justify-between grid-item"
                        onClick={() => {
                          setImage(index)
                          window.scrollTo(0, 272)
                        }}
                        style={{ cursor: "pointer", marginBottom: 5 }}
                        key={index}
                      >
                        <SmoothImage
                          src={url}
                          alt={alt}
                          className="model-portfolio-image"
                          transitionTime={0.5}
                          containerStyles={{ paddingBottom: `${ratio * 100}%` }}
                          imageStyles={{ height: "100%", objectFit: "cover" }}
                          title={title}
                          name={name}
                        />
                      </div>
                    )
                  }
                )}
            </>
          )}
          {tab === "videos" &&
            acf.videos &&
            acf.videos.map(({ video_url }, index) => (
              <iframe
                src={video_url}
                width="560"
                height="315"
                title={`${video_url}-${index}`}
                key={index}
              ></iframe>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default Category

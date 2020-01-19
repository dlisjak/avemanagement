import React, { useEffect, useContext, useRef, useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import News from "../components/News"
import Instagram from "../components/Instagram"
import Loader from "../components/Loader"

import Video1 from "../videos/main-video-1.mp4"
import Video2 from "../videos/main-video-2.mp4"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import BlackBar from "../components/BlackBar"
import { graphql } from "gatsby"
import AddressTicker from "../components/AddressTicker"

const Home = ({ pageContext, data }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [videoSrc, setVideoSrc] = useState(null)
  const [videoKey, setVideoKey] = useState(null)
  const [isLoaderShown, setLoaderShown] = useState(true)

  const videoSources = [Video1, Video2]
  let tickerText

  useEffect(() => {
    const setPath = () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("ave-navigation")
        tickerText = window.location.pathname
        dispatch({ type: "SET_PATH", payload: tickerText })
      }
    }
    const setVideo = () => {
      const key = Math.round(Math.random())
      const e = new Event("onMount")
      onVidEnding(e, key)
    }

    const removeOverlay = () => {
      setTimeout(() => {
        setLoaderShown(false)
      }, 1100)
    }

    removeOverlay()
    setPath()
    setVideo()
  }, [])

  const onVidEnding = (e, key) => {
    if (videoKey !== null) {
      key = 1 - videoKey
    }

    const nextVideo = document.getElementById(`home-video-${key}`)

    setVideoKey(key)
    setVideoSrc(videoSources[key])

    nextVideo.play()
  }

  return (
    <Layout isHomepage={true}>
      {isLoaderShown && <Loader />}
      <SEO title="Home" />

      <video
        id="home-video-0"
        src={videoSources[0]}
        muted
        controlsList="nodownload"
        onEnded={onVidEnding}
        className="home-video width-100"
        style={{
          paddingBottom: 5,
          left: 0,
          zIndex: videoSrc === videoSources[0] ? 2 : 0,
          opacity: videoSrc === videoSources[0] ? 1 : 0,
          position: videoSrc === videoSources[0] ? "relative" : "absolute",
        }}
      ></video>

      <video
        id="home-video-1"
        src={videoSources[1]}
        muted
        controlsList="nodownload"
        onEnded={onVidEnding}
        className="home-video width-100"
        style={{
          paddingBottom: 5,
          left: 0,
          zIndex: videoSrc === videoSources[1] ? 2 : 0,
          opacity: videoSrc === videoSources[1] ? 1 : 0,
          position: videoSrc === videoSources[1] ? "relative" : "absolute",
        }}
      ></video>

      <BlackBar height={125} />
      <div className="home-news" style={{ marginTop: 5, marginBottom: 10 }}>
        <News />
      </div>
      <BlackBar height={125} />
      <div
        className="home-instagram"
        style={{ marginTop: 5, marginBottom: 50 }}
      >
        <Instagram posts={data.allInstaNode} />
      </div>
      <AddressTicker />
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allInstaNode(limit: 10) {
      edges {
        node {
          localFile {
            publicURL
          }
        }
      }
    }
  }
`

export default Home

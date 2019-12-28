import React, { useEffect, useContext, useRef, useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import News from "../components/News"
import Instagram from "../components/Instagram"
import Loader from "../components/Loader"

import Video1 from "../videos/main-video-1.mp4"
import Video2 from "../videos/main-video-2.mp4"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const Home = ({ pageContext, data }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [videoSrc, setVideoSrc] = useState(null)
  const [videoKey, setVideoKey] = useState(null)
  const [isLoaderShown, setLoaderShown] = useState(true)

  const videoPlayer = useRef(null)

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
    return () => {
      localStorage.setItem("ave-ticker", tickerText)
    }
  }, [])

  const onVidEnding = (e, key) => {
    if (videoKey !== null) {
      key = 1 - videoKey
    }
    setVideoKey(key)
    setVideoSrc(videoSources[key])
  }

  return (
    <Layout isHomepage={true}>
      {isLoaderShown && <Loader />}
      <SEO title="Home" />
      <video
        ref={videoPlayer}
        src={videoSrc}
        autoPlay
        muted
        onEnded={onVidEnding}
        className="home-video width-100"
      ></video>
      <div className="home-news" style={{ marginTop: 50 }}>
        <News />
      </div>
      <div
        className="home-instagram"
        style={{ marginTop: 50, marginBottom: 50 }}
      >
        <Instagram posts={data.allInstaNode} />
      </div>
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

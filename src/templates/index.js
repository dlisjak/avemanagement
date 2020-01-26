import React, { useEffect, useContext, useState } from "react"

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

const Home = ({ data }) => {
  const videoSources = [Video1, Video2]
  const videoKey = Math.round(Math.random())

  const dispatch = useContext(GlobalDispatchContext)

  const [videoSrc, setVideoSrc] = useState(videoSources[videoKey])

  let tickerText

  useEffect(() => {
    const setPath = () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("ave-navigation")
        tickerText = window.location.pathname
        dispatch({ type: "SET_PATH", payload: tickerText })
      }
    }

    setPath()
  }, [])

  useEffect(() => {
    const mainVid = document.getElementById("home-video")

    mainVid.load()
    mainVid.play()
  }, [videoSrc])

  const onVidEnding = () => {
    let key
    if (videoKey !== null) {
      key = 1 - videoKey
    }

    setVideoSrc(videoSources[key])
  }

  return (
    <Layout isHomepage={true}>
      <Loader />
      <SEO title="Home" />

      <video
        id="home-video"
        src={videoSrc}
        muted
        autoPlay
        playsInline
        controlsList="nodownload"
        onEnded={() => onVidEnding}
        className="home-video width-100"
        style={{
          paddingBottom: 5,
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

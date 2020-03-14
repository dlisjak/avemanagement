import React, { useEffect, useContext, useState } from "react"
import { useInView } from "react-intersection-observer"
import AnchorLink from "react-anchor-link-smooth-scroll"

import Layout from "../components/layout"
import SEO from "../components/seo"

import News from "../components/News"
import Instagram from "../components/Instagram"
import Loader from "../components/Loader"
import TickerText from "../components/Ticker"

import Video1 from "../videos/main-video-1.mp4"
import Video2 from "../videos/main-video-2.mp4"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import BlackBar from "../components/BlackBar"
import { graphql } from "gatsby"

const Home = ({ data }) => {
  const [ref, inView, entry] = useInView({
    threshold: 0,
  })

  let isMobile
  if (window.innerWidth < 480) isMobile = true

  const videoSources = [Video1, Video2]
  let videoKey = Math.round(Math.random())

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
    beginPlayingVideo()
  }, [])

  const onVidEnding = () => {
    let key
    if (videoKey !== null) {
      key = 1 - videoKey
    }

    videoKey = 1 - key

    setVideoSrc(videoSources[key])
    beginPlayingVideo()
  }

  const beginPlayingVideo = () => {
    const mainVid = document.getElementById("home-video")

    mainVid.load()
    setTimeout(() => {
      mainVid.play()
    }, 1000)
  }

  return (
    <Layout isHomepage={true}>
      <Loader />
      <AnchorLink
        id="anchorToVideo"
        href="#home-video"
        style={{ opacity: 0, position: "absolute", left: 0, bottom: 0 }}
      />
      <SEO title="Home" />

      <video
        ref={ref}
        id="home-video"
        src={videoSrc}
        muted
        autoPlay
        playsInline
        controlsList="nodownload"
        onEnded={onVidEnding}
        className="home-video width-100"
        style={{
          marginBottom: 5,
          background: "black",
        }}
      ></video>

      <BlackBar height={125} />
      <div className="home-news" style={{ marginTop: 5, marginBottom: 10 }}>
        <News posts={data.allWordpressWpNews.edges} />
      </div>
      <BlackBar height={125} />
      <div
        className="home-instagram"
        style={{ marginTop: 5, marginBottom: 50 }}
      >
        <a
          href="https://www.instagram.com/avemanagement/"
          target="_blank"
          rel="noopener"
          style={{ textTransform: "none", textDecoration: "none" }}
        >
          {isMobile ? (
            <TickerText title="INSTAGRAM" left={true} />
          ) : (
            <React.Fragment>
              <TickerText title="INSTAGRAM" left={true} />
              <TickerText title="@AVEMANAGEMENT" />
              <TickerText title="#AVEGIRLS #AVEBOYS" left={true} />
            </React.Fragment>
          )}
        </a>
        <Instagram posts={data.allInstaNode.edges} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allInstaNode(limit: 10) {
      edges {
        node {
          localFile {
            childImageSharp {
              id
            }
            publicURL
          }
        }
      }
    }
    allWordpressWpNews(limit: 10) {
      edges {
        node {
          title
          slug
          acf {
            news_post_image {
              title
              url
            }
            video_1 {
              url
            }
          }
        }
      }
    }
  }
`

export default Home

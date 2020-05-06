import React, { useEffect, useState } from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"

import Layout from "../components/layout"
import SEO from "../components/seo"

import News from "../components/News"
import Instagram from "../components/Instagram"
import TickerText from "../components/Ticker"

import BlackBar from "../components/BlackBar"
import { graphql } from "gatsby"

const Home = ({ data }) => {
  const [videoSrc, setVideoSrc] = useState(null)

  let videoKey = Math.round(Math.random())

  const videoSources = [
    "https://avemanagement1.eu/wp-content/uploads/2020/03/main-video-1.mp4",
    "https://avemanagement1.eu/wp-content/uploads/2019/10/main-video-2.mp4",
  ]

  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  useEffect(() => {
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
      <AnchorLink
        id="anchorToVideo"
        href="#home-video"
        style={{ opacity: 0, position: "absolute", left: 0, bottom: 0 }}
      />
      <SEO title="Home" />

      <video
        id="home-video"
        src={
          videoSrc ||
          "https://avemanagement1.eu/wp-content/uploads/2020/03/main-video-1.mp4"
        }
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
          rel="noopener noreferrer"
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
              height
              width
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

import React, { useEffect, useContext, Suspense, lazy, useState } from "react"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import News from "../components/News"
import Instagram from "../components/Instagram"
import Loader from "../components/Loader"

import BlackBar from "../components/BlackBar"
import AddressTicker from "../components/AddressTicker"

const Video1 = lazy(() => import("../components/MainVideo"))

const Home = ({ data }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [videoSrc, setVideoSrc] = useState(null)
  const [videoKey, setVideoKey] = useState(null)
  const [isLoaderShown, setLoaderShown] = useState(true)

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
    }

    const removeOverlay = () => {
      setTimeout(() => {
        setLoaderShown(false)
      }, 1500)
    }

    removeOverlay()
    setPath()
    // setVideo()
  }, [])

  return (
    <Layout isHomepage={true}>
      {isLoaderShown && <Loader />}
      <SEO title="Home" />

      <Suspense fallback={<div>Loading...</div>}>
        <Video1 />
      </Suspense>

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

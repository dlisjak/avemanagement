import React, { useEffect, useContext } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import News from "../components/News"
import Instagram from "../components/Instagram"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const Home = ({ pageContext, data }) => {
  const dispatch = useContext(GlobalDispatchContext)
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
    return () => {
      localStorage.setItem("ave-ticker", tickerText)
    }
  }, [])

  return (
    <Layout isHomepage={true}>
      <SEO title="Home" />
      <video autoPlay muted className="home-video width-100" style={{}}>
        <source src={pageContext.video} type="video/mp4" />
      </video>
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

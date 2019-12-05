import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import News from "../components/News"
import Instagram from "../components/Instagram"

const Home = ({ pageContext }) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ave-navigation")
  }
  return (
    <Layout>
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
        <Instagram />
      </div>
    </Layout>
  )
}

export default Home

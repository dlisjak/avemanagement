import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import News from "../components/News"
import Instagram from "../components/Instagram"

const Home = ({ pageContext }) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ave-navigation")
  }
  console.log(pageContext)
  return (
    <Layout>
      <SEO title="Home" />
      <video
        autoPlay
        muted
        loop
        className="home-video width-100"
        style={{ background: "#000", paddingTop: "2rem" }}
      >
        <source src={pageContext.video.localFile.relativePath} type="video/mp4" />
      </video>
      <div className="home-news" style={{ marginTop: 30 }}>
        <News />
      </div>
      <div
        className="home-instagram"
        style={{ marginTop: 30, marginBottom: 50 }}
      >
        <Instagram />
      </div>
    </Layout>
  )
}

export default Home

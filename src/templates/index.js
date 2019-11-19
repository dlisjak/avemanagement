import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import News from "../components/News"

const Home = ({ pageContext }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <video
        autoPlay
        muted
        className="home-video width-100"
        style={{ background: "#000", paddingTop: "2rem" }}
        src={pageContext.video}
      ></video>
      <div className="home-news" style={{ marginTop: 30 }}>
        <News />
      </div>
    </Layout>
  )
}

export default Home

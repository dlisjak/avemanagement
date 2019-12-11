import React, { useEffect, useContext, useState } from "react"
import { Link } from "gatsby"
import SmoothImage from "react-smooth-image"
import InfiniteScroll from "react-infinite-scroll-component"

import Layout from "../components/layout"
import NewsImage from "../components/NewsImage"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const NewsPage = ({ data }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [newsImages, setNewsImages] = useState(
    data.allWordpressWpNews.edges.slice(0, 10)
  )
  let Colcade
  let tickerText
  const perPage = 10
  let currentNewsImageIndex = 10

  useEffect(() => {
    // componentDidMount
    const initGrid = async () => {
      const grid = document.querySelector(".grid")
      if (typeof window !== "undefined") {
        Colcade = require("colcade")
        const colc = new Colcade(grid, {
          columns: ".grid-col",
          items: ".grid-item",
        })
      }
    }
    const setPath = () => {
      localStorage.removeItem("ave-ticker")
      tickerText = window.location.pathname
      dispatch({ type: "SET_PATH", payload: tickerText })
    }
    setPath()
    initGrid()

    return () => {
      localStorage.setItem("ave-ticker", tickerText)
    }
  }, [])

  const fetchData = () => {
    const newImages = data.allWordpressWpNews.edges.slice(
      currentNewsImageIndex,
      perPage + currentNewsImageIndex
    )
    currentNewsImageIndex += 10
    const arr = [...newsImages, ...newImages]
    setNewsImages(arr)
  }

  return (
    <Layout>
      <div id="content" className="grid" style={{ marginTop: 50 }}>
        <div className="grid-col grid-col--1"></div>
        <div className="grid-col grid-col--2"></div>
        <div className="grid-col grid-col--3"></div>
        <div className="grid-col grid-col--4"></div>
        <InfiniteScroll
          dataLength={data.allWordpressWpNews.edges.length} //This is important field to render the next data
          hasMore={true}
          next={fetchData}
        >
          {newsImages.map(({ node }, index) => {
            console.log(node)
            return <NewsImage image={node} key={index} />
          })}
        </InfiniteScroll>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query AllNews {
    allWordpressWpNews {
      edges {
        node {
          title
          slug
          content
          acf {
            news_post_image {
              title
              url
              width
              height
            }
          }
        }
      }
    }
  }
`
export default NewsPage

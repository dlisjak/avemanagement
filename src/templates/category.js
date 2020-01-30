import React, { useEffect, useState, useContext } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Search from "../components/Search"
import BlackBar from "../components/BlackBar"
import VizAwareImg from "../components/VisibilityImage"
import AnchorLink from "react-anchor-link-smooth-scroll"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import AddressTicker from "../components/AddressTicker"

const Category = ({ data, pageContext }) => {
  const dispatch = useContext(GlobalDispatchContext)

  const [searchOpen, toggleSearch] = useState(false)
  const [anchorIndex, setAnchorIndex] = useState("")

  const title = pageContext.title.toUpperCase()
  let tickerText

  useEffect(() => {
    const setPath = () => {
      localStorage.removeItem("ave-ticker")
      tickerText = typeof window !== "undefined" ? window.location.pathname : ""
      dispatch({ type: "SET_PATH", payload: tickerText })
      localStorage.setItem("ave-ticker", tickerText)
    }

    const anchorScroll = () => {
      if (!window.location.hash) return
      setAnchorIndex(window.location.hash)

      setTimeout(() => {
        const el = document.getElementById("anchorButtonIndex")
        if (!el) return

        el.click()
      }, 1000)
    }

    setPath()
    anchorScroll()
  }, [])

  const openSearch = () => {
    toggleSearch(!searchOpen)
  }

  const closeSearch = () => {
    toggleSearch(false)
  }

  return (
    <Layout>
      {searchOpen && (
        <Search
          models={data.allWordpressPost.edges}
          isShown={searchOpen}
          title={title}
          closeSearch={closeSearch}
        />
      )}
      {!searchOpen && (
        <button
          className="category-search--desktop"
          onClick={() => openSearch()}
          style={{
            position: "absolute",
            fontFamily: "HelveticaNeueCondensed",
            right: 0,
            fontSize: "2.6rem",
            top: "-2.2rem",
            background: 0,
            border: 0,
            fontWeight: 700,
            padding: 0,
            zIndex: 9999,
            color: "black",
          }}
        >
          SEARCH
        </button>
      )}

      <BlackBar height={100} />

      <div
        className="flex flex-wrap category-cards relative"
        style={{ marginBottom: 75, marginTop: 5 }}
      >
        {data.allWordpressPost.edges.map(
          (
            {
              node: {
                path,
                title,
                acf: { featured_image, first_name, last_name },
              },
            },
            index
          ) => {
            return (
              <VizAwareImg
                id={first_name + last_name}
                key={index}
                path={path}
                src={featured_image.url}
                alt={featured_image.alt}
                title={featured_image.title}
                style={{ marginBottom: 0 }}
                firstName={first_name}
                lastName={last_name}
                lazyLoad={index > 7}
              />
            )
          }
        )}
      </div>
      {!searchOpen && (
        <button
          className="category-search--mobile"
          onClick={() => {
            openSearch()
          }}
          style={{
            background: 0,
            border: 0,
            fontWeight: 700,
            padding: 0,
            zIndex: 9999,
            color: "#ccc",
          }}
        >
          SEARCH
        </button>
      )}

      <AnchorLink
        id="anchorButtonIndex"
        href={anchorIndex}
        offset="300"
        style={{
          fontSize: 1,
          position: "absolute",
          color: "white",
          textDecoration: "none",
        }}
      />
      <AddressTicker />
    </Layout>
  )
}
export const query = graphql`
  query CategoryPage($title: String) {
    allWordpressPost(
      filter: { categories: { elemMatch: { name: { eq: $title } } } }
      sort: { fields: title }
    ) {
      edges {
        node {
          path
          title
          acf {
            featured_image {
              alt
              title
              url
              height
              width
            }
            first_name
            last_name
            gender
          }
        }
      }
    }
  }
`

export default Category

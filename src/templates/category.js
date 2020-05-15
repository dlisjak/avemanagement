import React, { useEffect, useState, useContext } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Search from "../components/Search"
import BlackBar from "../components/BlackBar"
import VizAwareImg from "../components/VisibilityImage"
import AnchorLink from "react-anchor-link-smooth-scroll"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const Category = ({ data, pageContext }) => {
  const dispatch = useContext(GlobalDispatchContext)

  const [searchOpen, toggleSearch] = useState(false)
  const [anchorIndex, setAnchorIndex] = useState("")

  const title = pageContext.title.toUpperCase()
  let tickerText

  let isMac
  if (typeof navigator !== "undefined") {
    isMac = navigator.userAgent.indexOf("Mac") > 0
  }

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
      }, 2000)
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
    <Layout showGetToTop={true}>
      {searchOpen && (
        <Search
          models={data.allWordpressPost.edges}
          isShown={searchOpen}
          title={title}
          closeSearch={closeSearch}
        />
      )}
      {!searchOpen && (
        <a
          className="category-search category-search__button"
          style={{ marginBottom: isMac ? -14 : -5 }}
          onClick={() => openSearch()}
        >
          SEARCH
        </a>
      )}

      <BlackBar height={100} />

      <div className="flex flex-wrap category-cards relative">
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
                index={index}
                path={path}
                src={featured_image.url}
                alt={featured_image.alt}
                title={featured_image.title}
                style={{ marginBottom: 0 }}
                firstName={first_name}
                lastName={last_name}
              />
            )
          }
        )}
      </div>

      <AnchorLink
        className="anchor-link"
        id="anchorButtonIndex"
        href={anchorIndex}
        offset="300"
      />
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

import React, { useEffect, useState, useContext } from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SmoothImage from "react-smooth-image"
import Search from "../components/Search"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const Category = ({ data, pageContext }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [searchOpen, toggleSearch] = useState(false)
  const title = pageContext.title.toUpperCase()
  let tickerText

  useEffect(() => {
    const setPath = () => {
      localStorage.removeItem("ave-ticker")
      tickerText = window.location.pathname
      dispatch({ type: "SET_PATH", payload: tickerText })
    }
    setPath()
    return () => {
      localStorage.setItem("ave-ticker", tickerText)
    }
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
            right: 0,
            top: 75,
            background: 0,
            border: 0,
            fontWeight: 700,
            padding: 0,
            zIndex: 9999,
          }}
        >
          SEARCH
        </button>
      )}

      <div
        className="flex flex-wrap category-cards relative"
        style={{ marginTop: 100, marginBottom: 75 }}
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
              <Link
                to={path}
                className="flex flex-column justify-between category-card"
                key={index}
              >
                <SmoothImage
                  className="category-card-image"
                  src={featured_image.url}
                  alt={featured_image.alt}
                  title={featured_image.title}
                  style={{ marginBottom: 0 }}
                  containerStyles={{ paddingBottom: `130%` }}
                  imageStyles={{ height: "100%", objectFit: "cover" }}
                />
                <h2 className="category-card-title flex flex-wrap width-100 relative">
                  <span className="width-100">{first_name}</span>
                  <span className="width-100" style={{ top: 15 }}>
                    {last_name}
                  </span>
                </h2>
              </Link>
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
          }}
        >
          SEARCH
        </button>
      )}
    </Layout>
  )
}
export const query = graphql`
  query CategoryPage($title: String) {
    allWordpressPost(
      filter: { categories: { elemMatch: { name: { eq: $title } } } }
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

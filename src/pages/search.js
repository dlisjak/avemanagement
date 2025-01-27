import React, { useState, useEffect, useContext, useRef } from "react"
import { graphql, Link } from "gatsby"
import AnchorLink from "react-anchor-link-smooth-scroll"

import Layout from "../components/layout"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const Search = ({ data }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [genderQuery, setGender] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [anchorIndex, setAnchorIndex] = useState("")

  const inputRef = useRef(null)

  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  const handleSearchQuery = e => {
    setSearchQuery(e.target.value.toUpperCase())
  }

  const setSearchGender = (e, gender) => {
    setGender(gender)
  }

  useEffect(() => {
    const setPath = () => {
      inputRef.current.focus()
      if (typeof window !== "undefined") {
        localStorage.removeItem("ave-ticker")
        const tickerText = window.location.pathname
        localStorage.setItem("ave-ticker", tickerText)
        dispatch({ type: "SET_PATH", payload: tickerText })
      }
    }
    setPath()
  }, [])

  useEffect(() => {
    const anchorScroll = () => {
      if (!window.location.hash) return
      setAnchorIndex(window.location.hash)

      setTimeout(() => {
        const el = document.getElementById("anchorButtonIndex")
        if (!el) return

        el.click()
      }, 2000)
    }

    anchorScroll()
  }, [])

  return (
    <Layout showGetToTop={true}>
      <div
        className="flex flex-column search-queries"
        style={{ marginBottom: 20, fontSize: 20 }}
      >
        <button
          onClick={e => setSearchGender(e, null)}
          style={{ color: !genderQuery ? "black" : "#ccc" }}
        >
          ALL
        </button>
        <button
          onClick={e => setSearchGender(e, "male")}
          style={{ color: genderQuery === "male" ? "black" : "#ccc" }}
        >
          MEN
        </button>
        <button
          onClick={e => setSearchGender(e, "female")}
          style={{ color: genderQuery === "female" ? "black" : "#ccc" }}
        >
          WOMEN
        </button>
        <div>
          <input
            ref={inputRef}
            className="search-input-search"
            type="text"
            placeholder="/SEARCH BY NAME"
            onChange={e => handleSearchQuery(e)}
            value={searchQuery}
            style={{
              fontSize: 24,
              marginTop: 10,
              width: "100%",
              padding: 0,
            }}
          />
        </div>
      </div>
      <div
        className="flex flex-column search-queries"
        style={{ paddingTop: !isMobile && 50, paddingBottom: 25 }}
      >
        {data.allModel.edges.map(({ node }, index, arr) => {
          if (searchQuery) {
            if (!node.title.toUpperCase().includes(searchQuery.toUpperCase())) {
              return null
            }
          }
          node.title = node.title.toLowerCase()

          if (genderQuery) {
            if (genderQuery !== node.acf.gender) return null
          }

          if (index === 0 || node.title[0] !== arr[index - 1].node.title[0]) {
            return (
              <React.Fragment key={index}>
                <span
                  style={{ marginTop: 20, marginBottom: 5, fontWeight: 700 }}
                >
                  {arr[index].node.title[0]}
                </span>
                <Link
                  id={`${node.title.toUpperCase().replace(" ", "")}`}
                  to={`/${node.slug}`}
                  className="search-result-names"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    lineHeight: 1.8,
                  }}
                >
                  {node.title}
                </Link>
              </React.Fragment>
            )
          }

          return (
            <Link
              id={`${node.title.toUpperCase().replace(" ", "")}`}
              to={`/${node.slug}`}
              className="search-result-names"
              style={{
                textDecoration: "none",
                color: "black",
                lineHeight: 1.8,
              }}
              key={index}
            >
              {node.title}
            </Link>
          )
        })}
      </div>
      <AnchorLink
        id="anchorButtonIndex"
        href={anchorIndex}
        offset="180"
        style={{
          fontSize: 1,
          position: "absolute",
          color: "white",
          textDecoration: "none",
        }}
      />
    </Layout>
  )
}

export const query = graphql`
  query SortedModels {
    allModel(sort: { fields: title }) {
      edges {
        node {
          title
          slug
          acf {
            gender
          }
        }
      }
    }
  }
`

export default Search

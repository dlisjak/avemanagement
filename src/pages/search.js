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
  let tickerText

  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  useEffect(() => {
    const setPath = () => {
      inputRef.current.focus()
      localStorage.removeItem("ave-ticker")
      tickerText = typeof window !== "undefined" ? window.location.pathname : ""
      localStorage.setItem("ave-ticker", tickerText)
      dispatch({ type: "SET_PATH", payload: tickerText })
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

  const handleSearchQuery = e => {
    setSearchQuery(e.target.value.toUpperCase())
  }

  const setSearchGender = (e, gender) => {
    setGender(gender)
  }

  return (
    <Layout>
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
          if (index === 0 || node.title[0] !== arr[index - 1].node.title[0]) {
            return (
              <React.Fragment key={index}>
                <span
                  style={{ marginTop: 20, marginBottom: 5, fontWeight: 700 }}
                >
                  {arr[index].node.title[0]}
                </span>
                <Link
                  id={`${node.title.replace(" ", "")}`}
                  to={`/${node.slug}`}
                  className="search-result-names"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    lineHeight: 1.8,
                  }}
                >
                  {node.title.toUpperCase()}
                </Link>
              </React.Fragment>
            )
          }

          if (genderQuery) {
            if (genderQuery !== node.acf.gender) return null
          }
          return (
            <Link
              id={`${node.title.replace(" ", "")}`}
              to={`/${node.slug}`}
              className="search-result-names"
              style={{
                textDecoration: "none",
                color: "black",
                lineHeight: 1.8,
              }}
              key={index}
            >
              {node.title.toUpperCase()}
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

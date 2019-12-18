import React, { useState, useEffect, useContext, useRef } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const Search = ({ data }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [genderQuery, setGender] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef(null)
  let tickerText

  useEffect(() => {
    const setPath = () => {
      inputRef.current.focus()
      localStorage.removeItem("ave-ticker")
      tickerText = typeof window !== "undefined" ? window.location.pathname : ""
      dispatch({ type: "SET_PATH", payload: tickerText })
    }
    setPath()

    return () => {
      localStorage.setItem("ave-ticker", tickerText)
    }
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
        style={{ paddingBottom: 25, borderBottom: "1px solid" }}
      >
        <button
          onClick={e => setSearchGender(e, null)}
          style={{ fontWeight: !genderQuery ? 700 : 400 }}
        >
          ALL
        </button>
        <button
          onClick={e => setSearchGender(e, "male")}
          style={{ fontWeight: genderQuery === "male" ? 700 : 400 }}
        >
          MEN
        </button>
        <button
          onClick={e => setSearchGender(e, "female")}
          style={{ fontWeight: genderQuery === "female" ? 700 : 400 }}
        >
          WOMEN
        </button>
        <div>
          <input
            ref={inputRef}
            className="search-input-search"
            type="text"
            placeholder="SEARCH BY NAME"
            onChange={e => handleSearchQuery(e)}
            value={searchQuery}
            style={{ fontSize: 22, marginTop: 10 }}
          />
        </div>
      </div>
      <div
        className="flex flex-column search-queries"
        style={{ paddingTop: 50, paddingBottom: 25 }}
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
                  to={`/${node.slug}`}
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
              to={`/${node.slug}`}
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

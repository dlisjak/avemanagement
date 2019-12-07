import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import TickerText from "./Ticker"
import GetToTop from "./getToTop"

const Search = ({ isShown, models, closeSearch }) => {
  const [isOpen, toggleOverlay] = useState(true)

  useEffect(() => {
    const openOverlay = () => {
      const el = document.querySelector("body")
      el.classList.add("overlay")
    }
    openOverlay()

    return () => {
      const el = document.querySelector("body")
      el.classList.remove("overlay")
    }
  }, [])

  const closeOverlay = () => {
    closeSearch()
  }

  const scrollToTopSearch = () => {
    const el = document.querySelector(".search-overlay")
    el.scrollTop = 0
  }

  let sortedModels = models.map(model => model)
  sortedModels = sortedModels.sort((a, b) =>
    a.node.acf.first_name.localeCompare(b.node.acf.first_name)
  )

  const [genderQuery, setGender] = useState(null)

  const setSearchGender = (e, gender) => {
    setGender(gender)
  }

  return (
    <div
      className="flex flex-column search-overlay"
      style={{
        display: isShown && isOpen ? "block" : "none",
        position: "fixed",
        zIndex: 999,
        background: "white",
        width: "80%",
        height: "100%",
        top: 85,
        overflow: "scroll",
      }}
    >
      <TickerText title="SEARCH" />
      <div
        className="flex flex-column search-queries"
        style={{ paddingTop: 50, paddingBottom: 25, borderBottom: "1px solid" }}
      >
        <button
          onClick={e => setSearchGender(e, null)}
          style={{ fontWeight: !genderQuery ? 700 : 400 }}
        >
          ALL
        </button>
        {sortedModels.some(model => model.node.acf.gender === "male") && (
          <button
            onClick={e => setSearchGender(e, "male")}
            style={{ fontWeight: genderQuery === "male" ? 700 : 400 }}
          >
            MEN
          </button>
        )}
        {sortedModels.some(model => model.node.acf.gender === "female") && (
          <button
            onClick={e => setSearchGender(e, "female")}
            style={{ fontWeight: genderQuery === "female" ? 700 : 400 }}
          >
            WOMEN
          </button>
        )}
      </div>
      <div
        className="flex flex-column search-queries"
        style={{ paddingTop: 50, paddingBottom: 50, marginBottom: 150 }}
      >
        {sortedModels.map(({ node }, index, arr) => {
          if (index === 0 || node.title[0] !== arr[index - 1].node.title[0]) {
            return (
              <React.Fragment key={index}>
                <span
                  style={{ marginTop: 20, marginBottom: 5, fontWeight: 700 }}
                >
                  {arr[index].node.title[0]}
                </span>
                <Link
                  to={`${node.path}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    lineHeight: 1.8,
                  }}
                  key={`model-buttom-${index}`}
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
              to={`${node.path}`}
              style={{
                textDecoration: "none",
                color: "black",
                lineHeight: 1.8,
              }}
              key={`model-${index}`}
            >
              {node.title.toUpperCase()}
            </Link>
          )
        })}
      </div>
      <div
        className="flex"
        style={{
          position: "fixed",
          bottom: 0,
          padding: 10,
          background: "white",
          width: "80%",
          justifyContent: "spaceBetween",
        }}
      >
        <button
          onClick={() => closeOverlay()}
          style={{ background: 0, border: 0, fontWeight: 700 }}
        >
          BACK
        </button>
        <div className="flex justify-end width-100">
          <i className="up-arrow" onClick={() => scrollToTopSearch()} />
        </div>
      </div>
    </div>
  )
}

export default Search

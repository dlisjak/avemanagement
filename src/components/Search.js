import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import posed, { PoseGroup } from "react-pose"

import TickerText from "./Ticker"
import BlackBar from "./BlackBar"

const SearchPose = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
})

const Search = ({ isShown, models, closeSearch }) => {
  const [isOpen, toggleOverlay] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [genderQuery, setGender] = useState(null)
  const inputRef = useRef(null)

  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  useEffect(() => {
    const el = document.querySelector("body")
    const el2 = document.querySelector(".header-fixed-container")

    const openOverlay = () => {
      el.classList.add("overlay")
      el.addEventListener("click", closeOverlay)
      inputRef.current.focus()
    }
    openOverlay()

    return () => {
      el.removeEventListener("click", closeOverlay)
      el.classList.remove("overlay")
    }
  }, [])

  const closeOverlay = e => {
    const some = el => {
      return el.className === "flex flex-column search-overlay"
    }

    if (e.path.some(some)) return
    closeSearch()
  }

  const handleSearchQuery = e => {
    setSearchQuery(e.target.value.toUpperCase())
  }

  const scrollToTopSearch = () => {
    const el = document.querySelector(".search-overlay")
    el.scrollTop = 0
  }

  let sortedModels = models.map(model => model)
  sortedModels = sortedModels.sort((a, b) =>
    a.node.acf.first_name.localeCompare(b.node.acf.first_name)
  )

  const setSearchGender = (e, gender) => {
    setGender(gender)
  }

  return (
    <SearchPose
      className="flex flex-column search-overlay"
      pose={isShown && isOpen ? "visible" : "hidden"}
      style={{
        display: isShown && isOpen ? "block" : "none",
        position: "fixed",
        zIndex: 999999,
        background: "white",
        width: isMobile ? "100%" : "80%",
        maxWidth: 1440,
        height: "80%",
        top: isMobile ? 150 : 167,
        paddingBottom: 200,
      }}
    >
      <TickerText search={true} title="SEARCH" />
      <div
        className="flex flex-column search-queries"
        style={{
          borderBottom: "1px solid",
          marginBottom: 20,
          marginTop: !isMobile && 50,
        }}
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
        <input
          ref={inputRef}
          className="search-input-search"
          type="text"
          placeholder="SEARCH BY NAME"
          onChange={e => handleSearchQuery(e)}
          value={searchQuery}
          style={{ fontSize: 16, marginTop: 10, width: "100%" }}
        />
      </div>

      <BlackBar height={isMobile ? 50 : 100} />

      <div
        className="flex flex-column search-queries"
        style={{
          paddingTop: 20,
          paddingBottom: 50,
          marginBottom: 150,
          paddingBottom: isMobile ? 115 : 275,
          overflow: "scroll",
          height: "100%",
          width: "100%",
        }}
      >
        {sortedModels.map(({ node }, index, arr) => {
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
                  to={`${node.path}`}
                  className="search-result-names"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    lineHeight: 1.8,
                  }}
                  key={`model-button-${index}`}
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
              className="search-result-names"
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
          width: "100%",
          maxWidth: 1440,
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
    </SearchPose>
  )
}

export default Search

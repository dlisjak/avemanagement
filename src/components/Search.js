import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import posed from "react-pose"

import TickerText from "./Ticker"

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
      return (
        el.className === "flex flex-column search-overlay" ||
        el.className === "search-queries__back"
      )
    }

    if (!e.path) return closeSearch()
    if (e.path.some(some)) return
    closeSearch()
  }

  const handleSearchQuery = e => {
    setSearchQuery(e.target.value.toUpperCase())
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
      }}
    >
      <TickerText search={true} title="SEARCH" />
      <div className="flex flex-column search-queries">
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
        <div className="flex align-center">
          <input
            ref={inputRef}
            className="search-input-search"
            type="text"
            placeholder="SEARCH BY NAME"
            onChange={e => handleSearchQuery(e)}
            value={searchQuery}
          />
          <button
            className="search-queries__back"
            onClick={e => closeOverlay(e)}
          >
            BACK
          </button>
        </div>
      </div>

      <div className="flex flex-column search-queries--results">
        {sortedModels.map(({ node }, index, arr) => {
          if (searchQuery) {
            if (!node.title.toUpperCase().includes(searchQuery.toUpperCase())) {
              return null
            }
          }
          node.title = node.title.toLowerCase()
          if (index === 0 || node.title[0] !== arr[index - 1].node.title[0]) {
            return (
              <React.Fragment key={index}>
                <span className="search-queries--results--bold">
                  {arr[index].node.title[0]}
                </span>
                <Link
                  to={`${node.path}`}
                  className="search-result-names"
                  key={`model-button-${index}`}
                >
                  {node.title}
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
              key={`model-${index}`}
            >
              {node.title}
            </Link>
          )
        })}
      </div>
    </SearchPose>
  )
}

export default Search

import React, { useEffect, useState } from "react"

import Header from "./header"
import GetToTop from "./getToTop"
import Loader from "../components/Loader"

const Layout = ({ children, isHomepage, showGetToTop = false }) => {
  const [isMobile, toggleIsMobile] = useState(false)
  const [isTablet, toggleIsTablet] = useState(false)
  const [isLoaderShown, setLoaderShown] = useState(true)

  let marginTop = 0
  if (isMobile && !isHomepage) marginTop = 75
  if (!isHomepage && !isMobile) marginTop = 100

  useEffect(() => {
    const displayLoader = () => {
      setTimeout(() => {
        setLoaderShown(false)
        const bodyEl = document.querySelector("body")
        bodyEl.classList.remove("overlay")
      }, 1500)
    }

    const setBodyUnscrollable = () => {
      const bodyEl = document.querySelector("body")
      bodyEl.classList.add("overlay")
    }

    displayLoader()
    setBodyUnscrollable()
  })

  const checkIfMobile = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 480) toggleIsMobile(true)
      if (window.innerWidth < 1111) toggleIsTablet(true)
    }
  }

  checkIfMobile()

  return (
    <>
      {isLoaderShown ? <Loader /> : null}
      <div
        className="layout-main"
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: `0 auto`,
          paddingTop: 0,
          marginBottom: 0,
        }}
      >
        <Header
          isTablet={isTablet}
          isMobile={isMobile}
          isHomepage={isHomepage}
        />
        <main
          id="main"
          style={{
            width: "100%",
            position: "relative",
            marginTop: marginTop,
          }}
        >
          {children}
        </main>
        {showGetToTop && <GetToTop show={true} />}
      </div>
    </>
  )
}

export default Layout

import React, { useEffect, useState } from "react"

import Header from "./header"
import GetToTop from "./getToTop"
import Loader from "../components/Loader"

const Layout = ({ children, isHomepage }) => {
  const [isMobile, toggleIsMobile] = useState(false)
  const [isTablet, toggleIsTablet] = useState(false)

  useEffect(() => {
    // componentDidMount
    const checkIfMobile = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 480) toggleIsMobile(true)
        if (window.innerWidth < 769) toggleIsTablet(true)
      }
    }
    checkIfMobile()
    // componentDidUnmount
  }, [])

  let marginTopEl = 0

  if (!isHomepage && isMobile) {
    marginTopEl = 50
  }

  if (!isHomepage && isTablet && !isMobile) {
    marginTopEl = 75
  }

  if (!isHomepage && !isTablet && !isMobile) {
    marginTopEl = 100
  }

  return (
    <>
      <Loader />
      <div
        className="layout-main"
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: `0 auto`,
          paddingTop: 0,
          marginBottom: isMobile ? 0 : 125,
        }}
      >
        <Header isTablet={isTablet} isMobile={isMobile} />
        <main
          id="main"
          style={{
            width: "100%",
            position: "relative",
            marginTop: marginTopEl,
          }}
        >
          {children}
        </main>
        {isMobile && <GetToTop />}
        <footer className="flex justify-center width-100"></footer>
      </div>
    </>
  )
}

export default Layout

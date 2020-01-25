import React, { useEffect, useState } from "react"

import Header from "./header"
import GetToTop from "./getToTop"
import Loader from "../components/Loader"
import "./layout.css"

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

  let marginTopEl = 275

  if (!isMobile && !isTablet && isHomepage) {
    marginTopEl = 180
  }

  if (isHomepage && isMobile) {
    marginTopEl = 150
  }

  if (!isHomepage && isMobile) {
    marginTopEl = 200
  }

  if (!isHomepage && isTablet) {
    marginTopEl = 225
  }

  if (isHomepage && isTablet && !isMobile) {
    marginTopEl = 180
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

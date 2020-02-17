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
            marginTop: !isHomepage && !isMobile && 50,
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

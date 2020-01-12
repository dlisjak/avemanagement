import React, { useEffect, useState } from "react"

import Header from "./header"
import GetToTop from "./getToTop"
import Loader from "../components/Loader"
import "./layout.css"

const Layout = ({ children, isHomepage }) => {
  const [isMobile, toggleIsMobile] = useState(false)
  const [isTablet, toggleIsTablet] = useState(false)

  const extraHeight = isHomepage ? 60 : 0

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
          marginBottom: 125,
        }}
      >
        <Header isTablet={isTablet} isMobile={isMobile} />
        <main
          style={{
            width: "100%",
            position: "relative",
            marginTop:
              !isMobile && !isTablet && !isHomepage ? 275 : 225 - extraHeight,
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

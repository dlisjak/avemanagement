import React, { useEffect, useState, useContext } from "react"
import { GlobalStateContext } from "../context/GlobalContextProvider"

import Header from "./header"
import GetToTop from "./getToTop"
import "./layout.css"

const Layout = ({ children, isHomepage }) => {
  const state = useContext(GlobalStateContext)

  const [isMobile, toggleIsMobile] = useState(false)
  const [isTablet, toggleIsTablet] = useState(false)

  useEffect(() => {
    // componentDidMount
    const checkIfMobile = () => {
      if (typeof window !== "undefined") {
        console.log(window.innerWidth)
        if (window.innerWidth < 480) toggleIsMobile(true)
        if (window.innerWidth < 769) toggleIsTablet(true)
      }
    }
    checkIfMobile()

    // componentDidUnmount
  }, [])

  // console.log(state.path)

  return (
    <>
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
            marginTop: !isMobile && !isTablet && !isHomepage ? 225 : 125,
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

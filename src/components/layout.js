import React, { useEffect, useState } from "react"

import Header from "./header"
import GetToTop from "./getToTop"
import Loader from "../components/Loader"
import AddressTicker from "./AddressTicker"

const Layout = ({ children, isHomepage, showGetToTop = false }) => {
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

  let marginTop = 0
  if (isMobile && !isHomepage) marginTop = 75
  if (!isHomepage && !isMobile) marginTop = 100

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
        <footer
          className="flex justify-center align-center width-100"
          style={{ height: 300, position: "relative" }}
        >
          <AddressTicker />
        </footer>
      </div>
    </>
  )
}

export default Layout

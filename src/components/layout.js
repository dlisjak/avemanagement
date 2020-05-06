import React, { useEffect, useState } from "react"

import Header from "./header"
import GetToTop from "./getToTop"
import Loader from "../components/Loader"

const Layout = ({ children, isHomepage, showGetToTop = false }) => {
  const [isLoaderShown, setLoaderShown] = useState(true)
  let marginTop = isHomepage ? 0 : 50
  let isMobile
  let isTablet

  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
    isTablet = window.innerWidth < 1111
  }

  useEffect(() => {
    const displayLoader = () => {
      setTimeout(() => {
        setLoaderShown(false)
      }, 1500)
    }

    displayLoader()
  })

  if (isMobile && !isHomepage) marginTop = 75
  if (!isHomepage && !isMobile) marginTop = 100

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

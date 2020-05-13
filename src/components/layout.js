import React, { useEffect, useState } from "react"

import Header from "./header"
import GetToTop from "./getToTop"
import Loader from "../components/Loader"
import AddressTicker from "./AddressTicker"

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
      <div className="layout-main">
        <Header
          isTablet={isTablet}
          isMobile={isMobile}
          isHomepage={isHomepage}
        />
        <main
          id="main"
          className="main"
          style={{
            marginTop: marginTop,
          }}
        >
          {children}
        </main>
        {showGetToTop && <GetToTop show={true} />}
        {true && <AddressTicker />}
      </div>
    </>
  )
}

export default Layout

import React, { useEffect, useState, useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GlobalStateContext } from "../context/GlobalContextProvider"

import Header from "./header"
import GetToTop from "./getToTop"
import Ticker from "../components/Ticker"
import "./layout.css"

const Layout = ({ children }) => {
  const state = useContext(GlobalStateContext)

  const [isMobile, toggleIsMobile] = useState(false)
  const [isTablet, toggleIsTablet] = useState(false)
  const [isNavRelative, setNavState] = useState(true)

  const headerScroll = () => {
    if (typeof window === "undefined") return
    if (window.scrollY === 0) {
      setNavState(true)
    } else {
      setNavState(false)
    }
  }

  useEffect(() => {
    // componentDidMount
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", headerScroll)
    }
    const checkIfMobile = () => {
      if (typeof window === "undefined") return
      if (window.innerWidth < 769) toggleIsTablet(true)
      if (window.innerWidth < 480) toggleIsMobile(true)
    }
    const checkUrl = () => {
      // console.log(state.path)
    }
    checkIfMobile()
    checkUrl()

    // componentDidUnmount
    return () => {}
  }, [])

  const data = useStaticQuery(graphql`
    {
      allWordpressMenusMenusItems(filter: { name: { eq: "Main" } }) {
        edges {
          node {
            name
            slug
            items {
              title
              child_items {
                title
                url
              }
              url
            }
          }
        }
      }
    }
  `)

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
        <Header
          isNavRelative={isNavRelative}
          path={state.path}
          isTablet={isTablet}
          isMobile={isMobile}
          data={data}
        />
        <main
          style={{
            width: "100%",
            position: "relative",
            marginTop:
              isTablet ||
              (isMobile && isNavRelative) ||
              !isTablet ||
              (!isMobile && isNavRelative)
                ? 0
                : 100,
          }}
        >
          <Ticker fixed={true} title={state.path} />
          {children}
        </main>
        {isMobile && <GetToTop />}
        <footer className="flex justify-center width-100"></footer>
      </div>
    </>
  )
}

export default Layout

import React, { useEffect, useState, useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"

import Header from "./header"
import GetToTop from "./getToTop"
import "./layout.css"

const Layout = ({ children }) => {
  const [isMobile, toggleIsMobile] = useState(false)

  const dispatch = useContext(GlobalDispatchContext)
  useEffect(() => {
    // componentDidMount
    const setPath = () => {
      dispatch({ type: "SET_PATH", payload: window.location.pathname })
    }
    const checkIfMobile = () => {
      if (window.innerWidth < 480) toggleIsMobile(true)
    }
    checkIfMobile()
    setPath()

    // componentDidUnmount
    return () => {}
  }, [dispatch])

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

  return (
    <>
      <div
        className="layout-main"
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: `0 auto`,
          paddingTop: 0,
        }}
      >
        <Header data={data} />
        <main style={{ width: "100%", position: "relative" }}>{children}</main>
        {isMobile && <GetToTop />}
        <footer className="flex justify-center width-100"></footer>
      </div>
    </>
  )
}

export default Layout

import React, { useEffect, useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GlobalDispatchContext, GlobalStateContext } from "../context/GlobalContextProvider";

import Header from "./header"
import "./layout.css"

const Layout = ({children}) => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  useEffect(() => {
    // componentDidMount
    const setPath = () => {
      dispatch({ type: "SET_PATH", payload: window.location.pathname });
    }
    setPath();

    // componentDidUnmount
    return () => {
    }
  }, []);

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
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: `0 auto`,
          maxWidth: 1080,
          paddingTop: 0,
        }}
      >
        <Header data={data} />
        <main style={{ width: "100%" }}>{children}</main>
        <footer className="flex justify-center width-100">
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </>
  )
}

export default Layout

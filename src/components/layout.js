/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

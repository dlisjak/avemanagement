import { StaticQuery, Link, graphql } from "gatsby"
import React from "react"

import Logo from "../images/lool.png"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `white`,
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      height: "100vh",
      maxWidth: 250,
    }}
  >
    <Link
      to="/"
      style={{
        color: `white`,
        textDecoration: `none`,
      }}
    >
      <img src={Logo} alt="ave-logo" style={{ width: "100%" }} />
    </Link>
  </header>
)

/*

<StaticQuery query={graphql(`
    query MainMenu {
      allWordpressMenusMenusItems(filter: {name: {eq: "Main"}}) {
        edges {
          node {
            name
            slug
            items {
              title
              child_items {
                title
              }
            }
          }
        }
      }
    }
    `)
  }
  render={({ allWordpressMenusMenusItems }) => {
    allWordpressMenusMenusItems.edges.forEach(({ node: { items } }) => {
      items.map(({ title, child_items }, index) => {
        <NavigationItem title={title} childItems={child_items} key={index} />
      })
    })
  }}
    />

    */

export default Header

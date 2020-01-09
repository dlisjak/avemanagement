import React, { useState, useEffect, useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Link } from "gatsby"

import Logo from "../images/logo.svg"

import Ticker from "./Ticker"
import { GlobalStateContext } from "../context/GlobalContextProvider"

import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"
import BlackBar from "./BlackBar"

const Header = ({ isMobile, isTablet }) => {
  const state = useContext(GlobalStateContext)

  const [isVisible, setVisibleMenu] = useState(false)

  const toggleMenu = isVisible => {
    setVisibleMenu(!isVisible)
  }

  let tickerHeaderText = ""

  if (typeof window !== "undefined") {
    tickerHeaderText = window.location.pathname
  }

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
    <div
      className="header-fixed-container flex-column"
      style={{
        position: "fixed",
        maxWidth: 1366,
        width: isMobile ? "100%" : "80%",
        display: "block",
        zIndex: 999999,
        background: "white",
      }}
    >
      <Link to="/">
        <img
          src={Logo}
          className="logo"
          alt="Ave Management Logo"
          style={{
            margin: 5,
            marginLeft: 0,
            marginBottom: 0,
            cursor: "pointer",
            width: "100%",
            height: "auto",
            maxWidth: 300,
          }}
        />
      </Link>
      <div
        style={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          className="width-100"
          onClick={() => toggleMenu(isVisible)}
          style={{ cursor: "pointer", zIndex: 99 }}
        >
          <BlackBar height={50} />
          <Ticker title={"MENU"} />
        </div>
        {isMobile || isTablet ? (
          <MobileNav
            toggleMenu={toggleMenu}
            isVisible={isVisible}
            path={state.path}
            data={data}
          />
        ) : (
          <DesktopNav
            toggleMenu={toggleMenu}
            isVisible={isVisible}
            path={state.path}
            data={data}
          />
        )}
      </div>
      <Link to={state.path || "/"} style={{ textDecoration: "none" }}>
        <Ticker title={state.path || tickerHeaderText} />
      </Link>
    </div>
  )
}

export default Header

import React, { useState, useEffect, useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import posed from "react-pose"

import { Link } from "gatsby"

import Logo from "../images/logo.svg"

import Ticker from "./Ticker"
import { GlobalStateContext } from "../context/GlobalContextProvider"

import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"
import BlackBar from "./BlackBar"

const CollapsingTicker = posed(Link)({
  hidden: { top: 50 },
  visible: { top: 73 },
})

const Header = ({ isMobile, isTablet }) => {
  const state = useContext(GlobalStateContext)

  const [isVisible, setVisibleMenu] = useState(false)
  const [tickerCollapsed, collapseTicker] = useState(false)

  const toggleMenu = isVisible => {
    if (isVisible) {
      setVisibleMenu(!isVisible)

      setTimeout(() => {
        collapseTicker(!tickerCollapsed)
      }, 1000)
    } else if (window.location.pathname === "/") {
      collapseTicker(!tickerCollapsed)
      setVisibleMenu(!isVisible)
    } else {
      collapseTicker(!tickerCollapsed)
      setTimeout(() => {
        setVisibleMenu(!isVisible)
      }, 500)
    }
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
        maxWidth: 1440,
        width: "100%",
        display: "block",
        zIndex: 999999,
        background: "white",
      }}
    >
      <Link to="/" style={{ zIndex: 99, position: "relative" }}>
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
            maxWidth: !isMobile ? 300 : 200,
          }}
        />
      </Link>
      <div
        style={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          width: "100%",
          height: "auto",
        }}
      >
        <div
          className="width-100"
          onClick={() => toggleMenu(isVisible)}
          style={{ cursor: "pointer", zIndex: 9999 }}
        >
          <BlackBar height={50} />
          <Ticker title={"MENU"} />
        </div>
        {isMobile || isTablet ? (
          <MobileNav
            toggleMenu={toggleMenu}
            isVisible={isVisible}
            data={data}
          />
        ) : (
          <DesktopNav
            toggleMenu={toggleMenu}
            isVisible={isVisible}
            data={data}
          />
        )}
        <CollapsingTicker
          to={state.index ? `${state.path}/#${state.index}` : state.path}
          pose={tickerCollapsed ? "hidden" : "visible"}
          style={{
            textDecoration: "none",
            textDecoration: "none",
            position: "absolute",
            width: "100%",
            marginTop: 5,
            top: 73,
          }}
        >
          <Ticker title={state.path || tickerHeaderText} />
        </CollapsingTicker>
      </div>
    </div>
  )
}

export default Header

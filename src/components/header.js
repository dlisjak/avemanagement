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
  hidden: { top: 45, marginTop: 0 },
  visible: { top: 70, marginTop: 5 },
})

const Header = ({ isMobile, isTablet, isHomepage }) => {
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
    <div className="header-fixed-container flex-column">
      <Link to="/" style={{ zIndex: 99, position: "relative" }}>
        <img src={Logo} className="logo" alt="Ave Management Logo" />
      </Link>
      <div className="navigation">
        <div
          className="navigation__container width-100"
          onClick={() => toggleMenu(isVisible)}
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
          className="collapsing-ticker"
          to={state.index ? `${state.path}/#${state.index}` : state.path}
          pose={tickerCollapsed ? "hidden" : "visible"}
        >
          {!isHomepage && <Ticker title={state.path || tickerHeaderText} />}
        </CollapsingTicker>
      </div>
    </div>
  )
}

export default Header

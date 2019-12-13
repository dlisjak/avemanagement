import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Logo from "../images/logo.png"

import Ticker from "./Ticker"

import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"

const Header = ({ data, isNavRelative, path, isMobile, isTablet }) => {
  const [isVisible, setVisibleMenu] = useState(false)

  const toggleMenu = isVisible => {
    setVisibleMenu(!isVisible)
  }

  return (
    <div
      className="header-fixed-container flex-column"
      style={{
        position: isNavRelative ? "relative" : "fixed",
        maxWidth: 1366,
        width: isMobile || isNavRelative ? "100%" : "80%",
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
          <Ticker title={"MENU"} />
        </div>
        {isTablet ? (
          <MobileNav
            toggleMenu={toggleMenu}
            isVisible={isVisible}
            path={path}
            data={data}
          />
        ) : (
          <DesktopNav isVisible={isVisible} path={path} data={data} />
        )}
      </div>
    </div>
  )
}

export default Header

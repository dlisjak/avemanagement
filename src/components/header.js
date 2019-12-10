import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import posed from "react-pose"

import Logo from "../images/logo.png"

import Ticker from "./Ticker"
import NavigationItem from "./NavigationItem"

const NavBar = posed.header({
  isVisible: {},
})

const Header = ({ data, isNavRelative }) => {
  const [selectedItem, setSelectedItem] = useState({})
  const [isVisible, setVisibleMenu] = useState(false)
  const [isMobile, toggleIsMobile] = useState(false)
  const [childItems, setChildItems] = useState([])

  useEffect(() => {
    const setUpNav = item => {
      setSelectedItem(item)
      setActiveMenuItemClass(item)
      setChildItems(item.child_items)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkIfMobile)
    }

    // componentDidMount
    const getPath = () => {
      const selectedItemFromLS = JSON.parse(
        localStorage.getItem("ave-navigation")
      )
      if (!selectedItemFromLS) return
      setUpNav(selectedItemFromLS)
    }
    checkIfMobile()
    getPath()
  }, [])

  const checkIfMobile = () => {
    const a = window.innerWidth <= 480
    toggleIsMobile(a)
  }

  const toggleMenu = isVisible => {
    setVisibleMenu(!isVisible)
  }

  const selectItem = (e, item) => {
    const prevActiveItem = document.querySelector(
      `[data-title=${selectedItem.title}]`
    )
    if (prevActiveItem) {
      if (prevActiveItem.baseURI.includes(item.url)) return
      prevActiveItem.classList.remove("active")
    }

    setSelectedItem(item)

    if (item.child_items) {
      setActiveMenuItemClass(item)
      localStorage.setItem("ave-navigation", JSON.stringify(item))
      setChildItems(item.child_items)
    } else {
      if (
        localStorage.getItem("ave-navigation") &&
        !item.url
          .toUpperCase()
          .includes(JSON.parse(localStorage.getItem("ave-navigation")).title)
      ) {
        localStorage.removeItem("ave-navigation")
      }
    }
  }

  const setActiveMenuItemClass = item => {
    const itemTitle = item.title || item

    const activeItem = document.querySelector(`[data-title=${itemTitle}]`)
    if (!activeItem) return
    activeItem.classList.add("active")
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
          style={{ cursor: "pointer" }}
        >
          <Ticker title={"MENU"} />
        </div>
        <header
          className="header__menu--desktop flex-column content-padding"
          style={{
            background: `white`,
            width: "100%",
            display: isVisible ? "flex" : "none",
            marginBottom: isVisible ? 20 : 0,
          }}
        >
          <div
            className="flex"
            style={{ flexDirection: isMobile ? "column" : "row" }}
          >
            {data.allWordpressMenusMenusItems.edges[0].node.items.map(
              (item, index) => (
                <div
                  className="flex"
                  onClick={e => selectItem(e, item)}
                  key={index}
                >
                  <NavigationItem item={item} />
                </div>
              )
            )}
            {!isMobile && (
              <div
                className="flex"
                onClick={e =>
                  selectItem(e, { title: "SEARCH", url: "/search" })
                }
                key={"search"}
              >
                <NavigationItem item={{ title: "SEARCH", url: "/search" }} />
              </div>
            )}
          </div>
          <div className="flex">
            {childItems &&
              childItems.map((childItem, index) => (
                <div
                  className="flex"
                  onClick={e => selectItem(e, childItem)}
                  key={index}
                >
                  <NavigationItem item={childItem} />
                </div>
              ))}
          </div>
        </header>
      </div>
    </div>
  )
}

export default Header

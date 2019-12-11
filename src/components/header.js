import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import posed from "react-pose"

import Logo from "../images/logo.png"

import Ticker from "./Ticker"
import NavigationItem from "./NavigationItem"

const NavBar = posed.header({
  hidden: { opacity: 0, marginTop: -25 },
  visible: { opacity: 1, marginTop: 0 },
})

const SubNavBar = posed.div({
  childHidden: { height: 0 },
  childVisible: { height: 27 },
})

const Header = ({ data, isNavRelative, path }) => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [isVisible, setVisibleMenu] = useState(false)
  const [isMobile, toggleIsMobile] = useState(false)
  const [childItems, setChildItems] = useState([])

  useEffect(() => {
    const setUpNav = () => {
      const parsedPage = parsePage(path)
      if (!parsedPage || parsedPage.length < 1) return
      setActiveMenuItemClass(parsedPage)
      showNavChildren(parsedPage)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkIfMobile)
    }
    checkIfMobile()
    setUpNav()
  }, [path])

  const parsePage = path => {
    const reg = new RegExp("([^a-zA-Z-])", "g")
    return path.replace(reg, " ")
  }

  const checkIfMobile = () => {
    const a = window.innerWidth <= 480
    toggleIsMobile(a)
  }

  const showNavChildren = path => {
    let item
    if (path.includes("women")) {
      item = {
        child_items: [
          {
            title: "IN TOWN",
            url: "/women-in-town",
          },
          {
            title: "DIRECT",
            url: "/women-direct",
          },
          {
            title: "ASIAN / PAN ASIAN",
            url: "/women-asian-pan-asian",
          },
        ],
        title: "WOMEN",
        url: "#",
      }
    } else if (path.includes("men")) {
      item = {
        title: "MEN",
        url: "#",
        child_items: [
          {
            title: "IN TOWN",
            url: "/men-in-town",
          },
          {
            title: "DIRECT",
            url: "/men-direct",
          },
          {
            title: "ASIAN / PAN ASIAN",
            url: "/men-asian-pan-asian",
          },
        ],
      }
    }

    selectItem(item)
  }

  const toggleMenu = isVisible => {
    setVisibleMenu(!isVisible)
  }

  const selectItem = item => {
    if (!item) return
    if (item.child_items) {
      setSelectedItem(item)
      setActiveMenuItemClass(item)
      setChildItems(item.child_items)
    }
  }

  const setActiveMenuItemClass = item => {
    let itemTitle = item.title || item

    const prevActiveItem = document.querySelector(".active")
    if (prevActiveItem) {
      prevActiveItem.classList.remove("active")
    }

    if (itemTitle.includes("women") || itemTitle.includes("men")) {
      itemTitle = itemTitle.split("-")
      itemTitle = itemTitle[0].toUpperCase()
    }

    if (itemTitle.length > 2) {
      const activeItem = document.querySelector(
        "[data-title=" + itemTitle + "]"
      )
      if (!activeItem) return
      activeItem.classList.add("active")
    }
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
        <NavBar
          className="header__menu--desktop flex-column content-padding"
          pose={isVisible ? "visible" : "hidden"}
          style={{
            background: `white`,
            width: "100%",
            zIndex: isVisible ? 999 : 0,
          }}
        >
          <div
            className="flex"
            style={{
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            {data.allWordpressMenusMenusItems.edges[0].node.items.map(
              (item, index) => {
                return (
                  <div
                    className="flex"
                    onClick={() => selectItem(item)}
                    key={index}
                  >
                    <NavigationItem item={item} />
                  </div>
                )
              }
            )}
            {!isMobile && (
              <div
                className="flex"
                onClick={() => selectItem({ title: "SEARCH", url: "/search" })}
                key={"search"}
              >
                <NavigationItem item={{ title: "SEARCH", url: "/search" }} />
              </div>
            )}
          </div>
          <SubNavBar
            pose={isVisible ? "childVisible" : "childHidden"}
            className="flex subnav"
          >
            {childItems &&
              childItems.map((childItem, index) => (
                <div
                  className="flex"
                  onClick={() => selectItem(childItem)}
                  key={index}
                >
                  <NavigationItem item={childItem} />
                </div>
              ))}
          </SubNavBar>
        </NavBar>
      </div>
    </div>
  )
}

export default Header

import React, { useState, useEffect, useContext } from "react"
import posed, { PoseGroup } from "react-pose"
import { navigate } from "@reach/router"

import NavigationItem from "./NavigationItem"

import { GlobalStateContext } from "../context/GlobalContextProvider"

const NavBar = posed.header({
  hidden: {
    opacity: 1,
    marginTop: -25,
    paddingTop: 0,
    paddingBottom: 0,
    transition: { duration: 1000 },
  },
  visible: {
    opacity: 1,
    marginTop: 0,
    paddingTop: 15,
    paddingBottom: 15,
    transition: { duration: 1000 },
  },
})

const SubNavBar = posed.div({
  childHidden: {
    height: 0,
    overflow: "hidden",
    transition: { duration: 1000 },
  },
  childVisible: {
    height: 27,
    overflow: "auto",
    transition: { duration: 1000 },
  },
})

const DesktopNav = ({ toggleMenu, isVisible, data }) => {
  const state = useContext(GlobalStateContext)

  const [selectedItem, setSelectedItem] = useState(null)
  const [childItems, setChildItems] = useState([])
  const [childIsVisible, setChildVisible] = useState(false)

  useEffect(() => {
    const setUpNav = () => {
      const parsedPage = parsePage(state.path)
      if (!parsedPage) return
      if (parsedPage.includes("women") || parsedPage.includes("men")) {
        showNavChildren(parsedPage)
      } else {
        selectItem(null)
        setChildItems(null)
      }
      setActiveMenuItemClass(parsedPage)
    }

    setUpNav()
  }, [state.path])

  const parsePage = parsedPage => {
    if (!parsedPage) return
    const reg = new RegExp("([^a-zA-Z-])", "g")
    return parsedPage.replace(reg, " ")
  }

  const showNavChildren = parsedPage => {
    if (!parsedPage) return
    let item

    if (parsedPage.includes("women")) {
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
    } else if (parsedPage.includes("men")) {
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

  const selectItem = item => {
    if (!item) return
    if (item.child_items) {
      setSelectedItem(item)
      setActiveMenuItemClass(item)
      setChildItems(item.child_items)
      setChildVisible(true)
    } else {
      toggleMenu(isVisible)
      setChildItems(null)
      setChildVisible(false)

      setTimeout(() => {
        navigate(item.url)
      }, 500)
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
    <PoseGroup>
      <NavBar
        className="header__menu--desktop flex-column content-padding"
        pose={isVisible ? "visible" : "hidden"}
        style={{
          background: `white`,
          width: "100%",
          zIndex: 999,
          pointerEvents: isVisible ? "inherit" : "none",
        }}
        key={"main-navbar"}
      >
        <div
          className="flex"
          style={{
            flexDirection: "row",
            height: !isVisible ? 25 : "auto",
          }}
        >
          {data.allWordpressMenusMenusItems.edges[0].node.items.map(
            (item, index) => {
              return (
                <div
                  className="flex"
                  onClick={() => selectItem(item)}
                  key={index}
                  style={{ alignItems: "center" }}
                >
                  <NavigationItem item={item} />
                </div>
              )
            }
          )}
        </div>
        <SubNavBar
          pose={
            childItems && isVisible && childIsVisible
              ? "childVisible"
              : "childHidden"
          }
          className="flex subnav"
          key={"sub-nav"}
        >
          {childItems &&
            childItems.map((childItem, index) => (
              <div
                className="flex"
                onClick={() => selectItem(childItem)}
                key={index}
                style={{ alignItems: "center" }}
              >
                <NavigationItem item={childItem} />
              </div>
            ))}
        </SubNavBar>
      </NavBar>
    </PoseGroup>
  )
}

export default DesktopNav

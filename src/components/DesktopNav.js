import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import posed from "react-pose"

import NavigationItem from "./NavigationItem"

const NavBar = posed.header({
  hidden: { opacity: 0, marginTop: -25, paddingTop: 0, paddingBottom: 0 },
  visible: { opacity: 1, marginTop: 0, paddingTop: 15, paddingBottom: 15 },
})

const SubNavBar = posed.div({
  childHidden: { height: 0 },
  childVisible: { height: 27 },
})

const MobileNav = ({ isVisible, path, data }) => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [childItems, setChildItems] = useState([])

  useEffect(() => {
    const setUpNav = () => {
      const parsedPage = parsePage(path)
      if (!parsedPage || parsedPage.length < 1) return
      setActiveMenuItemClass(parsedPage)
      showNavChildren(parsedPage)
    }

    setUpNav()
  }, [path])

  const parsePage = path => {
    const reg = new RegExp("([^a-zA-Z-])", "g")
    return path.replace(reg, " ")
  }

  const showNavChildren = path => {
    let item = path
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

  const selectItem = item => {
    if (!item) return
    if (item.child_items) {
      setSelectedItem(item)
      setActiveMenuItemClass(item)
      setChildItems(item.child_items)
    } else {
      setChildItems(null)
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
    <NavBar
      className="header__menu--desktop flex-column content-padding"
      pose={isVisible ? "visible" : "hidden"}
      style={{
        background: `white`,
        width: "100%",
        zIndex: isVisible ? 999 : 0,
        pointerEvents: isVisible ? "inherit" : "none",
      }}
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
              >
                <NavigationItem item={item} />
              </div>
            )
          }
        )}
        <div
          className="flex"
          onClick={() => selectItem({ title: "SEARCH", url: "/search" })}
          key={"search"}
        >
          <NavigationItem item={{ title: "SEARCH", url: "/search" }} />
        </div>
      </div>
      <SubNavBar
        pose={childItems && isVisible ? "childVisible" : "childHidden"}
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
  )
}

export default MobileNav

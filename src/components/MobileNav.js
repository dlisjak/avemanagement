import React, { useState, useEffect } from "react"
import posed, { PoseGroup } from "react-pose"

import NavigationItem from "./NavigationItem"

const MobileNavPose = posed.div({
  hidden: {
    minHeight: 0,
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: { duration: 750 },
  },
  visible: {
    minHeight: "100vh",
    paddingTop: 25,
    paddingBottom: 50,
    transition: { duration: 1000 },
  },
})

const ChildNav = posed.div({
  exit: { opacity: 0, height: 0, zIndex: -100 },
  enter: { opacity: 1, height: "auto", zIndex: 999 },
})

const MobileNav = ({ isVisible, data, toggleMenu }) => {
  const [activeItem, setActiveItem] = useState(null)
  const [womenIsShown, showWomen] = useState(false)
  const [menIsShown, showMen] = useState(false)

  const showChildren = item => {
    if (!item.child_items) return

    setActiveItem(item.title)
    if (item.title === "WOMEN") {
      showMen(false)
      showWomen(!womenIsShown)
    } else if (item.title === "MEN") {
      showWomen(false)
      showMen(!menIsShown)
    }
  }

  useEffect(() => {
    const setBodyUnscrollable = () => {
      const bodyEl = document.querySelector("body")
      if (isVisible) {
        bodyEl.classList.add("overlay")
      }
    }

    setBodyUnscrollable()

    return () => {
      const bodyEl = document.querySelector("body")
      bodyEl.classList.remove("overlay")
    }
  }, [])

  useEffect(() => {
    const preselectActiveItem = () => {
      if (window.location.pathname.includes("women")) {
        setActiveItem("WOMEN")
        showWomen(true)
      } else if (window.location.pathname.includes("men")) {
        setActiveItem("MEN")
        showMen(true)
      }
    }
    preselectActiveItem()
  }, [])

  return (
    <MobileNavPose
      className="mobile-navigation flex flex-column"
      pose={isVisible ? "visible" : "hidden"}
      style={{
        pointerEvents: isVisible ? "inherit" : "none",
      }}
    >
      {data.allWordpressMenusMenusItems.edges[0].node.items.map(
        (item, index) => {
          return (
            <PoseGroup key={index}>
              <div
                className="flex flex-column"
                onClick={() => showChildren(item)}
                style={{ fontWeight: activeItem === item.title ? 700 : 400 }}
                key={index}
              >
                <NavigationItem isMobile={true} item={item} />
                {item.child_items && (
                  <ChildNav
                    pose={
                      item.title === "WOMEN"
                        ? womenIsShown
                          ? "enter"
                          : "exit"
                        : menIsShown
                        ? "enter"
                        : "exit"
                    }
                    className="flex flex-column child-nav-item"
                  >
                    {item.child_items.map((childItem, childIndex) => (
                      <div
                        className="flex mobile-navigation--child"
                        key={childIndex}
                      >
                        <NavigationItem isMobile={true} item={childItem} />
                      </div>
                    ))}
                  </ChildNav>
                )}
              </div>
            </PoseGroup>
          )
        }
      )}
    </MobileNavPose>
  )
}

export default MobileNav

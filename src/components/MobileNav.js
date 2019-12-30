import React, { useState, useEffect } from "react"
import posed, { PoseGroup } from "react-pose"

import NavigationItem from "./NavigationItem"

const MobileNavPose = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
})

const ChildNav = posed.div({
  exit: { opacity: 0, height: 0, zIndex: -100 },
  enter: { opacity: 1, height: "auto", zIndex: 999 },
})

const MobileNav = ({ isVisible, data, toggleMenu }) => {
  const [activeItem, setActiveItem] = useState(null)
  const [womenIsShown, showWomen] = useState(false)
  const [menIsShown, showMen] = useState(false)

  useEffect(() => {
    const setBodyUnscrollable = () => {
      const bodyEl = document.querySelector("body")
      if (isVisible) {
        bodyEl.classList.add("overlay")
      }
    }

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
    setBodyUnscrollable()

    return () => {
      const bodyEl = document.querySelector("body")
      bodyEl.classList.remove("overlay")
    }
  }, [isVisible])

  const closeOverlay = () => {
    toggleMenu(isVisible)
  }

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

  return (
    <MobileNavPose
      className="flex flex-column"
      pose={isVisible ? "visible" : "hidden"}
      style={{
        position: "absolute",
        display: "flex",
        top: 68,
        left: 0,
        width: "100%",
        height: "100vh",
        background: `white`,
        zIndex: 999,
        pointerEvents: isVisible ? "inherit" : "none",
        alignItems: "center",
        paddingTop: 60,
      }}
    >
      {data.allWordpressMenusMenusItems.edges[0].node.items.map(
        (item, index) => {
          return (
            <PoseGroup key={index}>
              <div
                className="flex mobile-navigation"
                onClick={() => showChildren(item)}
                style={{ fontWeight: activeItem === item.title ? 700 : 400 }}
                key={index}
              >
                <NavigationItem item={item} />
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
                    className="flex"
                    style={{
                      opacity: 0,
                      height: 0,
                      flexDirection: "column",
                      paddingLeft: 50,
                    }}
                  >
                    {item.child_items.map((childItem, childIndex) => (
                      <div
                        className="flex mobile-navigation--child"
                        key={childIndex}
                      >
                        <NavigationItem item={childItem} />
                      </div>
                    ))}
                  </ChildNav>
                )}
              </div>
            </PoseGroup>
          )
        }
      )}
      <button
        onClick={() => closeOverlay()}
        style={{
          background: 0,
          border: 0,
          fontWeight: 700,
          top: 30,
          position: "absolute",
          left: 10,
          padding: 0,
        }}
      >
        BACK
      </button>
    </MobileNavPose>
  )
}

export default MobileNav

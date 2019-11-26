import React, { Component } from "react"
import { StaticQuery, Link, graphql } from "gatsby"

import Ticker from "./Ticker"

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      selectedItem: null,
      childItems: [],
    }

    this.navigationObj = {
      women: ["women-in-town", "women-direct", "women-asian-pan-asian"],
      men: ["men-in-town", "men-direct", "men-asian-pan-asian"],
    }
  }

  componentDidMount() {
    const navigationData = localStorage.getItem("ave-navigation")
    if (!navigationData) return

    this.setUpNav(navigationData)
  }

  deleteLS() {
    const url = window.location.pathname
    if (!url.includes("men") && !url.includes("women")) {
      localStorage.removeItem("ave-navigation")
    }
  }

  setUpNav(navigationData) {
    if (navigationData) {
      const selector = document.querySelector(
        `[data-title="${navigationData.toUpperCase()}"]`
      )
      selector.classList.add("active")

      if (navigationData[1]) {
        const selectorTwo = document.querySelector(
          `[data-title="${navigationData.toUpperCase()}"]`
        )
        if (selectorTwo) {
          selectorTwo.classList.add("active")
        }
      }
    }
  }

  setChildElements(e, item) {
    const prevEl = document.querySelector("div.active")
    if (prevEl) prevEl.classList.remove("active")
    e.target.classList.add("active")
    if (!item.child_items) return

    localStorage.setItem("ave-navigation", item.title)

    this.setState({
      selectedItem: item,
      childItems: item.child_items,
    })
  }

  toggleMenu() {
    const lsItem = localStorage.getItem("ave-navigation")
    if (lsItem) {
      let selector = {}
      if (lsItem === "WOMEN") {
        selector = {
          child_items: [
            { title: "IN TOWN", url: "/women-in-town" },
            { title: "DIRECT", url: "/women-direct" },
            { title: "ASIAN / PAN ASIAN", url: "/women-asian-pan-asian" },
          ],
          title: "WOMEN",
          url: "#",
        }
      } else {
        selector = {
          child_items: [
            { title: "IN TOWN", url: "/men-in-town" },
            { title: "DIRECT", url: "/men-direct" },
            { title: "ASIAN / PAN ASIAN", url: "/men-asian-pan-asian" },
          ],
          title: "MEN",
          url: "#",
        }
      }

      this.setState({
        selectedItem: selector,
        childItems: selector.child_items,
        visible: !this.state.visible,
      })
    }

    this.setState({
      visible: !this.state.visible,
    })

    console.log(this.state)
  }

  render() {
    return (
      <>
        <div
          className="width-100"
          style={{
            position: "absolute",
            top: 0,
            height: 26,
            zIndex: 999,
            cursor: "pointer",
          }}
          onClick={() => this.toggleMenu()}
        ></div>
        <Ticker title={"MENU"} />
        <header
          style={{
            background: `white`,
            flexDirection: "column",
            width: "100%",
            display: this.state.visible ? "flex" : "none",
          }}
        >
          <StaticQuery
            query={graphql`
              query MainMenu {
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
            `}
            render={({ allWordpressMenusMenusItems }) => (
              <>
                <div className="flex">
                  {allWordpressMenusMenusItems.edges[0].node.items.map(
                    (mainItem, index) => {
                      if (mainItem.url.includes("#")) {
                        return (
                          <div
                            onClick={e => this.setChildElements(e, mainItem)}
                            key={index}
                            data-title={mainItem.title}
                            style={{
                              paddingLeft: 10,
                              paddingRight: 10,
                              paddingTop: 5,
                              paddingBottom: 5,
                              fontSize: 14,
                              textDecoration: "none",
                            }}
                          >
                            {mainItem.title}
                          </div>
                        )
                      }
                      return (
                        <div
                          onClick={e => this.setChildElements(e, mainItem)}
                          key={index}
                          data-title={mainItem.title}
                          style={{ display: "flex" }}
                        >
                          <Link
                            to={mainItem.url}
                            style={{
                              paddingLeft: 10,
                              paddingRight: 10,
                              paddingTop: 5,
                              paddingBottom: 5,
                              fontSize: 14,
                              textDecoration: "none",
                            }}
                          >
                            {mainItem.title}
                          </Link>
                        </div>
                      )
                    }
                  )}
                </div>
                <div className="flex">
                  {this.state.childItems &&
                    this.state.childItems.map((childItem, index) => (
                      <Link
                        to={childItem.url}
                        data-title={childItem.title}
                        style={{
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 5,
                          paddingBottom: 5,
                          fontSize: 14,
                          textDecoration: "none",
                        }}
                        key={index}
                      >
                        {childItem.title}
                      </Link>
                    ))}
                </div>
              </>
            )}
          />
        </header>
      </>
    )
  }
}

export default Header

import React, { Component } from "react"
import { StaticQuery, Link, graphql } from "gatsby"

import Logo from "../images/logo.png"

import Ticker from "./Ticker"

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      selectedItem: null,
      childItems: [],
      isMobile: false,
    }

    this.navigationObj = {
      women: ["women-in-town", "women-direct", "women-asian-pan-asian"],
      men: ["men-in-town", "men-direct", "men-asian-pan-asian"],
    }

    this.toggleMenu = this.toggleMenu.bind(this)
    this.resizeHeader = this.resizeHeader.bind(this)
  }

  componentDidMount() {
    this.resizeHeader()
    window.addEventListener("resize", this.resizeHeader)
    const navigationData = localStorage.getItem("ave-navigation")
    if (!navigationData) return

    this.setUpNav(navigationData)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHeader)
  }

  resizeHeader() {
    this.setState({
      isMobile: window.innerWidth < 480,
    })
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
        `[data-title="${navigationData}"]`
      )
      if (selector) {
        selector.classList.add("active")
      }

      if (navigationData[1]) {
        const selectorTwo = document.querySelector(
          `[data-title="${navigationData}"]`
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
    if (!item.child_items) {
      localStorage.setItem("ave-navigation", item.url.replace("/", ""))
      this.setState({
        selectedItem: null,
        childItems: null,
      })
      return
    }

    this.setState({
      selectedItem: item,
      childItems: item.child_items,
    })
  }

  toggleMenu() {
    const lsItem = localStorage.getItem("ave-navigation")
    if (lsItem) {
      let selector = {}
      if (lsItem.includes("women")) {
        selector = {
          child_items: [
            { title: "IN TOWN", url: "/women-in-town" },
            { title: "DIRECT", url: "/women-direct" },
            { title: "ASIAN / PAN ASIAN", url: "/women-asian-pan-asian" },
          ],
          title: "WOMEN",
          url: "#",
        }
      } else if (lsItem.includes("men")) {
        selector = {
          child_items: [
            { title: "IN TOWN", url: "/men-in-town" },
            { title: "DIRECT", url: "/men-direct" },
            { title: "ASIAN / PAN ASIAN", url: "/men-asian-pan-asian" },
          ],
          title: "MEN",
          url: "#",
        }
      } else {
        console.log("do something")
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
  }

  render() {
    return (
      <>
        <div
          className="width-100"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: 26,
            zIndex: 999,
            cursor: "pointer",
          }}
        ></div>
        <Link to="/">
          <img
            src={Logo}
            style={{
              margin: 5,
              marginLeft: 0,
              marginBottom: 0,
              maxHeight: 50,
              cursor: "pointer",
            }}
          />
        </Link>
        <Ticker title={"MENU"} toggleMenu={this.toggleMenu} />
        <header
          style={{
            background: `white`,
            flexDirection: "column",
            width: "100%",
            display: this.state.visible ? "flex" : "none",
          }}
        >
          <>
            <div className="flex">
              {this.props.data.allWordpressMenusMenusItems.edges[0].node.items.map(
                (mainItem, index) => {
                  if (mainItem.url.includes("#") && !this.state.isMobile) {
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
                          cursor: "pointer",
                        }}
                      >
                        {mainItem.title}
                      </div>
                    )
                  }
                  return (
                    <div
                      onClick={e => {
                        this.setChildElements(e, mainItem)
                      }}
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
                    onClick={e => {
                      this.setChildElements(e, childItem)
                    }}
                    to={childItem.url}
                    data-title={childItem.url}
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
        </header>
      </>
    )
  }
}

export default Header

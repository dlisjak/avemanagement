import React, { useContext, useState, useEffect } from "react"
import { Link } from "gatsby"
import { GlobalDispatchContext, GlobalStateContext } from "../context/GlobalContextProvider";

import Logo from "../images/logo.png"

import Ticker from "./Ticker"
import NavigationItem from "./NavigationItem";

const Header = ({data}) => {
  const [isVisible, setVisibleMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [childItems, setChildItems] = useState([]);

  useEffect(() => {
    // componentDidMount
    const getPath = () => {
      const selectedItemFromLS = JSON.parse(localStorage.getItem("ave-navigation"));
      if (!selectedItemFromLS) return;
      selectItem(null, selectedItemFromLS);
    }
    getPath();

  }, []);

  const toggleMenu = (isVisible) => {
    setVisibleMenu(!isVisible);
  }

  const selectItem = (e, item) => {
    setSelectedItem(item);
    if (item.child_items) {
      localStorage.setItem("ave-navigation", JSON.stringify(item))
      setChildItems(item.child_items);
    } else {
      localStorage.removeItem("ave-navigation")
    }
  }

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
      <div className="width-100" onClick={() => toggleMenu(isVisible)}>
        <Ticker title={"MENU"} />
      </div>
      <header
        className="header__menu--desktop flex-column"
        style={{
          background: `white`,
          width: "100%",
          display: isVisible ? "flex" : "none",
        }}
      >
        <div className="flex">
          {data.allWordpressMenusMenusItems.edges[0].node.items.map((item, index) => (
            <div className="flex" onClick={(e) => selectItem(e, item)} key={index} style={{ fontWeight: item.title === selectedItem.title ? "bold" : "regular" }}>
              <NavigationItem item={item} />
            </div>
          ))}
        </div>
        <div className="flex">
          {childItems && childItems.map((childItem, index) => (
            <div className="flex" key={index}>
              <NavigationItem item={childItem} />
            </div>
          ))}
        </div>
      </header>
    </>
  )
}

export default Header;


/*
<div style={{ display: !this.state.isMobile ? "flex" : "none" }}>
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

*/

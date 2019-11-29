import React, { useContext, useState, useEffect } from "react"
import { Link } from "gatsby"

import Logo from "../images/logo.png"

import Ticker from "./Ticker"
import NavigationItem from "./NavigationItem";

const Header = ({data}) => {
  const [isMobile, toggleIsMobile] = useState(false);
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
    const checkIfMobile = () => {
      if (window.innerWidth < 480) toggleIsMobile(true);
    }
    checkIfMobile();
    getPath();
  },[]);

  const toggleMenu = (isVisible) => {
    setVisibleMenu(!isVisible);
  }

  const selectItem = (e, item) => {
    const prevActiveItem = document.querySelector(`[data-title=${selectedItem.title}]`);
    if (prevActiveItem) {
      prevActiveItem.classList.remove("active")
    }

    setSelectedItem(item);

    if (item.child_items) {
      setActiveMenuItemClass(item);
      localStorage.setItem("ave-navigation", JSON.stringify(item))
      setChildItems(item.child_items);
    } else {
      localStorage.removeItem("ave-navigation")
    }
  }

  const setActiveMenuItemClass = (item) => {
    const itemTitle = item.title;

    const activeItem = document.querySelector(`[data-title=${itemTitle}]`)
    if (!activeItem) return;
    activeItem.classList.add("active");

  }

  return (
    <>
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
      <div className="width-100" onClick={() => toggleMenu(isVisible)} style={{ cursor: "pointer" }}>
        <Ticker title={"MENU"} />
      </div>
      <header
        className="header__menu--desktop flex-column content-padding"
        style={{
          background: `white`,
          width: "100%",
          display: isVisible ? "flex" : "none",
        }}
      >
        <div className="flex">
          {data.allWordpressMenusMenusItems.edges[0].node.items.map((item, index) => (
            <div className="flex" onClick={(e) => selectItem(e, item)} key={index}>
              <NavigationItem item={item} />
            </div>
          ))}
          {!isMobile && (
            <div className="flex" onClick={(e) => selectItem(e, {title: "SEARCH", url: "/search"})} key={"search"}>
              <NavigationItem item={{title: "SEARCH", url: "/search"}} />
            </div>
          )}
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

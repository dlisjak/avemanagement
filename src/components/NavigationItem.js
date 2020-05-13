import React from "react"
import { Link } from "gatsby"

const navigateToPage = (e, isMobile) => {
  if (!isMobile) {
    e.preventDefault()
  }
}

const NavigationItem = ({ item, isMobile }) => {
  if (item.url.includes("#")) {
    return (
      <Link
        className="navigation-item"
        data-title={item.title}
        to={`/${item.title.toLowerCase()}`}
        partiallyActive={true}
        onClick={e => {
          navigateToPage(e, false)
        }}
      >
        {item.title}
      </Link>
    )
  } else if (item.url.includes("https")) {
    return (
      <a
        className="navigation-item"
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.title}
      </a>
    )
  } else {
    return (
      <Link
        className="navigation-item"
        to={`${item.url}`}
        data-title={item.title.replace(/\s/g, "-")}
        partiallyActive={true}
        onClick={e => navigateToPage(e, isMobile)}
      >
        {item.title}
      </Link>
    )
  }
}

export default NavigationItem

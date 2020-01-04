import React from "react"
import { Link } from "gatsby"

const navigateToPage = e => {
  e.preventDefault()
}

const NavigationItem = ({ item }) => {
  if (item.url.includes("#")) {
    return (
      <Link
        data-title={item.title}
        to={`/${item.title.toLowerCase()}`}
        activeStyle={{ fontWeight: 700 }}
        partiallyActive={true}
        onClick={e => e.preventDefault()}
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
        {item.title}
      </Link>
    )
  } else if (item.url.includes("http")) {
    return (
      <a
        href={`${item.url}`}
        target="_blank"
        rel="noopener noreferrer"
        data-title={item.title.replace(/\s/g, "-")}
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
          fontSize: 14,
          textDecoration: "none",
        }}
      >
        {item.title}
      </a>
    )
  } else {
    return (
      <Link
        to={`${item.url}`}
        data-title={item.title.replace(/\s/g, "-")}
        partiallyActive={true}
        onClick={e => e.preventDefault()}
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
          fontSize: 14,
          textDecoration: "none",
        }}
      >
        {item.title}
      </Link>
    )
  }
}

export default NavigationItem

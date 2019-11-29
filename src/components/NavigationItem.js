import React from "react"
import { Link } from "gatsby"

const NavigationItem = ({ item }) => {
  if (item.url.includes('#')) {
    return (
      <div
        data-title={item.title}
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
      </div>
    )
  } else {
    return (
      <Link
        to={item.url}
        data-title={item.url.replace("/", "")}
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

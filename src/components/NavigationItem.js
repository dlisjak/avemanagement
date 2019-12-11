import React from "react"
import { Link } from "gatsby"

const NavigationItem = ({ item }) => {
  if (item.url.includes("#")) {
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
  } else if (item.url.includes("http")) {
    return (
      <a
        href={`${item.url}/`}
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
        to={`${item.url}/`}
        target="_blank"
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
      </Link>
    )
  }
}

export default NavigationItem

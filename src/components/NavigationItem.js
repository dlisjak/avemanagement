import React from "react"
import { Link } from "gatsby"

const NavigationItem = ({ item: { title, url, child_items } }) => {
  return (
    <div className="flex nav__item">
      <Link to={url}>{title}</Link>
      {child_items && (
        <div className="flex">
          {child_items.map((childItem, index) => (
            <Link className="flex" to={childItem.url} key={index}>
              {childItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default NavigationItem

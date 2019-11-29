import React from "react"
import { Link } from "gatsby"

const Navigation = ({ items }) => {

  return (
    <div className="flex">
      {items.map((item, index) => (
        <Link to={item.url} key={index}>
          {item.title}
        </Link>
      ))}
    </div>
  )
}

export default Navigation

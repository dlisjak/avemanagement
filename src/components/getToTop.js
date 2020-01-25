import React from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"

const GetToTop = () => {
  return (
    <div className="flex justify-end width-100">
      <AnchorLink href="#main" offset="200">
        <i className="up-arrow" />
      </AnchorLink>
    </div>
  )
}

export default GetToTop

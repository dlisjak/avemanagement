import React, { useState, useEffect } from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"

const GetToTop = ({ show }) => {
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", calculateScroll)
    return () => {
      window.removeEventListener("scroll", calculateScroll)
    }
  }, [])

  const calculateScroll = e => {
    if (window.scrollY < 400) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }

  return (
    <AnchorLink href="#main" offset="200">
      <div
        id="getToTop"
        className="getToTop flex justify-end hidden"
        style={{
          display: show && isVisible ? "block" : "none",
        }}
      >
        <i className="relative up-arrow" />
      </div>
    </AnchorLink>
  )
}

export default GetToTop

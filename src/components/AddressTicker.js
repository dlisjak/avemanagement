import React from "react"

import FooterLogo from "../images/logo-footer.svg"

const AddressTicker = () => {
  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  return (
    <img
      style={{ display: "block", position: "relative" }}
      src={FooterLogo}
      className="footer-logo"
      alt="Ave Management Logo"
    />
  )
}

export default AddressTicker

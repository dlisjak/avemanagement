import React from "react"

import Logo from "../images/logo.svg"

const AddressTicker = () => {
  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  return (
    <div
      style={{
        transform: "rotate(90deg)",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "column",
      }}
    >
      <span style={{ fontSize: "8rem", lineHeight: 0.75 }}>2020</span>
      <img
        style={{ display: "block", position: "relative", left: 35 }}
        src={Logo}
        className="logo"
        alt="Ave Management Logo"
      />
      <h3
        style={{
          fontSize: "4rem",
          textAlign: "end",
          lineHeight: 0.8,
          fontWeight: 300,
        }}
      >
        MANAGE
        <br />
        MENT
      </h3>
    </div>
  )
}

export default AddressTicker

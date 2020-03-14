import React, { useState, useEffect } from "react"

import Logo from "../images/logo.svg"

const Loader = () => {
  let isMobile

  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  return (
    <div
      className="flex flex-column"
      key={0}
      style={{
        position: "absolute",
        display: "flex",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: isMobile ? "100%" : "80%",
        height: "100vh",
        background: `white`,
        zIndex: 9999999999,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 100,
        maxWidth: 1440,
        margin: "auto",
      }}
    >
      <img
        key={1}
        className="loading-logo"
        src={Logo}
        alt="AVE LOGO"
        style={{
          margin: "5px 5px 0px 0px",
          cursor: "pointer",
          width: "100%",
          height: "auto",
          maxWidth: 250,
          position: isMobile ? "relative" : "absolute",
          top: !isMobile && 0,
          left: !isMobile && 0,
        }}
      />
    </div>
  )
}

export default Loader

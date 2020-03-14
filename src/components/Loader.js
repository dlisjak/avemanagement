import React, { useState, useEffect } from "react"

import Logo from "../images/logo.svg"

const Loader = () => {
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
        width: "100%",
        height: "100vh",
        background: `white`,
        zIndex: 9999999999,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="loadingContainer"
        style={{ width: "80%", margin: "auto", height: "100%" }}
      >
        <img
          key={1}
          className="loading-logo"
          src={Logo}
          alt="AVE LOGO"
          style={{
            margin: 5,
            marginLeft: 0,
            marginBottom: 0,
            cursor: "pointer",
            width: "100%",
            height: "auto",
            maxWidth: 250,
            position: "relative",
          }}
        />
      </div>
    </div>
  )
}

export default Loader

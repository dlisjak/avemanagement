import React, { useEffect } from "react"

import Logo from "../images/logo.svg"

const Loader = () => {
  useEffect(() => {
    const displayLoader = () => {
      const bodyEl = document.querySelector("body")
      bodyEl.classList.add("overlay")

      setTimeout(() => {
        bodyEl.classList.remove("overlay")
      }, 1500)
    }

    displayLoader()
  })

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
      <div className="loadingContainer">
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
            position: "relative",
          }}
        />
      </div>
    </div>
  )
}

export default Loader

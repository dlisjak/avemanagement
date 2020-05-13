import React, { useEffect } from "react"

import Logo from "../images/logo.svg"

const Loader = () => {
  const bodyEl = document.querySelector("body")
  bodyEl.classList.add("overlay")

  setTimeout(() => {
    bodyEl.classList.remove("overlay")
  }, 1500)

  return (
    <div className="loaderMain flex flex-column" key={0}>
      <div className="loadingContainer">
        <img key={1} className="loading-logo" src={Logo} alt="AVE LOGO" />
      </div>
    </div>
  )
}

export default Loader

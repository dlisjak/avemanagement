import React, { useEffect, useState } from "react"
import posed, { PoseGroup } from "react-pose"

import Logo from "../images/logo.svg"

const LoadingOverlay = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
})

const Loader = () => {
  const [isLogoShown, setLogoShown] = useState(false)
  const [isLoaderShown, setLoaderShown] = useState(true)

  useEffect(() => {
    const setBodyUnscrollable = () => {
      const bodyEl = document.querySelector("body")
      bodyEl.classList.add("overlay")
    }
    const showLogo = () => {
      setLogoShown(false)
    }
    const displayLoader = () => {
      setTimeout(() => {
        setLoaderShown(false)
        const bodyEl = document.querySelector("body")
        bodyEl.classList.remove("overlay")
      }, 1500)
    }
    displayLoader()
    // showLogo()
    setBodyUnscrollable()
  }, [])

  return (
    isLoaderShown && (
      <PoseGroup>
        <LoadingOverlay
          className="flex flex-column"
          pose={isLoaderShown ? "visible" : "hidden"}
          key={0}
          style={{
            position: "fixed",
            display: "flex",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: `white`,
            zIndex: 9999999999,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 100,
          }}
        >
          <img
            key={1}
            className="loading-logo"
            src={Logo}
            alt="AVE LOGO"
            style={{ width: 300 }}
          />
        </LoadingOverlay>
      </PoseGroup>
    )
  )
}

export default Loader

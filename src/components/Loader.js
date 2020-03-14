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
      }, 15000000)
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
            position: "relative",
            display: "flex",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "80%",
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
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </LoadingOverlay>
      </PoseGroup>
    )
  )
}

export default Loader

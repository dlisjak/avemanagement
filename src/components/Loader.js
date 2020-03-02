import React, { useEffect, useState } from "react"
import posed, { PoseGroup } from "react-pose"

import Logo from "../images/logo.svg"

const LoadingLogo = posed.img({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
})

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
      setLogoShown(true)
    }
    const displayLoader = () => {
      setTimeout(() => {
        setLoaderShown(false)
        const bodyEl = document.querySelector("body")
        bodyEl.classList.remove("overlay")
      }, 1500)
    }
    displayLoader()
    showLogo()
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
            display: "flex",
            top: 0,
            left: 0,
            width: "80%",
            height: "100vh",
            background: `white`,
            zIndex: 9999999999,
          }}
        >
          <LoadingLogo
            className="logo"
            pose={isLogoShown ? "visible" : "hidden"}
            key={1}
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
            }}
          />
        </LoadingOverlay>
      </PoseGroup>
    )
  )
}

export default Loader

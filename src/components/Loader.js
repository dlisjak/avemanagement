import React, { useEffect, useState } from "react"
import posed from "react-pose"

import Logo from "../images/logo.svg"

const LoadingLogo = posed.img({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
})

const Loader = () => {
  const [isLogoShown, setLogoShown] = useState(false)

  useEffect(() => {
    const setBodyUnscrollable = () => {
      const bodyEl = document.querySelector("body")
      bodyEl.classList.add("overlay")
    }
    const showLogo = () => {
      setTimeout(() => {
        setLogoShown(true)
      })
    }
    setBodyUnscrollable()
    showLogo()
    return () => {
      const bodyEl = document.querySelector("body")
      bodyEl.classList.remove("overlay")
    }
  }, [])

  return (
    <div
      className="flex flex-column"
      style={{
        position: "absolute",
        display: "flex",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: `white`,
        zIndex: 9999999999,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 60,
      }}
    >
      <LoadingLogo
        pose={isLogoShown ? "visible" : "hidden"}
        src={Logo}
        alt="AVE LOGO"
        style={{ width: 300 }}
      />
    </div>
  )
}

export default Loader

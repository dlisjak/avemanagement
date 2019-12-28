import React, { useEffect, useRef } from "react"

const TickerText = ({ title, fixed = false, left = false }) => {
  const tickerRef = useRef(null)
  const tickerRef2 = useRef(null)

  const reg = new RegExp("([^a-zA-Z#@])", "g")
  let data = " "

  useEffect(() => {
    const setAnimationDuration = () => {
      const k = 27 / 4
      const duration = title.length * k

      tickerRef.current.style.animationDuration = `${duration}s`
      tickerRef2.current.style.animationDuration = `${duration}s`
    }
    setAnimationDuration()
  })

  if (title) {
    const titleTicker = title.replace(reg, " ")

    for (let i = 0; i < 50; i++) {
      data += ` ${titleTicker} `
    }
  }

  const goBack = () => {
    if (window.location.pathname === title) return
    window.location = title
  }

  if (title === "MENU") {
    return (
      <div
        className="ticker__menu ticker flex width-100"
        style={{ fontWeight: 700 }}
      >
        <div id="tickerwrap">
          <div id="ticker" ref={tickerRef}>
            {data}
          </div>
          <div id="ticker2" ref={tickerRef2}>
            {data}
          </div>
        </div>
      </div>
    )
  } else if (fixed) {
    return (
      <div
        onClick={() => goBack()}
        className="ticker__page--fixed ticker flex"
        style={{
          fontWeight: 700,
          position: "fixed",
          maxWidth: 1366,
          cursor: "pointer",
        }}
      >
        <div id="tickerwrap">
          <div id="tickerReverse" style={{ marginRight: 5 }} ref={tickerRef}>
            {data}
          </div>
          <div id="ticker2Reverse" ref={tickerRef2}>
            {data}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div
        className="ticker__page ticker flex width-100"
        style={{ fontWeight: 700, maxWidth: 1366 }}
      >
        <div id="tickerwrap">
          <div
            id={left ? "ticker" : "tickerReverse"}
            ref={tickerRef}
            style={{ marginRight: 5 }}
          >
            {data}
          </div>
          <div id={left ? "ticker" : "tickerReverse"} ref={tickerRef2}>
            {data}
          </div>
        </div>
      </div>
    )
  }
}

export default TickerText

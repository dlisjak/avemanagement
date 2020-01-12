import React, { useEffect, useRef } from "react"

const TickerText = ({
  title,
  fixed = false,
  left = false,
  noRepeat = false,
  width,
}) => {
  const tickerRef = useRef(null)
  const tickerRef2 = useRef(null)

  const reg = !noRepeat
    ? new RegExp("([^a-zA-Z#@])", "g")
    : new RegExp("([^a-zA-Z#@+1234567890])", "g")
  let data = " "
  let titleTicker = title.replace(reg, " ")

  if (titleTicker === " special") {
    titleTicker = " special arrangement "
  }

  useEffect(() => {
    const setAnimationDuration = () => {
      const k = 27 / 4
      const duration = titleTicker.length * k

      tickerRef.current.style.animationDuration = `${duration}s`
      tickerRef2.current.style.animationDuration = `${duration}s`
    }
    setAnimationDuration()
  })

  if (title) {
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
        style={{ fontWeight: 700, marginTop: 5 }}
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
  } else if (noRepeat) {
    return (
      <div
        className="ticker__page ticker flex width-100"
        style={{ fontWeight: 400, maxWidth: 1366, width }}
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

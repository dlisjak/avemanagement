import React, { useEffect, useRef } from "react"

const TickerText = ({ title, left = false, noRepeat = false, width }) => {
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
      const duration = Math.ceil(titleTicker.length)

      if (tickerRef.current) {
        tickerRef.current.style.animationDuration = `${duration}s`
      }
      if (tickerRef2.current) {
        tickerRef2.current.style.animationDuration = `${duration}s`
      }
    }
    setAnimationDuration()
  })

  if (titleTicker) {
    let n
    if (typeof window !== "undefined") {
      n = window.innerWidth < 480 ? 17 : 50
    }

    for (let i = 0; i < n; i++) {
      data += ` ${titleTicker} `
    }
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
        </div>
      </div>
    )
  } else {
    return (
      <div
        className="ticker__page ticker flex width-100"
        style={{ fontWeight: 700, maxWidth: 1366 }}
      >
        <div
          id="tickerwrap"
          style={{ paddingRight: left && "100%", paddingLeft: !left && "100%" }}
        >
          {left && (
            <div id="ticker" ref={tickerRef} style={{ marginRight: 5 }}>
              {data}
            </div>
          )}
          {!left && (
            <div id="tickerReverse" ref={tickerRef2}>
              {data}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default TickerText

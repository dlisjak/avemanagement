import React, { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

const TickerText = ({ title, left = false, noRepeat = false, search }) => {
  const tickerRef = useRef(null)

  const reg = !noRepeat
    ? new RegExp("([^a-zA-Z#@])", "g")
    : new RegExp("([^a-zA-Z#@+1234567890])", "g")
  let data = " "
  let titleTicker = title.replace(reg, " ")

  if (titleTicker === " special") {
    titleTicker = " special arrangement "
  }

  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480 ? true : false
  }

  if (titleTicker) {
    for (let i = 0; i < 55; i++) {
      data += ` ${titleTicker} `
    }
  }

  if (title === "MENU") {
    return (
      <div
        className="ticker__menu ticker flex width-100"
        style={{
          position: "relative",
          fontWeight: 700,
          top: isMobile && 5,
          background: isMobile && "white",
        }}
      >
        <div id="tickerwrap">
          <div
            id="ticker"
            style={{
              position: "relative",
              top: 5,
            }}
            ref={tickerRef}
          >
            {data}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div
        className="ticker__page ticker flex width-100"
        style={{
          fontWeight: 700,
          maxWidth: 1440,
          position: "relative",
          fontWeight: 700,
          top: search && !isMobile ? -3 : 5,
          top: isMobile && !search && 6,
          background: "transparent",
        }}
      >
        <div
          id="tickerwrap"
          style={{
            paddingRight: left && "100%",
            paddingLeft: !left && "100%",
          }}
        >
          {left && (
            <div id="ticker" ref={tickerRef} style={{ marginRight: 5 }}>
              {data}
            </div>
          )}
          {!left && (
            <div id="tickerReverse" ref={tickerRef}>
              {data}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default TickerText

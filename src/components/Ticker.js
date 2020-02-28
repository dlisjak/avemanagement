import React, { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

const TickerText = ({ title, left = false, noRepeat = false, search }) => {
  const tickerRef = useRef(null)
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 1,
  })

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

  useEffect(() => {
    const setAnimationDuration = () => {
      const k = 27 / 4
      const v = 50 / 17

      const duration = isMobile
        ? Math.ceil((titleTicker.length * k) / v)
        : Math.ceil(titleTicker.length * k)

      if (tickerRef.current) {
        tickerRef.current.style.animationDuration = `${duration}s`
      }
    }
    setAnimationDuration()
  })

  if (titleTicker) {
    let n
    if (typeof window !== "undefined") {
      n = window.innerWidth < 480 ? 17 : 55
    }

    for (let i = 0; i < n; i++) {
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
          top: isMobile && 4,
          background: isMobile && "white",
        }}
        ref={ref}
      >
        <div id="tickerwrap">
          {inView && (
            <div
              id="ticker"
              style={{ position: "relative", top: 5 }}
              ref={tickerRef}
            >
              {data}
            </div>
          )}
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
          top: search ? -3 : 5,
          background: "transparent",
        }}
        ref={ref}
      >
        {inView && (
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
        )}
      </div>
    )
  }
}

export default TickerText

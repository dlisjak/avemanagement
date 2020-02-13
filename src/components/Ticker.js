import React, { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

const TickerText = ({ title, left = false, noRepeat = false, width }) => {
  const tickerRef = useRef(null)
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0,
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
        style={{ fontWeight: 700, marginTop: 5 }}
        ref={ref}
      >
        <div
          id="tickerwrap"
          style={{ top: isMobile ? 8 : 4, position: "relative" }}
        >
          {inView && (
            <div id="ticker" ref={tickerRef}>
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
        style={{ fontWeight: 700, maxWidth: 1440, height: isMobile && 25 }}
        ref={ref}
      >
        {inView && (
          <div
            id="tickerwrap"
            style={{
              paddingRight: left && "100%",
              paddingLeft: !left && "100%",
              top: isMobile ? 8 : 4,
              position: "relative",
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

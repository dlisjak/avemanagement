import React, { useEffect, useRef } from "react"

const TickerText = ({ title, left = false, noRepeat = false, search }) => {
  const tickerRef = useRef(null)
  const reg = !noRepeat
    ? new RegExp("([^a-zA-Z#@])", "g")
    : new RegExp("([^a-zA-Z#@+1234567890])", "g")
  let data = " "
  let titleTicker = title.replace(reg, " ")

  if (titleTicker.includes("special")) {
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
      data += `<span class="tickerText block">${titleTicker}</span>`
    }
  }

  let top = 3
  if (search) top = -3

  if (title === "MENU") {
    return (
      <div className="ticker__menu relative ticker flex width-100">
        <div id="tickerwrap">
          <div
            className="flex ticker__menu--container relative"
            id="ticker"
            ref={tickerRef}
            dangerouslySetInnerHTML={{
              __html: data,
            }}
          />
        </div>
      </div>
    )
  } else {
    return (
      <div className="ticker__page ticker flex width-100" style={{ top: top }}>
        <div id="tickerwrap">
          {left && (
            <div
              id="ticker"
              className="inside--ticker flex"
              ref={tickerRef}
              dangerouslySetInnerHTML={{
                __html: data,
              }}
            ></div>
          )}
          {!left && (
            <div
              className="flex"
              id="tickerReverse"
              dangerouslySetInnerHTML={{
                __html: data,
              }}
              ref={tickerRef}
            ></div>
          )}
        </div>
      </div>
    )
  }
}

export default TickerText

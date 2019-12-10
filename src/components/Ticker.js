import React from "react"

const TickerText = ({ title, fixed = false }) => {
  const reg = new RegExp("([^a-zA-Z])", "g")
  let data = " "

  if (title) {
    title = title.replace(reg, " ")

    for (let i = 0; i < 50; i++) {
      data += ` ${title} `
    }
  }

  if (title === "MENU") {
    return (
      <div
        className="ticker__menu ticker flex width-100"
        style={{ fontWeight: 700 }}
      >
        <div id="tickerwrap">
          <div id="ticker">{data}</div>
          <div id="ticker2">{data}</div>
        </div>
      </div>
    )
  } else if (fixed) {
    return (
      <div
        onClick={() => window.history.back()}
        className="ticker__page--fixed ticker flex"
        style={{ fontWeight: 700, position: "fixed", maxWidth: 1366 }}
      >
        <div id="tickerwrap">
          <div id="tickerReverse" style={{ marginRight: 5 }}>
            {data}
          </div>
          <div id="ticker2Reverse">{data}</div>
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
          <div id="tickerReverse" style={{ marginRight: 5 }}>
            {data}
          </div>
          <div id="ticker2Reverse">{data}</div>
        </div>
      </div>
    )
  }
}

export default TickerText

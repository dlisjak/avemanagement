import React from "react"

const TickerText = ({ title, toggleMenu }) => {
  let data = " "

  for (let i = 0; i < 50; i++) {
    data += ` ${title} `
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
  } else {
    return (
      <div
        className="ticker__page ticker flex width-100"
        style={{ fontWeight: 700 }}
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

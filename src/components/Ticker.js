import React from "react"

const TickerText = ({ title }) => {
  let data = ""

  for (let i = 0; i < 50; i++) {
    data += `${title} `
  }

  return (
    <div className="ticker flex width-100">
      <div id="tickerwrap">
        <div id="ticker">{data}</div>
        <div id="ticker2">{data}</div>
      </div>
    </div>
  )
}

export default TickerText

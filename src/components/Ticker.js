import React from "react"
import Ticker from "react-ticker"

const TickerText = ({ title }) => {
  let data = title
  for (let i = 0; i < 21; i++) {
    data += ` ${title} `
  }

  return (
    <div className="width-100">
      <Ticker speed={12} direction="toRight">
        {({ index }) => <span key={index}>{data}</span>}
      </Ticker>
    </div>
  )
}

export default TickerText

import React from "react"
import Ticker from "react-ticker"

const TickerText = ({ title }) => {
  const data = ` ${title} `
  return (
    <div className="width-100">
      <Ticker speed={5} direction="toRight">
        {({ index }) => <span key={index}>{data}</span>}
      </Ticker>
    </div>
  )
}

export default TickerText

import React from "react"

import Slider from "./Slider"
import TickerText from "./Ticker"

const Instagram = () => {
  return (
    <>
      <TickerText title="INSTAGRAM" left={true} />
      <TickerText title="@AVEMANAGEMENT" />
      <TickerText title="#AVEGIRLS #AVEBOYS" left={true} />
    </>
  )
}

export default Instagram

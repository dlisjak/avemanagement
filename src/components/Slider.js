import React from "react"
import Swiper from "react-id-swiper"

import "./swiper.css"

const Slider = props => {
  const { children } = props

  const params = {
    slidesPerView: 4,
    spaceBetween: 5,
  }

  return (
    <Swiper loop key={1} {...params} style={{ cursor: "grab" }}>
      {children}
    </Swiper>
  )
}

export default Slider

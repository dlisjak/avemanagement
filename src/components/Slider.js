import React from "react"
import Swiper from "react-id-swiper"

import "./swiper.css"

const Slider = props => {
  const { children } = props
  let params = {
    slidesPerView: 5,
    spaceBetween: 5,
  }

  if (typeof window !== "undefined") {
    if (window.innerWidth < 950) {
      params = {
        slidesPerView: 3,
        spaceBetween: 5,
      }
    } else if (window.innerWidth < 1150) {
      params = {
        slidesPerView: 4,
        spaceBetween: 5,
      }
    } else {
      params = {
        slidesPerView: 5,
        spaceBetween: 5,
      }
    }
  }

  return (
    <Swiper loop key={1} {...params} style={{ cursor: "grab" }}>
      {children}
    </Swiper>
  )
}

export default Slider

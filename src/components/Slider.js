import React from "react"
import Swiper from "react-id-swiper"

import "./swiper.css"

const Slider = props => {
  const { children } = props
  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }
  let params = {
    autoplay: {
      delay: 3000,
    },
    autoHeight: true,
    spaceBetween: 5,
    slidesPerView: "auto",
    centeredSlides: true,
  }

  return (
    <Swiper key={1} {...params} style={{ cursor: "grab" }}>
      {children}
    </Swiper>
  )
}

export default Slider

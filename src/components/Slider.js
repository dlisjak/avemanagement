import React from "react"
import Swiper from "react-id-swiper"

import "./swiper.css"

const Slider = props => {
  const { children } = props
  const windowWidth = window.innerWidth <= 480 ? true : false
  let params = {
    autoplay: {
      delay: 1500,
    },
    spaceBetween: 5,
    autoHeight: windowWidth,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
      },
      960: {
        slidesPerView: 4,
      },
      1080: {
        slidesPerView: 5,
      },
    },
  }

  return (
    <Swiper loop key={1} {...params} style={{ cursor: "grab" }}>
      {children}
    </Swiper>
  )
}

export default Slider

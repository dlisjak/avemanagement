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
    spaceBetween: 5,
    slidesPerView: "auto",
    centeredSlides: true,
    // preloadImages: false,
    // breakpoints: {
    //   // when window width is >= 480px
    //   480: {
    //     slidesPerView: 2,
    //   },
    //   640: {
    //     slidesPerView: 2,
    //   },
    //   960: {
    //     slidesPerView: 3,
    //   },
    //   1080: {
    //     slidesPerView: "auto",
    //   },
    // },
  }

  return (
    <Swiper key={1} {...params} style={{ cursor: "grab" }}>
      {children}
    </Swiper>
  )
}

export default Slider

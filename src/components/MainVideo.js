import React from "react"
import Video1 from "../videos/main-video-1.mp4"

const MainVideo = () => (
  <video
    id="home-video-0"
    src={Video1}
    muted
    autoPlay
    playsInline
    controlsList="nodownload"
    className="home-video width-100"
    style={{
      paddingBottom: 5,
    }}
  ></video>
)

export default MainVideo

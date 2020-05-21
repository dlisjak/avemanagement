import React, { useState } from "react"
import VideoPlayButton from "./VideoPlayButton"

const ModelVideo = ({ videoUrl, showVideoEnd = true }) => {
  const [videoEnd, setVideoEnded] = useState(showVideoEnd ? true : false)

  const startVideoPlaying = () => {
    if (!videoEnd) return
    const video = document.querySelector("video")
    setVideoEnded(false)
    video.play()
  }

  return (
    <div
      id="youtubeVideo"
      className="flex align-center justify-center relative"
    >
      <video
        src={videoUrl}
        muted
        playsInline
        onEnded={() => setVideoEnded(true)}
        className="width-100 video--newwsss"
      ></video>
      {videoEnd && <VideoPlayButton onClick={startVideoPlaying} />}
    </div>
  )
}

export default ModelVideo

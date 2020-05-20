import React, { useState } from "react"

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
      {videoEnd && showVideoEnd && (
        <div
          className="video-end flex align-center justify-center absolute"
          onClick={() => startVideoPlaying()}
        >
          <div className="absolute video-end--playicon" />
          <div className="absolute video-end--playicon -rotate" />
          <div className="absolute video-end--playicon -rotate-full" />
        </div>
      )}
    </div>
  )
}

export default ModelVideo

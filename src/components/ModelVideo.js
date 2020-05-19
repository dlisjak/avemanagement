import React, { useState } from "react"

const ModelVideo = ({ videoUrl }) => {
  const [videoEnd, setVideoEnded] = useState(false)

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
        autoPlay
        playsInline
        onEnded={() => setVideoEnded(true)}
        className="width-100 video--newwsss"
      ></video>
      {videoEnd && (
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

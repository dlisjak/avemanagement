import React from "react"

const VideoPlayButton = ({ onClick }) => {
  return (
    <div
      className="video-end flex align-center justify-center absolute"
      onClick={() => onClick()}
    >
      <div className="absolute video-end--playicon" />
      <div className="absolute video-end--playicon -rotate" />
      <div className="absolute video-end--playicon -rotate-full" />
    </div>
  )
}

export default VideoPlayButton

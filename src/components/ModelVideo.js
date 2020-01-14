import React from "react"

const ModelVideo = ({ videoUrl }) => {
  return (
    <div id="youtubeVideo" style={{ width: "100%", height: "100%" }}>
      <video
        src={videoUrl}
        autoPlay
        muted
        className="home-video width-100"
        style={{ paddingBottom: 5 }}
      ></video>
    </div>
  )
}

export default ModelVideo

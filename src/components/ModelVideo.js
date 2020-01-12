import React from "react"
import YouTube from "react-youtube"

const ModelVideo = ({ videoId }) => {
  const youtubeOptions = {
    controls: 0,
    disablekb: 1,
    modestbranding: 1,
    fs: 0,
    iv_load_policy: 3,
    playsinline: 1,
    rel: 0,
    showinfo: 0,
  }

  return (
    <div id="youtubeVideo" style={{ width: "100%", height: "100%" }}>
      <YouTube videoId={videoId} title={videoId} opts={youtubeOptions} />
    </div>
  )
}

export default ModelVideo

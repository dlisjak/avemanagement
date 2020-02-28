import React, { useState } from "react"

const ModelVideo = ({ videoUrl }) => {
  const [videoEnd, setVideoEnded] = useState(false)

  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  const startVideoPlaying = () => {
    if (!videoEnd) return

    const video = document.querySelector("video")

    setVideoEnded(false)
    video.play()
  }

  return (
    <div
      id="youtubeVideo"
      style={{
        width: isMobile ? "95vw" : "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px auto",
      }}
    >
      <video
        src={videoUrl}
        autoPlay
        muted
        onEnded={() => setVideoEnded(true)}
        className="home-video width-100"
        style={{ paddingBottom: 5 }}
      ></video>
      {videoEnd && (
        <div
          onClick={() => startVideoPlaying()}
          style={{
            position: "absolute",
            padding: "10%",
            border: "1px solid white",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              borderLeft: "1px solid white",
              width: "29%",
              height: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              borderLeft: "1px solid white",
              width: "29%",
              height: "50%",
              transform: "rotate(120deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              borderLeft: "1px solid white",
              width: "30%",
              height: "50%",
              transform: "rotate(-120deg)",
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ModelVideo

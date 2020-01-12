import React from "react"

const ModelPreviewVideos = ({ videoUrl }) => {
  return (
    <div
      style={{
        width: "25%",
        height: "auto",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <img
        src={`https://img.youtube.com/vi/${videoUrl.split(".be/")[1]}/0.jpg`}
      />
      <div
        style={{
          position: "absolute",
          padding: "20%",
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
    </div>
  )
}

export default ModelPreviewVideos

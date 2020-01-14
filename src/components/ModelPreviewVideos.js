import React from "react"

const ModelPreviewVideos = ({ thumbnail }) => {
  return (
    <div
      className="category-card"
      style={{
        height: 250,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        overflow: "hidden",
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
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

import React from "react"

const NewsPreviewVideos = ({ thumbnail }) => {
  return (
    <div
      style={{
        height: "100%",
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
          width: "20%",
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

export default NewsPreviewVideos

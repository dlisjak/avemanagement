import React from "react"

const ModelPreviewVideos = ({ thumbnail, onClick }) => {
  return (
    <div
      className="category-card grid-item"
      onClick={onClick}
      style={{
        height: 200,
        cursor: "pointer",
        background: "#ccc",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundImage: `url(${thumbnail})`,
          backgroundSize: "contain",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
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
    </div>
  )
}

export default ModelPreviewVideos

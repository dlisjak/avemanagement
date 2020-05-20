import React from "react"

const NewsPreviewVideos = ({ thumbnail }) => (
  <div
    className="relative flex justify-center align-center news-preview-videos"
    style={{
      backgroundImage: `url(${thumbnail})`,
    }}
  >
    <div className="absolute flex justify-center align-center news-preview-videos-inside">
      <div className="absolute news-preview-videos-inside--two" />
      <div className="absolute news-preview-videos-inside--three" />
      <div className="absolute news-preview-videos-inside--four" />
    </div>
  </div>
)

export default NewsPreviewVideos

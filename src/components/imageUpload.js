import React, { useState, useContext } from "react"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const ImageUpload = ({ title, order, isMobile, text }) => {
  const [file, setFile] = useState("")
  const dispatch = useContext(GlobalDispatchContext)

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]))
    dispatch({ type: title, payload: e.target.files[0] })
  }

  return (
    <div
      className="flex flex-column justify-center align-center contact-image-upload relative"
      style={{
        width: !isMobile ? `calc(25% - 8px)` : `calc(50% - 7.5px)`,
        height: !isMobile ? 350 : 250,
      }}
    >
      <div
        className="flex flex-column align-center"
        style={{ cursor: "pointer" }}
      >
        <span style={{ fontWeight: 700 }}>{text}</span>
        <span style={{ cursor: "pointer" }}>CLICK TO UPLOAD</span>
      </div>
      <input
        className="flex flex-wrap absolute"
        type="file"
        onChange={e => handleChange(e)}
        style={{ width: "100%", border: 0, opacity: 0 }}
      />
      <img
        className="contact-image-upload--image"
        alt={`Your ${title}`}
        src={file}
        style={{ zIndex: 99 }}
      />
    </div>
  )
}

export default ImageUpload

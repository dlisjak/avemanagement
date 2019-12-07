import React, { useState, useContext } from "react"

const ImageUpload = ({ title, order, text }) => {
  const [file, setFile] = useState("")

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  const removeImage = () => {
    setFile(null)
  }

  return (
    <>
      <div
        className="flex flex-column justify-center align-center contact-image-upload relative"
        style={{
          marginBottom: file ? 25 : 5,
        }}
      >
        <div
          className="flex flex-column align-center absolute"
          style={{ cursor: "pointer" }}
        >
          <span style={{}}>{text}</span>
          <span style={{ cursor: "pointer", fontWeight: 700 }}>
            CLICK TO UPLOAD
          </span>
        </div>
        <input
          className="flex flex-wrap absolute"
          type="file"
          onChange={e => handleChange(e)}
          style={{ width: "100%", border: 0, opacity: 0 }}
        />
        {file && (
          <img
            className="contact-image-upload--image"
            src={file}
            alt={`Your ${title}`}
            transitionTime={0.5}
            containerStyles={{ paddingBottom: "130%" }}
            style={{ zIndex: 99 }}
          />
        )}
        {file && (
          <button
            className="absolute"
            style={{
              margin: 10,
              border: 0,
              background: 0,
              textTransform: "uppercase",
              bottom: -30,
              fontSize: 13,
            }}
            onClick={() => removeImage()}
          >
            Remove image
          </button>
        )}
      </div>
    </>
  )
}

export default ImageUpload

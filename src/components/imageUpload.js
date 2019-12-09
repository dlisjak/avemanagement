import React, { useState, useRef, useEffect } from "react"

const ImageUpload = ({ title, order, text }) => {
  const [file, setFile] = useState("")
  const inputField = useRef(null)

  useEffect(() => {}, [])

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  const removeImage = () => {
    setFile(null)
  }

  const fireImageSearch = e => {
    e.preventDefault()
    e.stopPropagation()
    console.log(inputField)
    inputField.current.click()
  }

  return (
    <>
      <div
        className="flex flex-column justify-center align-center contact-image-upload relative"
        style={{
          marginBottom: file ? 25 : 10,
        }}
      >
        <div
          className="flex flex-column align-center absolute"
          style={{ cursor: "pointer" }}
        >
          <span style={{}}>{text}</span>
          <span
            className="contact-image-upload--span"
            style={{ cursor: "pointer", fontWeight: 700 }}
            onClick={e => fireImageSearch(e)}
          >
            CLICK TO UPLOAD
          </span>
        </div>
        <input
          ref={inputField}
          className="flex flex-wrap absolute contact-image-upload--input"
          type="file"
          onChange={e => handleChange(e)}
          style={{
            width: "100%",
            border: 0,
            opacity: 0,
            pointerEvents: "none",
          }}
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
            className="absolute contact-button-submit"
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

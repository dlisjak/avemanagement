import React, { useState, useRef, useEffect, Fragment } from "react"
import fullLength from "../images/fullLength.png"
import headShot from "../images/headShot.png"
import midLength from "../images/midLength.png"
import profile from "../images/profile.png"

const ImageUpload = ({ title, order, text }) => {
  const [file, setFile] = useState("")
  const [placeholderImage, setPlaceholderImage] = useState("")
  const inputField = useRef(null)

  const placeholderImages = [headShot, profile, midLength, fullLength]

  useEffect(() => {
    const setPlaceholderImages = () => {
      setPlaceholderImage(placeholderImages[order])
    }
    setPlaceholderImages()
  })

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  const removeImage = () => {
    setFile(null)
  }

  const fireImageSearch = e => {
    e.preventDefault()
    e.stopPropagation()
    inputField.current.click()
  }

  return (
    <>
      <div
        className="flex flex-column justify-center align-center contact-image-upload relative"
        style={{
          marginBottom: file ? 25 : 10,
          backgroundImage: title,
          objectFit: "contain",
          overflow: "hidden",
        }}
      >
        {!file && (
          <Fragment>
            <div
              className="flex flex-column align-center absolute"
              style={{
                cursor: "pointer",
                fontSize: 22,
                height: 100,
                justifyContent: "space-evenly",
              }}
            >
              <span style={{ color: "white" }}>{text}</span>
              <span
                className="contact-image-upload--span"
                style={{
                  cursor: "pointer",
                  fontWeight: 700,
                  textAlign: "center",
                }}
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
          </Fragment>
        )}
        {file && (
          <img
            className="contact-image-upload--image"
            src={file}
            alt={`Your ${title}`}
            style={{ zIndex: 99 }}
          />
        )}
        {placeholderImage && !file && (
          <img
            className="contact-image-upload--image width-100"
            src={placeholderImage}
            alt={`Your ${title}`}
            style={{ objectFit: "cover" }}
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
              bottom: -10,
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

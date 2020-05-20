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
  }, [])

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
          marginBottom: file ? 25 : 2.5,
          backgroundImage: title,
        }}
      >
        {!file && (
          <Fragment>
            <div className="flex flex-column align-center absolute file-fragment">
              <span className="color-white">{text}</span>
              <button
                className="contact-image-upload--span"
                onClick={e => fireImageSearch(e)}
              >
                CLICK TO UPLOAD
              </button>
            </div>
            <input
              ref={inputField}
              className="flex flex-wrap absolute contact-image-upload--input"
              type="file"
              onChange={e => handleChange(e)}
            />
          </Fragment>
        )}
        {file && (
          <img
            className="contact-image-upload--image z-99"
            src={file}
            alt={`Your ${title}`}
          />
        )}
        {placeholderImage && !file && (
          <img
            className="contact-image-upload--image width-100 contain"
            src={placeholderImage}
            alt={`Your ${title}`}
          />
        )}
        {file && (
          <button
            className="absolute contact-button-submit"
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

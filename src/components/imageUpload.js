import React, { useState } from "react"

const ImageUpload = (title, order) => {
  const [file, setFile] = useState({ file: null })

  const handleChange = e => {
    setFile({ file: URL.createObjectURL(e.target.files[0]) })
  }

  return (
    <div
      className="flex flex-column justify-center align-center contact-image-upload relative"
      style={{ width: `calc(25% - 8px)`, height: 350 }}
    >
      <input
        className="flex flex-wrap absolute"
        type="file"
        onChange={e => handleChange(e)}
        style={{ width: "100%" }}
      />
      <img
        className="contact-image-upload--image"
        src={file.file}
        style={{ zIndex: 99 }}
      />
    </div>
  )
}

export default ImageUpload

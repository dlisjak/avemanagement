import React, { useState, useContext } from "react"
import { GlobalDispatchContext, GlobalStateContext } from "../context/GlobalContextProvider";

const ImageUpload = ({title, order, isMobile}) => {
  const [file, setFile] = useState("")
  const dispatch = useContext(GlobalDispatchContext)

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]))
    dispatch({ type: title, payload: e.target.files[0] })
  }

  return (
    <div
      className="flex flex-column justify-center align-center contact-image-upload relative"
      style={{ width: !isMobile ? `calc(25% - 8px)` : `calc(50% - 7.5px)`, height: !isMobile ? 350 : 250 }}
    >
      <input
        className="flex flex-wrap absolute"
        type="file"
        onChange={e => handleChange(e)}
        style={{ width: "100%", border: 0 }}
      />
      <img
        className="contact-image-upload--image"
        src={file}
        style={{ zIndex: 99 }}
      />
    </div>
  )
}

export default ImageUpload

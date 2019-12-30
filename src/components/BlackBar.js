import React from "react"

const BlackBar = ({ height }) => {
  console.log(height)

  return (
    <div
      style={{
        height: height,
        width: "100%",
        background: "black",
      }}
    />
  )
}

export default BlackBar

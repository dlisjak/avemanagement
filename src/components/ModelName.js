import React from "react"

const ModelName = ({ firstName, lastName }) => {
  return (
    <h2
      className="flex model__name flex-column content-padding relative"
      style={{ marginBottom: 5 }}
    >
      <span>{firstName}</span>
      <span>{lastName}</span>
    </h2>
  )
}

export default ModelName
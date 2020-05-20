import React from "react"

const ModelName = ({ firstName, lastName }) => (
  <h2 className="flex model__name flex-column content-padding relative">
    <span>{firstName}</span>
    <span>{lastName}</span>
  </h2>
)

export default ModelName

import React from "react"

const GetToTop = () => {
  return (
    <div className="flex justify-end width-100">
      <i className="up-arrow" onClick={() => window.scrollTo(0, 0)} />
    </div>
  )
}

export default GetToTop

import React from "react"
import { Link } from "gatsby"

const Pagination = ({ currentPage, numOfPages }) => {
  const canGoNext = numOfPages >= currentPage + 1
  const canGoPrev = currentPage - 1 > 0

  return (
    <div className="flex align-center pagination">
      *
      <Link
        className="pagination-item first"
        to={`/news/${currentPage + 1}`}
        style={{
          color: "rgb(204, 204, 204)",
          pointerEvents: !canGoNext && "none",
        }}
      >
        next
      </Link>
      /
      <Link
        className="pagination-item first"
        to={`/news/${currentPage - 1}`}
        style={{
          pointerEvents: !canGoPrev && "none",
        }}
      >
        back
      </Link>
    </div>
  )
}

export default Pagination

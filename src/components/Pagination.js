import React from "react"
import { Link } from "gatsby"

const Pagination = ({ currentPage, numOfPages }) => {
  console.log(numOfPages - 3)
  console.log(currentPage)

  return (
    <div
      className="flex align-center"
      style={{
        position: "relative",
        height: 25,
        justifyContent: "flex-end",
        width: "100%",
        paddingRight: 0,
      }}
    >
      {currentPage !== 1 && currentPage > 3 && (
        <Link className="pagination-item first" to={`/news/1`}>
          1
        </Link>
      )}
      {currentPage !== 1 && (
        <Link className="pagination-item prev" to={`/news/${currentPage - 1}`}>
          {currentPage - 1}
        </Link>
      )}
      <div className="pagination-item current">
        <b>{currentPage}</b>
      </div>
      {currentPage >= numOfPages ? null : (
        <Link className="pagination-item next" to={`/news/${currentPage + 1}`}>
          {currentPage + 1}
        </Link>
      )}
      {currentPage > numOfPages - 2 ? null : (
        <Link
          className="pagination-item second-next"
          to={`/news/${currentPage + 2}`}
        >
          {currentPage + 2}
        </Link>
      )}
      {currentPage > numOfPages - 3 ? null : (
        <Link
          className="pagination-item third-next"
          to={`/news/${currentPage + 3}`}
        >
          {currentPage + 3}
        </Link>
      )}
      {currentPage !== numOfPages && currentPage < numOfPages - 3 && (
        <Link className="pagination-item last" to={`/news/${numOfPages}`}>
          >
        </Link>
      )}
    </div>
  )
}

export default Pagination

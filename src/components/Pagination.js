import React from "react"
import { Link } from "gatsby"

const Pagination = ({ currentPage, numOfPages, isMobile }) => (
  <div className="flex align-center pagination" style={{}}>
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
    {currentPage > numOfPages - 4 ? null : (
      <Link
        className="pagination-item fourth-next"
        to={`/news/${currentPage + 4}`}
      >
        {currentPage + 4}
      </Link>
    )}
    {currentPage !== numOfPages && currentPage < numOfPages - 3 && (
      <Link className="pagination-item last" to={`/news/${numOfPages}`}>
        >
      </Link>
    )}
  </div>
)

export default Pagination

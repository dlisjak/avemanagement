import React from "react"
import { Link } from "gatsby"

const AddressTicker = () => {
  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  return (
    <Link
      to="/contact"
      className="news-ticker-address"
      style={{
        width: "100%",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        color: "rgba(0, 0, 0)",
        fontSize: isMobile ? 11 : 17,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textDecoration: "none",
        textTransform: "none",
        textAlign: "center",
      }}
    >
      <span>70 SHENTON WAY EON SHENTON #13-06 SINGAPORE 079118</span>
      <span>INFO@AVEMANAGEMENT.COM T +65 68874629</span>
    </Link>
  )
}

export default AddressTicker

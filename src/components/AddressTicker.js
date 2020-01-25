import React from "react"
import { Link } from "gatsby"

const AddressTicker = () => (
  <Link
    to="/contact"
    className="news-ticker-address"
    style={{
      width: "100%",
      borderTop: "1px solid",
      borderBottom: "1px solid",
      color: "rgba(0, 0, 0, 0.2)",
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      textDecoration: "none",
      textTransform: "none",
    }}
  >
    <span>70 SHENTON WAY EON SHENTON #13-06 SINGAPORE 079118</span>
    <span>INFO@AVEMANAGEMENT.COM T +65 68874629</span>
  </Link>
)

export default AddressTicker

import React from "react"

import Ticker from "../components/Ticker"

const AddressTicker = () => (
  <div
    className="news-ticker-address"
    style={{
      width: "100%",
      padding: "5px 25%",
      borderTop: "1px solid",
      borderBottom: "1px solid",
      color: "#ccc",
    }}
  >
    <Ticker
      title="70 SHENTON WAY EON SHENTON #13-06 SINGAPORE 079118"
      left={true}
      noRepeat={true}
    />
    <Ticker title="INFO@AVEMANAGEMENT.COM  T +65 68874629" noRepeat={true} />
  </div>
)

export default AddressTicker

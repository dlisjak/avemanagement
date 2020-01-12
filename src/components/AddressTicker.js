import React from "react"

import Ticker from "../components/Ticker"

const AddressTicker = () => (
  <div
    className="news-ticker-address"
    style={{
      width: "100%",
      borderTop: "1px solid",
      borderBottom: "1px solid",
      color: "#ccc",
      marginTop: 50,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <Ticker
      title="70 SHENTON WAY EON SHENTON #13-06 SINGAPORE 079118"
      left={true}
      noRepeat={true}
    />
    <Ticker
      title="INFO@AVEMANAGEMENT.COM  T +65 68874629"
      width={"75%"}
      noRepeat={true}
    />
  </div>
)

export default AddressTicker

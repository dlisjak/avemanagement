import React from "react"
import Layout from "../components/layout"

const contact = () => {
  return (
    <Layout>
      <div className="flex flex-column align-center">
        <h1>Ave Management</h1>
        <span>70 SHENTON WAY, #13-06 EON SHENTON SINGAPORE 079118</span>

        <div className="flex flex-column align-center">
          <span>T +65 68874629</span>
          <span>T +65 68874629</span>

          <a href="mailto:info@avemanagement.com">info@avemanagement.com</a>
        </div>
      </div>
    </Layout>
  )
}

export default contact

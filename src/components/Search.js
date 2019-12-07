import React, { useState } from "react"
import Layout from "./layout"
import { Link } from "gatsby"

import TickerText from "./Ticker"

const Search = props => {
  console.log(props)
  const data = []
  const [genderQuery, setGender] = useState(null)

  const setSearchGender = (e, gender) => {
    setGender(gender)
  }

  return (
    <Layout>
      <TickerText title="SEARCH" />
      <div
        className="flex flex-column search-queries"
        style={{ paddingTop: 50, paddingBottom: 25, borderBottom: "1px solid" }}
      >
        <button
          onClick={e => setSearchGender(e, null)}
          style={{ fontWeight: !genderQuery ? 700 : 400 }}
        >
          ALL
        </button>
        <button
          onClick={e => setSearchGender(e, "male")}
          style={{ fontWeight: genderQuery === "male" ? 700 : 400 }}
        >
          MEN
        </button>
        <button
          onClick={e => setSearchGender(e, "female")}
          style={{ fontWeight: genderQuery === "female" ? 700 : 400 }}
        >
          WOMEN
        </button>
      </div>
      <div
        className="flex flex-column search-queries"
        style={{ paddingTop: 50, paddingBottom: 25 }}
      >
        {data.allModel.edges.map(({ node }, index, arr) => {
          if (index === 0 || node.title[0] !== arr[index - 1].node.title[0]) {
            return (
              <span
                style={{ marginTop: 20, marginBottom: 5, fontWeight: 700 }}
                key={index}
              >
                {arr[index].node.title[0]}
              </span>
            )
          }
          if (genderQuery) {
            if (genderQuery !== node.acf.gender) return null
          }
          return (
            <Link
              to={`/${node.slug}`}
              style={{
                textDecoration: "none",
                color: "black",
                lineHeight: 1.8,
              }}
              key={index}
            >
              {node.title.toUpperCase()}
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default Search

import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const NewsPage = ({ data }) => {
  const [isLoaded, setLoaded] = useState(false)
  useEffect(() => {
    // componentDidMount
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  }, [])

  console.log(data)

  const news = data.allWordpressWpNews.edges.map(
    ({ node: { title, slug, acf } }, index) => (
      <div
        className="grid-item"
        style={{
          maxHeight: acf.news_post_image.height,
          height: "100%",
        }}
      >
        <Link to={`/${slug}`} key={index}>
          <img src={acf.news_post_image.url} />
        </Link>
      </div>
    )
  )

  return (
    <Layout>
      <h2>News</h2>
      <div className="grid" style={{ display: !isLoaded ? "none" : "block" }}>
        {news}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query AllNews {
    allWordpressWpNews {
      edges {
        node {
          title
          slug
          acf {
            news_post_image {
              url
              title
              height
              width
            }
          }
        }
      }
    }
  }
`
export default NewsPage

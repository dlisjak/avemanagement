import React, { useEffect } from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const NewsPage = ({ data }) => {
  useEffect(() => {
    // componentDidMount
    const fetchData = async () => {}
    fetchData()
  }, [])

  console.log(data)

  return (
    <Layout>
      <h2>News</h2>
      <div className="grid">
        {data.allWordpressWpNews.edges.map(
          ({ node: { title, slug, acf } }, index) => (
            <div className="grid-item">
              <Link to={`/${slug}`} key={index}>
                <img src={acf.news_post_image.url} />
              </Link>
            </div>
          )
        )}
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

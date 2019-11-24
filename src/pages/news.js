import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const NewsPage = ({ data }) => {
  return (
    <Layout>
      <h2>News</h2>
      <div className="flex flex-wrap">
        {data.allWordpressWpNews.edges.map(
          ({ node: { title, slug, acf } }, index) => (
            <Link to={`/${slug}`} key={index}>
              <img src={acf.news_post_image.url} />
            </Link>
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

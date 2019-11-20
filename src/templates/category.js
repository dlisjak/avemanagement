import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"

const Category = props => {
  return (
    <Layout>
      <div className="flex flex-wrap category-cards">
        {props.data.allWordpressPost.edges.map(
          (
            {
              node: {
                path,
                title,
                acf: { featured_image, first_name, last_name },
              },
            },
            index
          ) => (
            <Link
              to={path}
              className="flex flex-column justify-between category-card"
              key={index}
            >
              <img
                className="category-card-image"
                src={featured_image.url}
                alt={featured_image.alt}
                title={featured_image.title}
                style={{ marginBottom: 0 }}
              />
              <h3 className="category-card-title flex flex-wrap width-100">
                <span className="width-100">{first_name}</span>
                <span className="width-100">{last_name}</span>
              </h3>
            </Link>
          )
        )}
      </div>
    </Layout>
  )
}
export const query = graphql`
  query CategoryPage($title: String) {
    allWordpressPost(
      filter: { categories: { elemMatch: { name: { eq: $title } } } }
    ) {
      edges {
        node {
          path
          title
          acf {
            featured_image {
              alt
              title
              url
            }
            first_name
            last_name
          }
        }
      }
    }
  }
`

export default Category

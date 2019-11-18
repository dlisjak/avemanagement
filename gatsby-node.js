const path = require(`path`)
const slash = require(`slash`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // query content for WordPress posts
  const homepage = await graphql(`
    {
      allWordpressPage(filter: { title: { eq: "Home" } }) {
        edges {
          node {
            title
            acf {
              main_video
            }
          }
        }
      }
    }
  `)

  const indexTemplate = path.resolve(`./src/templates/index.js`)
  homepage.data.allWordpressPage.edges.forEach(edge => {
    createPage({
      path: "/",
      component: slash(indexTemplate),
      context: {
        video: edge.node.acf.main_video,
      },
    })
  })

  const categories = await graphql(`
    query {
      allWordpressCategory(filter: { name: { nin: "Uncategorized" } }) {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  `)

  const categoryTemplate = path.resolve(`./src/templates/category.js`)
  categories.data.allWordpressCategory.edges.forEach(edge => {
    createPage({
      // will be the url for the page
      path: edge.node.slug,
      // specify the component template of your choice
      component: slash(categoryTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        title: edge.node.name,
      },
    })
  })
}

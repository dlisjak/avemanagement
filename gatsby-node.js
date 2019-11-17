const path = require(`path`)
const slash = require(`slash`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // query content for WordPress posts
  const result = await graphql(`
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
  result.data.allWordpressCategory.edges.forEach(edge => {
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

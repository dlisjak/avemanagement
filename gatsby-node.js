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

  const womenModels = await graphql(`
    query WomenModels {
      allWordpressPost(filter: { acf: { gender: { eq: "female" } } }) {
        edges {
          node {
            acf {
              last_name
              instagram
              gender
              first_name
              featured_image {
                url
                name
                title
                alt
              }
              bio_waist
              bio_shoes
              bio_hips
              bio_height
              bio_hair
              bio_eyes
              bio_dress
              bio_bust
              polaroids
            }
            title
            slug
          }
        }
      }
    }
  `)
  const modelTemplate = path.resolve(`./src/templates/model.js`)
  womenModels.data.allWordpressPost.edges.forEach(({ node }) => {
    createPage({
      // will be the url for the page
      path: node.slug,
      // specify the component template of your choice
      component: slash(modelTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        name: node.title,
        acf: node.acf,
      },
    })
  })
}

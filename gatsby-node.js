const path = require(`path`)
const slash = require(`slash`)
const axios = require("axios")
const crypto = require("crypto")

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions

  const fetchModels = async () => {
    let response = []
    for (let i = 1; i < 5; i++) {
      const arrayOfModels = await axios.get(
        `http://avemanagement1.eu/wp-json/wp/v2/posts?per_page=100&page=${i}`
      )
      response = [...response, ...arrayOfModels.data]
      if (!arrayOfModels.data) break
    }
    return response
  }

  const data = await fetchModels()

  const res = {
    data,
  }

  res.data.map((user, i) => {
    const userNode = {
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Model`,
      },
      children: [],

      slug: user.slug,
      title: user.title.rendered,
      acf: user.acf,
    }

    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(userNode))
      .digest(`hex`)

    userNode.internal.contentDigest = contentDigest

    createNode(userNode)
  })
  return
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createNode } = actions
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

  const allModels = await graphql(`
    query AllModels {
      allModel {
        edges {
          node {
            slug
            title
            acf {
              last_name
              instagram
              gender
              first_name
              bio_bust
              bio_dress
              bio_eyes
              bio_hair
              bio_height
              bio_hips
              bio_shoes
              bio_waist
              featured_image {
                url
                title
                name
                alt
              }
              portfolio {
                title
                url
                description
                alt
                name
                height
                width
              }
              polaroids {
                url
                title
                name
              }
              videos {
                video_url
              }
              eyes_for_male
              hair_for_male
              height_for_male
              inseam_for_male
              shirt_for_male
              shoes_for_male
              sub_title
              suit_for_male
              waist_for_male
            }
          }
        }
      }
    }
  `)

  const modelTemplate = path.resolve(`./src/templates/model.js`)
  allModels.data.allModel.edges.forEach(({ node }) => {
    createPage({
      // will be the url for the page
      path: node.slug,
      // specify the component template of your choice
      component: slash(modelTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        firstName: node.acf.first_name,
        lastName: node.acf.last_name,
        title: node.title,
        acf: {
          featuredImage: node.acf.featured_image,
          portfolio: node.acf.portfolio,
          videos: node.acf.videos,
          instagram: node.acf.instagram,
          bio: {
            height: node.acf.bio_height || node.acf.height_for_male,
            hair: node.acf.bio_hair || node.acf.hair_for_male,
            eyes: node.acf.bio_eyes || node.acf.eyes_for_male,
            bust: node.acf.bio_bust || null,
            waist: node.acf.bio_waist || node.acf.waist_for_male,
            hips: node.acf.bio_hips || null,
            dress: node.acf.bio_dress || null,
            shoes: node.acf.bio_shoes || node.acf.shoes_for_male,
            suit: node.acf.suit_for_male || null,
            shirt: node.acf.shirt_for_male || null,
            inseam: node.acf.inseam_for_male || null,
          },
        },
      },
    })
  })

  const allNews = await graphql(`
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
                name
              }
            }
            content
          }
        }
      }
    }
  `)

  const newsTemplate = path.resolve(`./src/templates/news.js`)
  allNews.data.allWordpressWpNews.edges.forEach(({ node }, index) => {
    createPage({
      path: `/news/${node.slug}`,
      component: slash(newsTemplate),
      context: {
        title: node.title,
        acf: node.acf,
        content: node.content,
      },
    })
  })

  const allNewsEdges = allNews.data.allWordpressWpNews.edges
  const allNewsTemplate = path.resolve(`./src/templates/allNews.js`)
  const newsPerPage = 10
  const numOfPages = Math.ceil(allNewsEdges.length / newsPerPage)
  Array.from({ length: numOfPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/news/1` : `/news/${i + 1}`,
      component: slash(allNewsTemplate),
      context: {
        limit: newsPerPage,
        skip: i * newsPerPage,
        numOfPages,
        currentPage: i + 1,
      },
    })
  })
}

import React from "react"
import SmoothImage from "react-smooth-image"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Ticker from "../components/Ticker"

const News = ({ pageContext, data }) => {
  const formatContent = content => {
    const splitContent = content.split("<p>")
    const lastContent = splitContent.length
    content = splitContent[lastContent - 1]
    content = content.replace("</p>", "")
    content = content.split(" ")
    content[0] = `<b>${content[0]}</b>`
    content[1] = `<b>${content[1]}</b>`
    content = content.join(" ")
    return content
  }

  return (
    <Layout>
      <Ticker title="NEWS" />
      <div
        className="flex flex-column"
        style={{ marginTop: 50, marginBottom: 50 }}
      >
        <div
          className="news-card-title"
          style={{ maxWidth: "50%" }}
          dangerouslySetInnerHTML={{
            __html: formatContent(pageContext.content),
          }}
        />
        <SmoothImage
          className="news-card__image"
          src={pageContext.acf.news_post_image.url}
          alt={pageContext.acf.news_post_image.title}
          transitionTime={0.5}
          containerStyles={{ paddingBottom: "130%" }}
          height={pageContext.acf.news_post_image.height}
          width={pageContext.acf.news_post_image.width}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query SingleNews($slug: String) {
    wordpressWpNews(slug: { eq: $slug }) {
      acf {
        news_post_image {
          title
          url
        }
        video
      }
    }
  }
`

export default News

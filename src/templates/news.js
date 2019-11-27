import React from "react"
import Layout from "../components/layout"
import Ticker from "../components/Ticker"

const News = ({ pageContext }) => {
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
        <img
          className="news-card__image"
          src={pageContext.acf.news_post_image.url}
          height={pageContext.acf.news_post_image.height}
          width={pageContext.acf.news_post_image.width}
        />
      </div>
    </Layout>
  )
}

export default News

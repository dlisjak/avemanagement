import React, { useState } from "react"
import Layout from "../components/layout"

const Category = ({ pageContext: { title, firstName, lastName, acf } }) => {
  const [image, setImage] = useState(acf.featuredImage)
  const [tab, setTab] = useState("portfolio")

  return (
    <Layout>
      <div className="flex flex-column">
        <h2 className="flex flex-column">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </h2>
        <div className="flex" style={{ maxHeight: 600 }}>
          <div
            className="flex flex-column"
            style={{ width: "30%", justifyContent: "space-between" }}
          >
            <div className="flex flex-column">
              {acf.portfolio && (
                <span onClick={() => setTab("portfolio")}>PORTFOLIO</span>
              )}
              {acf.videos && (
                <span onClick={() => setTab("videos")}>VIDEOS</span>
              )}
              {acf.bio && <span>BIO</span>}
              {acf.instagram && <span>INSTAGRAM</span>}
            </div>
            <div className="flex flex-column">
              {acf.bio.height && (
                <span>
                  HEIGHT{" "}
                  <span style={{ fontWeight: "bold" }}>{acf.bio.height}</span>
                </span>
              )}
              {acf.bio.hair && (
                <span>
                  HAIR{" "}
                  <span style={{ fontWeight: "bold" }}>{acf.bio.hair}</span>
                </span>
              )}
              {acf.bio.eyes && (
                <span>
                  EYES{" "}
                  <span style={{ fontWeight: "bold" }}>{acf.bio.eyes}</span>
                </span>
              )}
              {acf.bio.bust && (
                <span>
                  BUST{" "}
                  <span style={{ fontWeight: "bold" }}>{acf.bio.bust}</span>
                </span>
              )}
              {acf.bio.suit && (
                <span>
                  SUIT{" "}
                  <span style={{ fontWeight: "bold" }}>{acf.bio.suit}</span>
                </span>
              )}
              {acf.bio.shirt && (
                <span>
                  SHIRT{" "}
                  <span style={{ fontWeight: "bold" }}>{acf.bio.shirt}</span>
                </span>
              )}
              {acf.bio.waist && (
                <span>
                  WAIST{" "}
                  <span style={{ fontWeight: "bold" }}>{acf.bio.waist}</span>
                </span>
              )}
              {acf.bio.hips && (
                <span>
                  HIPS{" "}
                  <span style={{ fontWeight: "bold" }}>{acf.bio.hips}</span>
                </span>
              )}
              {acf.bio.inseam && (
                <span>
                  INSEAM{" "}
                  <span style={{ fontWeight: "bold" }}>{acf.bio.inseam}</span>
                </span>
              )}
              {acf.bio.shoes && (
                <span>
                  SHOES{" "}
                  <span style={{ fontWeight: "bold" }}>{acf.bio.shoes}</span>
                </span>
              )}
            </div>
          </div>
          <div>
            <img
              src={image.url}
              alt={image.alt}
              style={{
                marginBottom: 0,
                objectFit: "contain",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
        </div>
        <div className="flex flex-wrap" style={{ marginTop: 10 }}>
          {tab === "portfolio" &&
            acf.portfolio &&
            acf.portfolio.map(({ title, name, url, alt = "" }, index) => (
              <div
                className="flex-column justify-between category-card"
                style={{ marginBottom: 10 }}
                onClick={() => {
                  setImage({ title, name, url, alt })
                  window.scrollTo(0, 0)
                }}
                key={index}
              >
                <img
                  className="model-portfolio-image"
                  src={url}
                  alt={alt}
                  title={title}
                  name={name}
                />
              </div>
            ))}

          {tab === "videos" &&
            acf.videos &&
            acf.videos.map(({ video_url }, index) => (
              <iframe
                src={video_url}
                width="560"
                height="315"
                title={`${video_url}-${index}`}
                key={index}
              ></iframe>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default Category

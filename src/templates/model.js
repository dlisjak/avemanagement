import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"

const Category = ({ pageContext: { title, firstName, lastName, acf } }) => {
  const [image, setImage] = useState(acf.featuredImage.url)

  console.log({ acf })

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
              {acf.portfolio && <span>PORTFOLIO</span>}
              {acf.videos && <span>VIDEOS</span>}
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
              src={image}
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
          {acf.portfolio.map(({ title, name, url, alt = "" }, index) => (
            <div
              className="flex-column justify-between category-card"
              style={{ marginBottom: 10 }}
              onClick={() => {
                setImage(url)
                window.scrollTo(0, 26)
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
        </div>
      </div>
    </Layout>
  )
}

export default Category

import React, { useState } from "react"
import SmoothImage from 'react-smooth-image';
import Layout from "../components/layout"

const Category = ({ pageContext: { title, firstName, lastName, acf } }) => {
  const [image, setImage] = useState(acf.featuredImage)
  const [tab, setTab] = useState("portfolio")

  return (
    <Layout>
      <div className="flex model flex-column">
        <h2 className="flex model__name flex-column content-padding relative">
          <span>{firstName}</span>
          <span className="absolute" style={{ top: 20 }}>
            {lastName}
          </span>
        </h2>
        <div className="flex model__main content-padding">
          <div
            className="flex model__main-container flex-column"
            style={{ justifyContent: "space-between" }}
          >
            <div className="flex model__menu">
              {acf.portfolio && (
                <a
                  href="#content"
                  onClick={() => setTab("portfolio")}
                  style={{
                    fontWeight: tab === "portfolio" ? "bold" : "normal",
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  PORTFOLIO
                </a>
              )}
              {acf.videos && (
                <a
                  href="#content"
                  onClick={() => setTab("videos")}
                  style={{
                    fontWeight: tab === "videos" ? "bold" : "normal",
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  VIDEOS
                </a>
              )}
              {acf.bio && (
                <a
                  href="#bio"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  BIO
                </a>
              )}
              {acf.instagram && (
                <span style={{ cursor: "pointer" }}>INSTAGRAM</span>
              )}
            </div>
            <div id="bio" className="model__bio flex flex-column">
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={image.url}
              alt={image.alt}
              transitiontime={0.5}
              style={{
                marginBottom: 0,
                objectFit: "contain",
                height: "auto",
                width: "75%",
              }}
            />
          </div>
        </div>
        <div id="content" className="flex flex-wrap" style={{ marginTop: 10 }}>
          {tab === "portfolio" &&
            acf.portfolio &&
            acf.portfolio.map(({ title, name, url, alt = "" }, index) => (
              <div
                className="flex-column justify-between category-card"
                style={{ marginBottom: 2.5 }}
                onClick={() => {
                  setImage({ title, name, url, alt })
                  window.scrollTo(0, 200)
                }}
                style={{ cursor: "pointer" }}
                key={index}
              >
                <SmoothImage
                  src={url}
                  alt={alt}
                  className="model-portfolio-image"
                  transitionTime={0.5}
                  containerStyles={{ paddingBottom: "130%" }}
                  imageStyles={{ height: "100%", objectFit: "cover" }}
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

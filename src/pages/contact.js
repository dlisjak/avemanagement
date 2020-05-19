import React, { useEffect, useContext } from "react"
import Layout from "../components/layout"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import BlackBar from "../components/BlackBar"

const Contact = () => {
  const dispatch = useContext(GlobalDispatchContext)
  let tickerText
  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  useEffect(() => {
    const setPath = () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("ave-ticker")
        tickerText = window.location.pathname
        localStorage.setItem("ave-ticker", tickerText)
        dispatch({ type: "SET_PATH", payload: tickerText })
      }
    }
    setPath()
  }, [])

  return (
    <Layout>
      {true && (
        <div
          className="flex flex-column align-start content-padding"
          style={{
            textAlign: "left",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: !isMobile ? 72 : 44,
              lineHeight: 0.7,
              marginBottom: !isMobile ? -10 : -7,
              color: "black",
            }}
          >
            Ave
            <br /> Management
          </span>
        </div>
      )}
      <div className="flex flex-column align-start content-padding contact-info-text">
        <span className="contact-info-text--span">70 SHENTON WAY</span>
        <span className="contact-info-text--span">EON SHENTON</span>
        <span className="contact-info-text--span">#13-06</span>
        <span className="contact-info-text--span -last">SINGAPORE 079118</span>

        <a
          className="underline contact-text-links"
          target="_blank"
          href="https://goo.gl/maps/JoLuAknYkKp"
        >
          Google maps
        </a>

        <a
          className="underline contact-text-links"
          href="tel:+6568874629"
          style={{
            marginBottom: 30,
            marginTop: 30,
          }}
        >
          T +65 68874629
        </a>

        <a
          className=" underline contact-text-links"
          href="mailto:info@avemanagement.com"
        >
          info@avemanagement.com
        </a>
      </div>
      <div
        className="flex flex-column contact-page-history content-padding"
        style={{
          position: "relative",
          fontSize: !isMobile ? 20 : 18,
          marginLeft: !isMobile && "30%",
          paddingTop: !isMobile && 80,
        }}
      >
        <span
          style={{
            fontWeight: 700,
            marginBottom: 25,
            marginTop: 10,
            fontSize: !isMobile && 28,
          }}
        >
          HISTORY
        </span>
        <p style={{ maxWidth: 680, textTransform: "none" }}>
          Founded in 2004 by international fashion photographers{" "}
          <b>Chuando & Frey</b>, AVE Management has been defining the fashion
          and modeling industry, becoming one of the most recognized modeling
          agencies around the world.
        </p>
        <p style={{ maxWidth: 680, textTransform: "none" }}>
          AVE’s strength lies in discovering the most unique and fresh faces,
          developing each model to their fullest potential and helping them earn
          covers on international acclaimed magazines and spots in campaigns of
          top brands globally.
        </p>
        <p style={{ maxWidth: 680, textTransform: "none" }}>
          AVE represents and developed numerous industry icons and next
          generation top models including{" "}
          <b>
            COCO ROCHA, VANESSA AXENTE, DARIA STROKOUS, SASHA LUSS, JAC MONIKA
            JAGACIAK, SIGRID AGREN, DENISA DVORAKOVA, ALYSSAH PACCOUD, BRIAN
            SHIMANSKY, ANDRE ZIEHE, DIEGO MIGUEL, RICHARD BIEDUL, MARK COX,
            TRAVIS SMITH, SEBASTIAN SAUVE, MATT JAKE YOUNG
          </b>{" "}
          and <b>RYAN KEATING</b> among others.
        </p>
      </div>
    </Layout>
  )
}

export default Contact

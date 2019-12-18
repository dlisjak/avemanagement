import React, { useEffect, useContext } from "react"
import Layout from "../components/layout"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const Contact = () => {
  const dispatch = useContext(GlobalDispatchContext)
  let tickerText

  useEffect(() => {
    const setPath = () => {
      localStorage.removeItem("ave-ticker")
      tickerText = typeof window !== "undefined" ? window.location.pathname : ""
      dispatch({ type: "SET_PATH", payload: tickerText })
    }
    setPath()

    return () => {
      localStorage.setItem("ave-ticker", tickerText)
    }
  }, [])

  return (
    <Layout>
      <div
        className="flex flex-column align-center"
        style={{ maxWidth: 500, margin: "auto", textAlign: "center" }}
      >
        <h1>Ave Management</h1>
        <span style={{ marginBottom: 50 }}>
          70 SHENTON WAY, #13-06 EON SHENTON SINGAPORE 079118
        </span>
        <span>T +65 68874629</span>
        <span style={{ marginBottom: 20 }}>T +65 68874629</span>

        <a
          href="mailto:info@avemanagement.com"
          style={{
            textDecoration: "none",
            textTransform: "none",
            color: "#222",
          }}
        >
          info@avemanagement.com
        </a>

        <a
          href="https://goo.gl/maps/JoLuAknYkKp"
          style={{
            textDecoration: "none",
            textTransform: "uppercase",
            color: "#222",
            marginTop: 10,
          }}
        >
          Google maps
        </a>

        <div
          className="flex flex-column contact-page-history"
          style={{ marginTop: 50 }}
        >
          <h3>A BRIEF HISTORY</h3>
          <p>
            Founded in 2004 by photographer duo ChuanDo & Frey, AVE Management
            has been defining the fashion and modeling industry, becoming one of
            the most recognized modeling agencies around the world.
          </p>
          <p>
            AVE’s strength lies in discovering the most unique and fresh faces,
            developing each model to their full potential and helping them earn
            covers on international acclaimed magazines and spots in campaigns
            of top brands.
          </p>
          <p>
            AVE represents and developed numerous industry icons including COCO
            ROCHA, VANESSA AXENTE, DARIA STROKOUS, SASHA LUSS, JAC JAGACIAK,
            SIGRID AGREN, IRENE HIEMSTRA, DIEGO MIGUEL, RICHARD BIEDUL, MARK
            COX, TRAVIS SMITH, ADAM BUTCHER and RYAN KEATING among others.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact

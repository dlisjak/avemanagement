import React, { useEffect, useContext } from "react"
import Layout from "../components/layout"

import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import BlackBar from "../components/BlackBar"

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
      <BlackBar height={100} />
      <div
        className="flex flex-column align-start"
        style={{ textAlign: "left", marginTop: 10 }}
      >
        <span style={{ fontWeight: 700, marginBottom: 25 }}>
          Ave Management
        </span>
        <span>70 SHENTON WAY</span>
        <span>EON SHENTON</span>
        <span>#13-06</span>
        <span style={{ marginBottom: 50 }}>SINGAPORE 079118</span>

        <a
          href="https://goo.gl/maps/JoLuAknYkKp"
          style={{
            textDecoration: "none",
            textTransform: "uppercase",
            color: "#222",
            marginTop: 10,
            fontWeight: 700,
          }}
        >
          Google maps
        </a>

        <span style={{ marginBottom: 20, marginTop: 20, fontWeight: 700 }}>
          T +65 68874629
        </span>

        <a
          href="mailto:info@avemanagement.com"
          style={{
            textDecoration: "none",
            textTransform: "uppercase",
            color: "#222",
            fontWeight: 700,
          }}
        >
          info@avemanagement.com
        </a>

        <div
          className="flex flex-column contact-page-history"
          style={{ marginTop: 50 }}
        >
          <BlackBar height={100} />
          <h3 style={{ marginTop: 10 }}>HISTORY</h3>
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

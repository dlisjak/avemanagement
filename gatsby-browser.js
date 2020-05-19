import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"
import "./src/css/reset.min.css"
import "./src/css/layout.css"
import "./src/css/main.css"

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}

import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"
import "./src/css/reset.min.css"
import "./src/css/layout.min.css"
import "./src/css/main.min.css"

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}

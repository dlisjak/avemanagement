import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"
import "./src/components/layout.min.css"

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}

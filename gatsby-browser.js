import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}

export const onPreRouteUpdate = ({ location }) => {
  console.log("Gatsby started to change location to", location.pathname)
}

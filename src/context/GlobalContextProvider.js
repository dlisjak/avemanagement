import React from "react"

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
  path: "",
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_PATH": {
      return {
        ...state,
        path: action.payload,
      }
    }

    default:
      throw new Error("Bad action type")
  }
}

const GlobalContextProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}


export default GlobalContextProvider;
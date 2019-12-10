import React from "react"

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
  category: "",
  path: "",
  headShot: null,
  profile: null,
  midLength: null,
  fullLength: null,
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_PATH": {
      return {
        ...state,
        path: action.payload,
      }
    }

    case "SET_CATEGORY": {
      return {
        ...state,
        category: action.payload,
      }
    }

    case "headShot": {
      return {
        ...state,
        headShot: action.payload,
      }
    }

    case "profile": {
      return {
        ...state,
        profile: action.payload,
      }
    }

    case "midLength": {
      return {
        ...state,
        midLength: action.payload,
      }
    }

    case "fullLength": {
      return {
        ...state,
        fullLength: action.payload,
      }
    }

    default:
      console.log(action.type)
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider

const initialState = {
  user: null,
  isAuthenticated: false,
  connections: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_CONNECTIONS":
      return {
        ...state,
        connections: action.payload
      }
    case "LOGIN/REGISTER/LOGOUT":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated
      }
    default:
      return state
  }
}
const initialState = {
  user: null,
  isAuthenticated: false,
  connections: [],
  location: {},
  sosLocation: {
    coordinates: {
      latitude: 36.158331,
      longitude: -115.15254
    },
    title: "sos",
    description: ""
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_CONNECTIONS":
      return { ...state, connections: action.payload };
    case "LOGIN/REGISTER/LOGOUT":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated
      };
    case "GET_USER_LOCATION":
      return { ...state, location: action.userLocation };
    case "SET_SOS_LOCATION":
      return {
        ...state,
        sosLocation: action.payload
      };

    default:
      return state;
  }
}

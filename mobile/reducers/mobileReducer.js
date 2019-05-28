const initialState = {
  user: null,
  isAuthenticated: false,
  connections: [],
  location: {},
  vehicleLocation: {
    coordinates: {
      latitude: null,
      longitude: null
    },
    title: "vehicle",
    description: ""
  },
  sosLocation: {
    coordinates: {
      latitude: null,
      longitude: null
    },
    title: "sos",
    description: ""
  },
  isActive: false
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
    case "SET_SOS_STATE":
      return {
        ...state,
        isActive: action.payload
      };
    default:
      return state;
  }
}

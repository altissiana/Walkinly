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
    case "GET_MARKERS":
      let vehicleMarker = {};
      let sosMarker = {};
      if (action.payload[0].type == "vehicle") {
        vehicleMarker = action.payload[0];
      } else {
        sosMarker = action.payload[0];
      }
      if (action.payload[1].type == "sos") {
        sosMarker = action.payload[1];
      } else {
        vehicleMarker = action.payload[1];
      }
      return {
        ...state,
        sosLocation: {
          coordinates: {
            latitude: sosMarker.latitude,
            longitude: sosMarker.longitude
          },
          title: sosMarker.title,
          description: sosMarker.description
        },
        vehicleLocation: {
          coordinates: {
            latitude: vehicleMarker.latitude,
            longitude: vehicleMarker.longitude
          },
          title: vehicleMarker.title,
          description: vehicleMarker.description
        }
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

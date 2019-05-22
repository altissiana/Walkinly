import { AsyncStorage } from 'react-native';
import store from '../store';
import axios from "axios";

export function signout() {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem('userToken');
    store.dispatch({
      type: "LOGIN/REGISTER/LOGOUT",
      payload: {
        user: null,
        isAuthenticated: false
      }
    })
    resolve()
  })
    .catch(err => {
      const error = err.response.data.error;
      reject(error);
    })
}

export function getConnections(email) {
  return new Promise((resolve, reject) => {
    axios.get(`http://10.68.0.155:3001/api/contacts/${email}`).then(resp => {
      store.dispatch({
        type: "GET_CONNECTIONS",
        payload: resp.data
      })
      resolve()
    })
      .catch(err => {
        reject(err)
      })
  })
}

export function signin(email, password) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://10.68.0.155:3001/api/login", { email, password })
      .then(async (resp) => {
        const email = resp.data.email;
        await getConnections(email);
        await AsyncStorage.setItem('userToken', email);
        store.dispatch({
          type: "LOGIN/REGISTER/LOGOUT",
          payload: {
            user: email,
            isAuthenticated: true
          }
        })
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function register(email, password, phonenumber, firstname, lastname) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://10.68.0.155:3001/api/register", { email, password, phonenumber, firstname, lastname })
      .then(async (resp) => {
        const email = resp.data.email;
        await getConnections(email);
        await AsyncStorage.setItem('userToken', email);
        store.dispatch({
          type: "LOGIN/REGISTER/LOGOUT",
          payload: {
            user: email,
            isAuthenticated: true
          }
        })
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

// /* function changeProfilePic(picURL) {
//   return new Promise((resolve, reject) => {
//     axios
//       .patch('/api/change-profile-image', picURL)
//       .then(resp => {
//         const token = resp.data.token
//         axios.defaults.headers.common.Authorization = 'Bearer ' + token
//         window.localStorage.setItem('authtoken', token)
//         setUser(getUser())
//         resolve()
//       })
//       .catch(err => {
//         const error = err.response.data.error
//         reject(error)
//       })
//   })
// }

export function changePassword(newPass) {
  return new Promise((resolve, reject) => {
    axios
      .patch('/api/changePassword', newPass)
      .then(resp => {
        resolve()
      })
      .catch(err => {
        const error = err.response.data.error
        reject(error)
      })
  })
}


import { AsyncStorage } from "react-native";
import store from "../store";
import axios from "axios";

export function signout() {
  return new Promise((resolve, reject) => {
    AsyncStorage.clear()
    store.dispatch({
      type: "LOGIN/REGISTER/LOGOUT",
      payload: {
        user: null,
        isAuthenticated: false
      }
    })
    resolve();
  }).catch(err => {
    const error = err.response.data.error;
    reject(error);
  })
}

export function getConnections(email) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://10.68.0.155:3001/api/contacts/${email}`)
      .then(resp => {
        store.dispatch({
          type: "GET_CONNECTIONS",
          payload: resp.data
        }) 
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function signin(email, password) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://10.68.0.155:3001/api/login", { email, password })
      .then(async (resp) => {
        const { email, name, phonenumber } = resp.data;
        await getConnections(email);
        await AsyncStorage.setItem('userToken', email);
        await AsyncStorage.setItem('userName', name);
        await AsyncStorage.setItem('userPhone', phonenumber);
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
        const { email, name, phonenumber } = resp.data;
        await getConnections(email)
        await AsyncStorage.setItem('userToken', email)
        await AsyncStorage.setItem('userName', name)
        await AsyncStorage.setItem('userPhone', phonenumber)
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

export function changePassword(email, newPassword) {
  return new Promise((resolve, reject) => {
    axios
      .patch('http://10.68.0.155:3001/api/changePassword', { email, newPassword })
      .then(resp => {
        resolve()
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function setSosLocation(sosLocation) {
  store.dispatch({
    type: "SET_SOS_LOCATION",
    payload: sosLocation
  })
}

export function setSosStatus(isActive) {
  store.dispatch({
    type: "SET_SOS_STATUS",
    payload: isActive
  });
}

export function newConnection(userEmail, phonenumber, firstname, lastname) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://10.68.0.155:3001/api/newConnection", {
        userEmail,
        phonenumber,
        firstname,
        lastname
      })
      .then(async resp => {
        await getConnections(userEmail);
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function editConnection(userEmail, phonenumber, firstname, lastname) {
  return new Promise((resolve, reject) => {
    axios
      .patch('http://10.68.0.155:3001/api/editConnection', {
        userEmail,
        phonenumber,
        firstname,
        lastname
      })
      .then(async resp => {
        await getConnections(userEmail);
        resolve();
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function deleteConnection(userEmail, phonenumber) {
  return new Promise((resolve, reject) => {
    axios
      .delete("http://10.68.0.155:3001/api/deleteConnection", { data: {
        userEmail, phonenumber
      }})
      .then(async resp => {
        await getConnections(userEmail)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}
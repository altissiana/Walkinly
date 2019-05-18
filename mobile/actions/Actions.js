import axios from "axios";

export function getConnections(email) {
  return new Promise((resolve, reject) => {
    axios.get(`http://10.68.0.155:3001/api/contacts/${email}`).then(resp => {
      resolve(resp.data)
    })
    .catch(err => {
      reject(err.response.data.error)
    })
  })
}

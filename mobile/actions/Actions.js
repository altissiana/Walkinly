import axios from "axios";

export function getConnections(email) {
  axios.get(`http://10.68.0.240:3001/api/Contacts/${email}`).then(resp => {
    return resp.data;
  });
}

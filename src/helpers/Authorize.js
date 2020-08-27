import axios from 'axios'

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: "https://saltiest-server.herokuapp.com/",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  })
}

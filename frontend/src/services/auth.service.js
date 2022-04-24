import axios from "axios";
import { API_URL } from "../app/constant";
const register = (username, email, password) => {
  return axios.post(API_URL + "/auth/register", {
    username,
    email,
    password,
  });
};
const login = (username, password) => {
  return axios
    .post(API_URL + "/auth/login", {
      username,
      password,
    })
    .then((response) => {
      console.log(response)
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response.data)
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  login,
  logout,
};
export default authService;
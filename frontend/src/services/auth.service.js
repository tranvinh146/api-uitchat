import axios from "axios";
import { API_URL } from "../app/constant";
const register = (name, email, password, avatar) => {
  return axios.post(API_URL + "/auth/register", {
    email,
    password,
    name,
    avatar
  });
};
const login = (email, password) => {
  return axios
    .post(API_URL + "/auth/login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response.access_token)
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
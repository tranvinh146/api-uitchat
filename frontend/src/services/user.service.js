import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "../app/constant"
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const userService = {
  getUserBoard
};
export default userService
import axios from "axios";
import jwtDecode from "jwt-decode";
const API_URL = "http://localhost:8080/api/user/";
const register = (user) => {
  return axios.post(API_URL + "register", user);
};
const login = (user) => {
  return axios.post(API_URL + "login", user).then((response) => {
    if (response.data.token) {
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      axios.defaults.headers.common["Authorization"] = token;
      const decoded = jwtDecode(token);
      localStorage.setItem("userid", decoded.id);
      localStorage.setItem("username", decoded.firstName);

      if (decoded.roles[0].name === "ADMIN") {
        localStorage.setItem("isAdmin", true);
        return true;
      } else {
        localStorage.setItem("isAdmin", false);
        return false;
      }
    }
  });
};
const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userid");
  localStorage.setItem("isAdmin", false);
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("userid"));
};
const checkAdmin = () => {
  if (localStorage.getItem("isAdmin")) {
    return true;
  } else return false;
};
const AuthService = {
  register,
  login,
  checkAdmin,
  logout,
  getCurrentUser,
};
export default AuthService;

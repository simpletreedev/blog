import axios from "axios";
import jwtDecode from "jwt-decode";

const user = JSON.parse(localStorage.getItem("userData"));

console.log(process.env.REACT_APP_API_URL);

const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: { Authorization: `Bearer ${user?.accessToken}` },
});

export default makeRequest;

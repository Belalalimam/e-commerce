import axios from "axios";

const request = axios.create({
  // baseURL: "https://royal-tex.shutterfly-alu.com",
  baseURL: "https://myserver-app.up.railway.app",
  // baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json"
  },
});

export default request;

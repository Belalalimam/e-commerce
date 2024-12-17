import axios from "axios";

const request = axios.create({
  baseURL: "https://myserver-app.up.railway.app",
  headers: {
    "Content-Type": "application/json"
  },
});

export default request;

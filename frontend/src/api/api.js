import axios from "axios";

const API = axios.create({
  baseURL: "https://doctor-2s4l.onrender.com",
});

export default API;

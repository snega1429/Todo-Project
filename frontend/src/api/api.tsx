// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-project-fidu.onrender.com"
});
export default api;
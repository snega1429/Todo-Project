import axios from 'axios';
const API = axios.create({
    baseURL: "https://todo-project-fidu.onrender.com/"
});
export default API;
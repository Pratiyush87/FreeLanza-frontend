import axios from "axios";

const newRequest = axios.create({
 baseURL: "https://freelance-app-knrd.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;

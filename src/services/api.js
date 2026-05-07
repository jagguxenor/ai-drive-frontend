import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-drive-frontend.vercel.app",
  withCredentials: true // IMPORTANT for OAuth session
});

export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-drive-agent-clean-5.onrender.com",
  withCredentials: true // IMPORTANT for OAuth session
});

export default api;
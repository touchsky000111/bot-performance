import axios from "axios";

export const api = axios.create({
  baseURL: "https://fish-related-giraffe.ngrok-free.app", 
  headers: {
    "ngrok-skip-browser-warning": "true",  // ✅ bypass ngrok middle page
  },
});

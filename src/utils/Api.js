const api_url =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://knit-backend-oz0y.onrender.com";

export default api_url;
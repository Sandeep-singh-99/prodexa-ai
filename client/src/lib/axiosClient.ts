import axios from "axios";

console.log("🚨 VITE_API_URL:", import.meta.env.VITE_API_URL);

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
});

const fetchCsrfToken = async () => {
  const res = await axios.get(`http://localhost:5000/api/v1/csrf-token`, {
    withCredentials: true,
  });
  return res.data.csrfToken;
};

axiosClient.interceptors.request.use(
  async (config) => {
    const unsafeMethods = ["post", "put", "patch", "delete"];
    const method = config.method?.toLowerCase();

    if (unsafeMethods.includes(method || "")) {
      const csrfToken = await fetchCsrfToken();
      config.headers["X-CSRF-Token"] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 403 &&
      error.response?.data?.message?.includes("invalid csrf token") &&
      !originalRequest._retry
    ) {
      toast.warn("Session expired. Retrying...");
      originalRequest._retry = true;
      try {
        const csrfToken = await fetchCsrfToken();
      originalRequest.headers["X-CSRF-Token"] = csrfToken;

      return axiosClient(originalRequest); 
      } catch (error) {
        toast.error("Retry failed. Please refresh the page.");
        return Promise.reject(error);
      }
    }

     // Optional: show other server-side errors
    if (error.response?.status === 500) {
      toast.error("Server error occurred.");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Add request interceptor for debugging
axios.interceptors.request.use((request) => {
  console.log("Making request to:", request.url);
  return request;
});

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", error.message);
    if (error.response) {
      console.error(
        "Error response:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    }
    return Promise.reject(error);
  }
);

// Stations API
export const getAllStations = async () => {
  const response = await axios.get(`${API_URL}/stations`);
  return response.data;
};

export const getStationByCode = async (code) => {
  const response = await axios.get(`${API_URL}/stations/code/${code}`);
  return response.data;
};

export const getStationsByLine = async (lineName) => {
  const response = await axios.get(`${API_URL}/stations/line/${lineName}`);
  return response.data;
};

export const searchStations = async (query) => {
  const response = await axios.get(`${API_URL}/stations/search/${query}`);
  return response.data;
};

// Routes API
export const getAllRoutes = async () => {
  const response = await axios.get(`${API_URL}/routes`);
  return response.data;
};

export const getRouteByLine = async (lineName) => {
  const response = await axios.get(`${API_URL}/routes/line/${lineName}`);
  return response.data;
};

// Fares API
export const calculateFare = async (from, to) => {
  const response = await axios.get(
    `${API_URL}/fares/calculate?from=${from}&to=${to}`
  );
  return response.data;
};

export const getFareChart = async () => {
  const response = await axios.get(`${API_URL}/fares/chart`);
  return response.data;
};

export const getAllFares = async () => {
  const response = await axios.get(`${API_URL}/fares`);
  return response.data;
};

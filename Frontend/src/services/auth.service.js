import axios from "axios";

const API_URL = "http://localhost:5000"; // Set the correct backend URL here

const register = (firstName, lastName, email, password) => {
  return axios.post(`${API_URL}/api/auth/signup`, {
    firstName,
    lastName,
    email,
    password,
  });
};

// Rest of your code...

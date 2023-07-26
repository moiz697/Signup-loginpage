
// api.js (frontend)
const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend server URL

export const fetchDataFromBackend = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/data`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
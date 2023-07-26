// api.js
export const fetchDataFromBackend = async () => {
  try {
    const response = await fetch("/api/data"); // Make sure the endpoint matches the one defined in app.js (e.g., '/api/data')
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
};

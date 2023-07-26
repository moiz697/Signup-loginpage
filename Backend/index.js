// index.js (backend server)
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // Use the desired port for your backend

// Define your API endpoints here
app.get('/api/data', (req, res) => {
  const data = { message: 'Hello from the backend !' };
  res.json(data);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
// Define your routes here
// For example:
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend API is working!" });
});

app.post("/api/data", (req, res) => {
  // This is an example of a POST request handler
  // Here, you can handle the incoming data and perform any necessary operations
  const data = req.body;
  console.log("Received data from the client:", data);

  // Return a response to the client
  res.json({ success: true, message: "Data received successfully!" });
});

// Add more routes as needed...

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

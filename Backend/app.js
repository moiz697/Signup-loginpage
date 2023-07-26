const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Enable JSON body parsing middleware

// Serve the static frontend files
app.use(express.static(path.join(__dirname, "../Frontend/build")));

// Define your API endpoints here

// Endpoint to handle user registration
app.post("../frontend/services/auth.services", (req, res) => {
  // Get user data from the request body
  const { firstName, lastName, email, password } = req.body;

  // Validate the user data (you can add more validations if needed)
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if the email already exists (you'll need to implement this check)
  // For simplicity, let's assume the email doesn't exist for now

  // Create a new user object with the provided data
  const newUser = {
    id: Date.now(), // You can use a unique ID generator library for more robust IDs
    firstName,
    lastName,
    email,
    password,
  };

  // Read the existing data from data.json file
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data from file:", err);
      return res.status(500).json({ message: "Error registering user." });
    }

    let users = [];
    if (data) {
      try {
        users = JSON.parse(data).users;
      } catch (err) {
        console.error("Error parsing data from file:", err);
        return res.status(500).json({ message: "Error registering user." });
      }
    }

    // Push the new user to the users array
    users.push(newUser);

    // Write the updated data back to data.json file
    fs.writeFile("data.json", JSON.stringify({ users }), "utf8", (err) => {
      if (err) {
        console.error("Error writing data to file:", err);
        return res.status(500).json({ message: "Error registering user." });
      }

      // If everything is successful, send a response
      return res.status(201).json({ message: "User registered successfully." });
    });
  });
});

// Handle requests that are not caught by the API endpoints
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

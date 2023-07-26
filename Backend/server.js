const fs = require("fs");

const data = {
  users: [
    { id: 1, name: "John" },
    { id: 2, name: "Alice" },
    // Add more data as needed
  ],
};

const jsonData = JSON.stringify(data, null, 2);

fs.writeFile("data.json", jsonData, "utf8", (err) => {
  if (err) {
    console.error("Error writing data to file:", err);
  } else {
    console.log("Data saved to data.json");
  }
});

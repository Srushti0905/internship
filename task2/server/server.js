const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// API route
app.get("/products", async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/products?limit=100");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
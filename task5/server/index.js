console.log("THIS IS MY SERVER FILE");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("HELLO SRUSHTI WORKING");
});

// ✅ FORM ROUTE
app.post("/submit", (req, res) => {
  console.log("Form Data:", req.body);
  res.json({ message: "Form submitted successfully!" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/submit", (req, res) => {
  console.log(req.body); // see form data in terminal
  res.json({ message: "Form submitted successfully ✅" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

const express = require("express");

const PORT = process.env.PORT || 8085;

const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Spotify Scanner" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
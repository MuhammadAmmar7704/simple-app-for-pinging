const express = require("express");
const axios = require("axios");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 3000;

// URL to ping every 5 minutes
// const targetURL = "google.com";
const targetURL = "https://httpbin.org/get";


// Schedule a GET request every 5 minutes
cron.schedule("*/1 * * * *", async () => {
  try {
    const res = await axios.get(targetURL);
    console.log(`[${new Date().toISOString()}] Pinged successfully:`, res.status);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error pinging:`, err.message);
  }
});

// Optional route
app.get("/", (req, res) => {
  res.send("Uptime ping service is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

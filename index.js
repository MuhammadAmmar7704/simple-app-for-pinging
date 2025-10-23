// const express = require("express");
// const axios = require("axios");
// const cron = require("node-cron");
// require("dotenv").config()

// const app = express();
// const PORT = process.env.PORT || 3000;

// // URL to ping every 5 minutes
// // const targetURL = "google.com";
// const targetURL = process.env.PING_URL;

// // Schedule a GET request every 5 minutes
// cron.schedule("*/5 * * * *", async () => {
//   try {
//     const res = await axios.get(targetURL);
//     console.log(`[${new Date().toISOString()}] Pinged successfully:`, res.status);
//   } catch (err) {
//     console.error(`[${new Date().toISOString()}] Error pinging:`, err.message);
//   }
// });

// // Optional route
// app.get("/", (req, res) => {
//   res.send("Uptime ping service is running!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const axios = require("axios");
const cron = require("node-cron");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// URLs to ping every 5 minutes
const targets = [process.env.PING_URL_1, process.env.PING_URL_2];

// Schedule a GET request every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  for (const url of targets) {
    try {
      const res = await axios.get(url);
      console.log(`[${new Date().toISOString()}] Pinged ${url} successfully:`, res.status);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] Error pinging ${url}:`, err.message);
    }
  }
});

// Optional route
app.get("/", (req, res) => {
  res.send("Uptime ping service is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

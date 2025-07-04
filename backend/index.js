const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simulated SEO headlines
const headlines = [
  "Why {{name}} is the Top Choice in {{location}} for 2025",
  "Discover {{name}}: {{location}}’s Best Kept Secret",
  "{{name}} in {{location}} is Your Must-Try Destination This Year",
  "How {{name}} is Revolutionizing Local Business in {{location}}",
  "Top Reasons People Love {{name}} in {{location}}"
];

// Helper to generate random rating, review count, and formatted headline
const getRandomRating = () => (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
const getRandomReviews = () => Math.floor(Math.random() * 300 + 50);
const getRandomHeadline = (name, location) => {
  const template = headlines[Math.floor(Math.random() * headlines.length)];
  return template.replace("{{name}}", name).replace("{{location}}", location);
};

// POST /business-data
app.post("/business-data", (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: "Name and location are required." });
  }

  const data = {
    rating: parseFloat(getRandomRating()),
    reviews: getRandomReviews(),
    headline: getRandomHeadline(name, location)
  };

  res.json(data);
});

// GET /regenerate-headline
app.get("/regenerate-headline", (req, res) => {
  const { name, location } = req.query;

  if (!name || !location) {
    return res.status(400).json({ error: "Query params 'name' and 'location' required." });
  }

  const newHeadline = getRandomHeadline(name, location);

  res.json({ headline: newHeadline });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

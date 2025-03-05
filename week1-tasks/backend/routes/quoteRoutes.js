const express = require("express");
const Quote = require("../models/Quote");

const router = express.Router();

// ✅ Route to add a new quote
router.post("/", async (req, res) => {
  try {
    const { content, author } = req.body;
    const newQuote = new Quote({ content, author });
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(500).json({ error: "Failed to add quote" });
  }
});

// ✅ Route to get all quotes
router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

// Route to get a random quote (acts as "Today's Quote")
router.get("/today", async (req, res) => {
  try {
    const quote = await Quote.aggregate([{ $sample: { size: 1 } }]); // Get one random quote

    if (!quote.length) {
      return res.json({ message: "No quotes available" });
    }

    res.json(quote[0]); // Since aggregate returns an array, return the first element
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch today's quote" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const author = req.query.author;
    if (!author) {
      return res.status(400).json({ message: "Author name is required" });
    }

    const quotes = await Quote.find({ author: new RegExp(author, "i") }); // Case-insensitive search

    if (!quotes.length) {
      return res
        .status(404)
        .json({ message: "No quotes found for this author" });
    }

    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

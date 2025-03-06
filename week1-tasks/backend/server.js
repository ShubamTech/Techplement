const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const quoteRoutes = require("./routes/quoteRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;

// ✅ Fix CORS: Move it before routes
app.use(
  cors({
    origin: "*", // Allows access from all devices
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ✅ Fix MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Fix OverwriteModelError
const quoteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
});

const Quote = mongoose.models.Quote || mongoose.model("Quote", quoteSchema);

// ✅ Define API Routes
app.get("/api/quotes", async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/quotes", async (req, res) => {
  const { content, author } = req.body;
  const quote = new Quote({ content, author });
  try {
    const newQuote = await quote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/api/quotes/today", async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: "No quotes available" });
    }
    const randomIndex = Math.floor(Math.random() * count);
    const randomQuote = await Quote.findOne().skip(randomIndex);
    res.json(randomQuote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/quotes/search", async (req, res) => {
  try {
    const author = req.query.author;
    if (!author) {
      return res.status(400).json({ message: "Author name is required" });
    }
    const quotes = await Quote.find({ author: new RegExp(author, "i") });
    if (quotes.length === 0) {
      return res
        .status(404)
        .json({ message: "No quotes found for this author" });
    }
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use("/api/quotes", quoteRoutes);

// ✅ Fix Frontend Build Path
const frontendPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

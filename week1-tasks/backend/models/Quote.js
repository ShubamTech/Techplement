const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Add timestamp field
});

module.exports = mongoose.model("Quote", quoteSchema);

"se-strict";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Book from "./models/books.js";

// Configuration for .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connection to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
  }
};
connectDB();

// API Routes
app.get("/", (req, res) => {
  res.send("Welcome to the SelfDev Library!");
});

// Get all books from the database
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from MongoDB
    res.json(books); // Send the books as a JSON response
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.send("Book not available");
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

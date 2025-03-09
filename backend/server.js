//import required modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import Book from "./models/books.js";

//starts the configuration of dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//uses
app.use(express.json());
app.use(cors());

//connection to mongodb database
const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected succesfully");
  } catch (err) {
    console.error(`Connection failed : ${err}`);
  }
};
//executing the function
connectDB();

//ENDPOINTS
//initial endpoint
app.get("/", (req, res) => {
  res.send("Welcome to SelfDev Library");
});

//get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();

    if (!books) {
      console.log("No books found in database");
    }
    res.json(books);
  } catch (err) {
    console.error("Error fetching books: ", err);
    res.status(500).json({ message: "Server Error" });
  }
});

//get a specific book by its id
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Find book by ID
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book); // Return the found book
  } catch (error) {
    res.status(500).json({ message: "Server Error, Book with id not found" });
  }
});

//server execution
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

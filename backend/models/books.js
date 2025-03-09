import mongoose from "mongoose";

// Define the Book schema
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    published: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: false,
    },
    genre: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Book model using the schema
const Book = mongoose.model("Book", bookSchema, "books");

export default Book;

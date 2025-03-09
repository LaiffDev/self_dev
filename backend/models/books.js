import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
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
  // genre: {
  //   type: Array,
  //   required: true,
  // },
  // status: {
  //   type: String,
  //   required: true,
  // },
});

const Book = mongoose.model("Book", bookSchema, "books");

export default Book;

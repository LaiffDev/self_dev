import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

//temporary data
// let books = [
//   { id: 1, title: "Atomic Habits", author: "James Clear" },
//   { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
//   { id: 3, title: "Cant Hurt Me", author: "David Goggins" },
// ];

//connection to mongodb
const connectionString =
  "mongodb+srv://laiffdev:lawele93@cluster0.fwmhvl9.mongodb.net/";

app.get("/", (req, res) => {
  res.send("Welcome to the Library API!");
});

//get all books
app.get("/books", (req, res) => {
  res.json(books);
});

//get a specific book by its id
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

//add book to collection
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

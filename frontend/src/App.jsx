import { useEffect, useState } from "react";
import "./App.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      await fetch("http://localhost:8000/books/")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBooks(data);
        });
    } catch (err) {
      console.error("Erro while fetching books : ", err);
    }
  };

  useEffect(() => fetchBooks, []);

  return (
    <>
      {books.map((book) => (
        <section className="shadow-md w-[70%]">
          <img src="" alt="" />
          <div>
            <h2>{book.title}</h2>
            <div>
              <p>{book.author}</p>
              <span>{book.published}</span>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export default App;

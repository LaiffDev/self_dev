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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    swipeToSlide: false,
    adaptiveHeight: true,
    initialSlide: 0,
    responsive: [
      { breakpoint: 1300, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold">SELFDEV LIBRARY</h1>
        <p>Your best library for finding self development books</p>
      </div>

      <div className="w-[85%] m-auto p-5">
        <Slider {...settings} centerMode={false} initialSlide={0}>
          {books.map((book) => (
            <div key={book._id} className="px-8">
              <div className="shadow-md  border border-[#ece8e8] rounded-lg overflow-hidden w-fit">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-70 h-70 object-contain block m-auto p-2"
                />
                <div className="text-left mt-2 bg-blue-200 w-full p-2">
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-xs">{book.author}</p>
                  <p>{book.published}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default App;

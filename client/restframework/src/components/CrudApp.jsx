import React, { useEffect, useState } from "react";

function CrudApp() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [release, setRelease] = useState(0);

  const [newtitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/books_manage/getbooks/"
      );

      const data = await response.json();

      console.log(data);
      setBooks(data);
      console.log(books);
    } catch (error) {
      console.log(error);
    }
  };
  // ------------------------create_books
  const createBooks = async () => {
    const bookData = {
      book_title: title,
      created_year: release,
    };
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/books_manage/createbooks/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );

      if (!response.ok) {
        throw new Error(`server error ${response.status}`);
      }

      const data = await response.json();
      setBooks((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };


//   update------------------------------------------
  const upadateTitle = async (pk, created_year) => {
    const bookData = {
      book_title: newtitle,
      created_year: created_year,
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/books_manage/books/${pk}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );
      if (!response.ok){
        throw new Error(`server error ${response.status}`)
    }
    
    const data = await response.json();
    setBooks((prev) => prev.map((book)=>{
        if(book.id === pk){
            return data;
        }else{
            return book;
        }
    }))
    } catch (err) {
      console.error(err);
    }
  };
// delete app--------------------------------------------
  const deleteBooks = async (pk)=>{

    try{
        const response = await fetch(`http://127.0.0.1:8000/books_manage/books/${pk}/`,{
            method:"DELETE"
        });

        

        setBooks((prev) => prev.filter((book) =>
         book.id !== pk
        ))
    }catch(err){
        console.log(err);
        
    }

  }

  return (
    <div>
      <h1> Book Website </h1>

      <div>
        <input
          type="text"
          placeholder="Book Title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Year..."
          onChange={(e) => setRelease(e.target.value)}
        />
        <button onClick={createBooks}> Add Book </button>
      </div>

      {books.map((book, index) => (
        <div key={index}>
          <p>Title: {book.book_title}</p>
          <p>Year: {book.created_year}</p>
          <input
            type="text"
            placeholder="new book"
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={() => upadateTitle(book.id, book.created_year)}>
            changetitle
          </button>
          <button onClick={() =>deleteBooks(book.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default CrudApp;

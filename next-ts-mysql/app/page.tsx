"use client";

import { useEffect, useState } from "react";
import Layout from "./pages/layout/page";
import axios from "axios";

export default function Home() {
  type books = {
    id: number;
    title: string;
    desc: string;
    cover: string;
  }
  const [books, setBooks] = useState<books[]>([]);

  useEffect(() => {
    const fetchBooks = async() => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch(err){
        console.log(err);
      }
    };
    
    fetchBooks();
  }, []);

  return (
      <Layout>
        {books.map((book) => (
          <div key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
          </div>
        ))}
      </Layout>
    );
}

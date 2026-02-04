"use client";

import { useEffect, useState } from "react";
import Layout from "./pages/layout/page";
import axios from "axios";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async() => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        console.log(res);
      } catch(err){
        console.log(err);
      }
      fetchBooks()
    }
  })

  return (
      <Layout>
        hmm
      </Layout>
    );
}

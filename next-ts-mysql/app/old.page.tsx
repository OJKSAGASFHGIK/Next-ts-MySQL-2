"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function page(){
    type books = {
        id: number;
        title: string;
        desc: string;
        price: number;
        cover: string;
    }
    const [books, setBooks] = useState<books[]>([]);

    useEffect(() => {
        const fetchBooks = async() => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
            }
            catch(err){ console.log(err) }
        };

        fetchBooks();
    }, [])

    return(<>
        {books.map((book) => (
            <div key={book.id}>
                <h1>{book.title}</h1>
                <p>{book.desc}</p>
                <p>{book.price}</p>
                <Link href={`/update-test/${book.id}`}>Update</Link>
                
                <br/><br/>
            </div>
        ))}
    </>)
}

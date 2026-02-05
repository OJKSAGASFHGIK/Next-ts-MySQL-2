"use client";   
import { useState } from "react"

export default function add(){
    const [books, setBooks] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ""
    });

    return(<>
        <div>
            <h1>Add Book</h1>
            <input type="text" placeholder="title" />
            <input type="desc" placeholder="description" />
            <input type="number" placeholder="price" />
            <input type="text" placeholder="cover" />
            <button className="cursor-pointer">Add</button>
        </div>
    </>)
}
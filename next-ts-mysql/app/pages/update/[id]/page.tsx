"use client";

import axios from "axios";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

/* type Book = {
  title: string;
  desc: string;
  price: number | null;
  cover: string;
} */

export default function BookUpdate( props: {params: Promise<{ id: string }>;} ){
  const { id } = use(props.params);

  const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [error, setError] = useState(false);
  const navigate = useRouter();
  const handleClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      
      try {
          await axios.put(`http://localhost:8800/books/${id}`, book)
          navigate.push("/");
      } catch(err){
        console.log(err);
        setError(true);
      }
  }

  return(<div> {id} </div>)
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  params: {
    id: string;
  };
};

type Book = {
  title: string;
  desc: string;
  price: number | null;
  cover: string;
}

export default function BookUpdate({ params }: Props) {
  const router = useRouter();
  const bookId = params.id;

  const [book, setBook] = useState<Book>({
    title: "",
    desc: "",
    price: null,
    cover: ""
  })

  const [error, setError] = useState(false);
  const navigate = useRouter();

  return(<div> {bookId} </div>)

}

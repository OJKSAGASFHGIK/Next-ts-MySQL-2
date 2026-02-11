"use client";

import axios from "axios";

import { useEffect, useState } from "react";
import Link from "next/link";

import Layout from "./pages/layout/page";

export default function Home() {
  type books = {
    id: number;
    title: string;
    desc: string;
    price: number;
    cover: string;
  }
  const [books, setBooks] = useState<books[]>([]);
  const handleDelete = async(id: number) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`)
      window.location.reload()
    } catch(err){ console.log(err) }
  }

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
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Book Collection
          </h1>
          <p className="text-gray-300 text-lg">Discover amazing books in our collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {books.map((book) => (
            <div 
              key={book.id} 
              className="group bg-gradient-to-br from-gray-800 to-purple-900/30 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-purple-800/50 hover:border-purple-500 transform hover:-translate-y-2 backdrop-blur-sm"
            >
              {/* Card Header */}
              <div className="p-6">
                {/* Book Cover Placeholder */}
                <div className="w-full h-48 mb-6 rounded-xl bg-gradient-to-br from-purple-700 to-indigo-800 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300 shadow-inner">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📚</div>
                    <p className="text-white font-semibold">{book.title.substring(0, 20)}...</p>
                  </div>
                </div>

                {/* Book Details */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-1">
                    {book.title}
                  </h2>
                  
                  <p className="text-gray-300 line-clamp-3 h-[72px]">
                    {book.desc}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-purple-800/50">
                    <div>
                      <span className="text-sm text-gray-400">Price</span>
                      <p className="text-2xl font-bold text-purple-400">${book.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            className="w-4 h-4 text-yellow-400" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 pt-2 bg-gradient-to-r from-gray-800/50 to-purple-900/30">
                <div className="flex space-x-3">
                  <Link 
                    href={`/pages/update/${book.id}`}
                    className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 text-white font-semibold text-center hover:from-emerald-700 hover:to-green-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
                  >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Update</span>
                  </Link>
                  
                  <button 
                    onClick={() => handleDelete(book.id)}
                    className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-700 text-white font-semibold hover:from-red-700 hover:to-pink-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
                  >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Book Button */}
        <div className="mt-12 text-center">
          <Link 
            href="/pages/add"
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-800 text-white font-bold text-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl group"
          >
            <svg className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            Add New Book
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);
}

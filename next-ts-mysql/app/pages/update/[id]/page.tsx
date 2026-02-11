"use client";

import axios from "axios";
import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Layout from "../../layout/page";

type Book = {
  title: string;
  desc: string;
  price: number | null;
  cover: string;
}

export default function BookUpdate( props: {params: Promise<{ id: string }>;} ){
  const { id } = use(props.params);

  const [book, setBook] = useState<Book>({
        title: "",
        desc: "",
        price: null,
        cover: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook((prev) => ({ 
      ...prev, 
      [name]: name === "price" ? (value === "" ? null : Number(value)) : value 
    }));
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

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl">
          {/* Card Container */}
          <div className="bg-gradient-to-br from-gray-800 to-purple-900/30 rounded-3xl shadow-3xl overflow-hidden border border-purple-800/50 backdrop-blur-sm">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-8 text-center">
              <h1 className="text-4xl font-bold text-white mb-2">Update the Book</h1>
              <p className="text-purple-300">Modify the details to update this book in your collection</p>
            </div>

            {/* Form */}
            <div className="p-8 md:p-10">
              <div className="space-y-6">
                {/* Title Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Book Title
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Book title"
                    name="title"
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-purple-800/50 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-900/50 transition-all duration-300 hover:border-purple-600"
                  />
                </div>

                {/* Description Textarea */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Book Description
                    </span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Book description"
                    name="desc"
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-purple-800/50 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-900/50 transition-all duration-300 hover:border-purple-600 resize-none"
                  />
                </div>

                {/* Price Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Book Price ($)
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      $
                    </div>
                    <input
                      type="number"
                      placeholder="Book price"
                      name="price"
                      onChange={handleChange}
                      className="w-full pl-10 pr-5 py-4 rounded-xl border-2 border-purple-800/50 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-900/50 transition-all duration-300 hover:border-purple-600"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-800/50">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-300 font-medium">Something went wrong! Please try again.</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={handleClick}
                    className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-800 text-white font-bold text-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group"
                  >
                    <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Update Book</span>
                  </button>

                  <Link 
                    href="/"
                    className="flex-1 px-8 py-4 rounded-xl border-2 border-purple-700 text-purple-300 font-bold text-lg hover:bg-purple-900/30 hover:text-white transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-3"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Cancel</span>
                  </Link>
                </div>
              </div>

              {/* Form Footer */}
              <div className="mt-8 pt-6 border-t border-purple-800/50">
                <p className="text-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Update the book details and save changes to reflect in your collection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

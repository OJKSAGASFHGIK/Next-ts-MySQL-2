"use client";   
import axios from "axios";
import { useState } from "react"
import { useRouter } from "next/navigation";

import Layout from "../layout/page";

import Link from "next/link";

export default function add(){
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ""
    });

    // console.log(book); // to verify handleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setBook((prev) => ({ 
        ...prev, 
        [name]: name === "price" ? (value === "" ? null : Number(value)) : value 
      }));
    };

    const navigate = useRouter();
    const handleClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        try {
            await axios.post("http://localhost:8800/books", book)
            navigate.push("/");
        } catch(err){ console.log(err) }
    }
    return (
  <Layout>
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        {/* Card Container */}
        <div className="bg-gradient-to-br from-gray-800 to-purple-900/30 rounded-3xl shadow-3xl overflow-hidden border border-purple-800/50 backdrop-blur-sm">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Add New Book</h1>
            <p className="text-purple-300">Fill in the details to add a book to your collection</p>
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
                  name="title" 
                  type="text" 
                  onChange={handleChange} 
                  placeholder="Enter book title"
                  className="w-full px-5 py-4 rounded-xl border-2 border-purple-800/50 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-900/50 transition-all duration-300 hover:border-purple-600"
                />
              </div>

              {/* Description Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Description
                  </span>
                </label>
                <textarea 
                  rows={5}
                  placeholder="Book desc"
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
                    Price ($)
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    $
                  </div>
                  <input 
                    name="price" 
                    type="number" 
                    onChange={handleChange} 
                    placeholder="0.00"
                    className="w-full pl-10 pr-5 py-4 rounded-xl border-2 border-purple-800/50 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-900/50 transition-all duration-300 hover:border-purple-600"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={handleClick}
                  className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-800 text-white font-bold text-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group"
                >
                  <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Book</span>
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
                All fields are required. Your book will be added to the collection immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)
}
import Link from "next/link"

export default function navbar(){
    return (
    <nav className="bg-[#FF2400] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tight hover:text-gray-200 transition duration-300 transform hover:scale-105"
          >
            Home
          </Link>
          
          {/* <div className="hidden md:flex space-x-8">
            <Link 
              href="/about" 
              className="font-medium hover:text-gray-200 transition duration-300 hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="font-medium hover:text-gray-200 transition duration-300 hover:underline underline-offset-4"
            >
              Services
            </Link>
            <Link 
              href="/contact" 
              className="font-medium hover:text-gray-200 transition duration-300 hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </div> */}
          
          <button className="md:hidden focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

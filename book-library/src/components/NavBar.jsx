import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-primary">Books Library</h1>

      {/* Hamburger Icon (Mobile Only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-700 focus:outline-none text-2xl"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <Link to="/browse" className="hover:text-primary">
              Browse
            </Link>
          </li>
          <li>
            <Link to="/my-books" className="hover:text-primary">
              My Books
            </Link>
          </li>
        </ul>

        <div className="flex gap-3">
          <button className="bg-primary text-white px-3 py-1 rounded hover:bg-blue-900">
            Login
          </button>
          <button className="bg-accent text-black px-3 py-1 rounded hover:bg-yellow-500">
            Sign Up
          </button>
        </div>
      </div>

      {/* Mobile Menu (Animated Slide Down) */}
      <div
        className={`absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 
        transition-all duration-300 ease-in-out 
        ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        } md:hidden`}
      >
        <Link
          to="/"
          className="hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/browse"
          className="hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          Browse
        </Link>
        <Link
          to="/my-books"
          className="hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          My Books
        </Link>

        <button className="bg-primary text-white px-3 py-1 rounded hover:bg-blue-900">
          Login
        </button>
        <button className="bg-accent text-black px-3 py-1 rounded hover:bg-yellow-500">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

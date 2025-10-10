import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import MyBooks from "./pages/MyBooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Details from "./pages/Details";
import BookSearchResult from "./pages/BookSearchResult";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/books" element={<BookSearchResult />} />
      </Routes>
    </Router>
  );
}

export default App;

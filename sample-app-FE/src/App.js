import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import AddBookPage from "./Pages/AddBookPage";
import EditBookPage from "./Pages/EditBookPage";
import ViewBookPage from "./Pages/ViewBookPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddBookPage />} />
        <Route path="/edit/:id" element={<EditBookPage />} />
        <Route path="/view/:id" element={<ViewBookPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}


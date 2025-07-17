import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Headers from "./components/Headers";
import Home from "./components/Home";
import CartDetails from "./components/CartDetails";
import Sucess from "./components/Sucess";
import Cancell from "./components/Cancell";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register"; // Assuming you have a Register component
import { Toaster } from "react-hot-toast";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // Check if user is logged in by verifying localStorage
  const isLoggedIn = localStorage.getItem("idToken");

  return (
    <>
      <Headers />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <CartDetails /> : <Navigate to="/login" />}
        />
        <Route path="/sucess" element={<Sucess />} />
        <Route path="/cancel" element={<Cancell />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

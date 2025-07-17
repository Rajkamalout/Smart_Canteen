import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { toast, Toaster } from "react-hot-toast";
import "./header.css";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Headers = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { carts } = useSelector((state) => state.allCart);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("idToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      setUser(null);
      navigate("/login");
      toast.success("User logged out successfully!");
    } catch (error) {
      console.error("Error signing out:", error.message);
      toast.error("Failed to log out.");
    }
  };

  const cartHandler = () => {
    if (carts.length === 0) {
      toast.error("Your Cart is empty");
    } else {
      navigate("/cart");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="header">
      <div className="header-content">
        <a href="/" className="brand-link">
          <h3 className="brand-title">Smart Canteen</h3>
        </a>

        <div className="user-section">
          {user ? (
            <>
              <FaShoppingCart className="cart" onClick={cartHandler} />
              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <button className="login-btn" onClick={handleLogin}>
              Log In
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </nav>
  );
};

export default Headers;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"; // Assuming you have styles for Register
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const firebaseApiKey = "AIzaSyCp4cYa6QJIIcMqlFPd28Uuh06UvjM4Z_o"; // Replace with your Firebase API key

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      const { idToken, localId, email: userEmail } = response.data;

      // Store tokens securely in localStorage
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("userId", localId);
      localStorage.setItem("userEmail", userEmail);
      toast.success("Registration successful!");
      navigate('/login')
    

      // Reset form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.response?.data?.error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="login-link">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-text">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

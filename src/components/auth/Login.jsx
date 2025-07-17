import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth/cordova";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { app } from "../firebase"; // Import your firebase initialization file
import { toast, Toaster } from "react-hot-toast"; // Import React Hot Toast
import "./Login.css"; // Assuming you have styles for Login

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // To navigate after successful login

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const auth = getAuth(app); // Initialize Firebase Auth

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store user data (idToken and other info if needed)
      localStorage.setItem("idToken", user.accessToken); // Use the access token
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("userEmail", user.email);

      toast.success("Login successful!"); // Success Toast

      navigate("/"); // Redirect to the dashboard or any page after login
    } catch (err) {
      setError(err.message || "An error occurred during login");
      toast.error(err.message || "An error occurred during login"); // Error Toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
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
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="register-link">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="register-text">
              Register
            </Link>
          </p>
        </div>
      </div>
      {/* Toast container will render the toast messages */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Login;

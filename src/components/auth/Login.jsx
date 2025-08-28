import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase"; // Import your firebase initialization file
import { toast, Toaster } from "react-hot-toast"; // Import React Hot Toast
import "./Login.css"; // Assuming you have styles for Login
import { Eye, EyeOff } from "lucide-react"; // Eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // NEW
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

      // Store user data
      localStorage.setItem("idToken", user.accessToken);
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("userEmail", user.email);

      toast.success("Login successful!");

      navigate("/"); // Redirect after login
    } catch (err) {
      setError(err.message || "An error occurred during login");
      toast.error(err.message || "An error occurred during login");
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

          <div className="input-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Login;

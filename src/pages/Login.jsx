import React, { useState } from "react";
import { login } from "../../services";
import "./Login.css"; // Import the CSS file for styling
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    alert("Already logged in");
    navigate("/home");
  }
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(loginFormData);
    if (res.status === 200) {
      localStorage.setItem("token", res.token);
      alert("Logged in successfully");
      navigate("/home");
    } else {
      console.log(res);
      alert("Error");
    }
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="form-section">
        <h2 className="title">Already have an account?</h2>
        <p className="subtitle">Your personal job finder is here</p>
        <form onSubmit={handleLogin} className="form">
          <input
            type="email"
            onChange={(e) =>
              setLoginFormData({
                ...loginFormData,
                [e.target.name]: e.target.value,
              })
            }
            value={loginFormData.email}
            name="email"
            placeholder="Email"
            className="input"
          />
          <input
            type="password"
            onChange={(e) =>
              setLoginFormData({
                ...loginFormData,
                [e.target.name]: e.target.value,
              })
            }
            value={loginFormData.password}
            name="password"
            placeholder="Password"
            className="input"
          />
          <button type="submit" className="btn">
            Sign in
          </button>
        </form>
        <p className="footer">
          Don’t have an account?{" "}
          <NavLink to="/register" className="link">
            Sign Up
          </NavLink>
        </p>
      </div>

      {/* Right Section */}
      <div className="image-section">
        <div className="image-content">
          <h2>Your Personal Job Finder</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;

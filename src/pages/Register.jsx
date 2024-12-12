import React, { useState } from "react";
import { register } from "../../services";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await register(formData);
    if (res.status === 200) {
      alert("Registered successfully");
      navigate("/login");
    } else {
      console.log(res);
      alert("Error");
    }
  };

  return (
    <div className="register-container">
      <div className="form-section">
        <h2 className="title">Create an account</h2>
        <p className="subtitle">Your personal job finder is here</p>
        <form onSubmit={handleRegister} className="form">
          <input
            type="text"
            value={formData.name}
            name="name"
            placeholder="Name"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="input"
          />
          <input
            type="text"
            value={formData.email}
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="input"
          />
          <input
            type="text"
            value={formData.mobile}
            name="mobile"
            placeholder="Mobile"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="input"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="input"
          />
          <div className="checkbox-container">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="checkbox-label">
              By creating an account, I agree to the terms of use and privacy
              policy.
            </label>
          </div>
          <button type="submit" className="btn">
            Create Account
          </button>
        </form>
        <p className="footer">
          Already have an account?{" "}
          <NavLink to="/login" className="link">
            Sign In
          </NavLink>
        </p>
      </div>

      <div className="image-sectionn">
        <div className="image-content">
          <h2>Your Personal Job Finder</h2>
        </div>
      </div>
    </div>
  );
};

export default Register;

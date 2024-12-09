import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      HomePage
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Sign Up</button>
    </div>
  );
};

export default MainPage;

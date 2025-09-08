import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Items from "./pages/Items";
import Cart from "./pages/Cart";
import { auth as authService } from "./services/api";

function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const handleLogin = async (payload) => {
    const res = await authService.login(payload);
    localStorage.setItem("token", res.token);
    setUser(res.user);
    navigate("/");
  };

  const handleSignup = async (payload) => {
    const res = await authService.signup(payload);
    localStorage.setItem("token", res.token);
    setUser(res.user);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="container">
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Items user={user} />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;

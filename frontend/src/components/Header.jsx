import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="brand"><Link to="/">MyStore</Link></div>
      <nav className="nav">
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <>
            <span className="user-name">{user.name}</span>
            <button onClick={onLogout} className="btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

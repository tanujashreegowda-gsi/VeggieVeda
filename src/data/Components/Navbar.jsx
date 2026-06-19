import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="logo">🌿 VeggieVeda</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

// This exact line below is what your app was crying out for!
export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="logo">🌿 VeggieVeda</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/admin" style={{ marginLeft: '1.5rem', fontWeight: 'bold', color: '#ffb703' }}>Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
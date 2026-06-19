import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import WebSearch from './pages/WebSearch.jsx';
import Chatbot from './Components/Chatbot.jsx';
import Admin from './pages/Admin.jsx'; 
import '../../style.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Chatbot /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/web-search" element={<WebSearch />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
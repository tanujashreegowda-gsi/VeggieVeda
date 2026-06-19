import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import WebSearch from './pages/WebSearch.jsx'; // 1. Import the new page
import Chatbot from './Components/Chatbot.jsx'; // 2. Import the new Chatbot
import '../../style.css';

function App() {
  return (
    <Router>
      <Navbar />
      
      {/* 3. Drop the Chatbot here so it stays on screen no matter what page you are on! */}
      <Chatbot /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        {/* 4. Add the route for the Web Search landing page */}
        <Route path="/web-search" element={<WebSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
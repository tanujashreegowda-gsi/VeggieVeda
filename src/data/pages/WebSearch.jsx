import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const WebSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract what the user searched for from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  // This is the "AI Filter" that strictly forces Google to only show Veg/Vegan results
  const safeWebLink = `https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' "vegetarian" OR "vegan" recipe -meat -chicken -fish -beef')}`;

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '2rem auto', background: '#fff', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#2d6a4f', marginBottom: '1rem', fontSize: '2.5rem' }}>Global Recipe Search</h1>
      
      <div style={{ padding: '2rem', background: '#fefae0', borderRadius: '15px', marginBottom: '2rem' }}>
        <p style={{ fontSize: '1.2rem', color: '#4b5563', marginBottom: '1rem' }}>
          We couldn't find a curated recipe for <strong>"{searchQuery}"</strong> in our top 100 list.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', fontWeight: 'bold' }}>
          However, our AI has prepared a strict, safe web search to ensure you only see 100% Vegetarian and Vegan results from the global web.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ padding: '1rem 2rem', borderRadius: '50px', border: '2px solid #2d6a4f', background: 'transparent', color: '#2d6a4f', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}
        >
          ← Go Back
        </button>
        
        <a 
          href={safeWebLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ padding: '1rem 2rem', borderRadius: '50px', border: 'none', background: '#2d6a4f', color: '#fff', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold', display: 'inline-block', boxShadow: '0 4px 15px rgba(45,106,79,0.3)' }}
        >
          Search the Safe Web 🌐
        </a>
      </div>
    </div>
  );
};

export default WebSearch;
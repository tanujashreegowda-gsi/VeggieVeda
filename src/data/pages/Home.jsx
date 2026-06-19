import React, { useState } from 'react';
import { recipes } from '../recipes.js'; 
import RecipeCard from '../Components/RecipeCard.jsx'; 

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [diet, setDiet] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const cuisines = ['All', ...new Set(recipes.map(r => r.c))].sort();
  const diets = ['All', ...new Set(recipes.map(r => r.d))].sort();

  const filteredRecipes = recipes.filter(r => {
    const matchesSearch = r.t.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.en.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = cuisine === 'All' || r.c === cuisine;
    const matchesDiet = diet === 'All' || r.d === diet;
    return matchesSearch && matchesCuisine && matchesDiet;
  });

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedRecipes = filteredRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
  const handleCuisine = (e) => { setCuisine(e.target.value); setCurrentPage(1); };
  const handleDiet = (e) => { setDiet(e.target.value); setCurrentPage(1); };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div id="homePage">
      <header className="hero" style={{ background: '#2d6a4f', color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '800' }}>Welcome to VeggieVeda</h1>
        
        {/* AUTHOR BADGE WITH PHOTO */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <img 
            src="/profile.jpg" 
            alt="R. Govinda Krishnan" 
            onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Govinda+Krishnan&background=fff&color=2d6a4f&size=50"; }}
            style={{ 
              width: '50px', 
              height: '50px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '2px solid #fff'
            }} 
          />
          <p style={{ fontSize: '1.1rem', margin: '0' }}>
            100 authentic vegetarian recipes, curated by <strong>R. Govinda Krishnan</strong>.
          </p>
        </div>
        
        <div style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <input 
              type="text" 
              placeholder="Search by recipe name or ingredients..." 
              value={searchTerm}
              onChange={handleSearch}
              style={{ flex: '2', minWidth: '250px', height: '55px', margin: '0', padding: '0 1.5rem', borderRadius: '50px', border: 'none', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', boxSizing: 'border-box', outline: 'none', verticalAlign: 'middle' }}
            />
            <select value={cuisine} onChange={handleCuisine} style={{ flex: '1', minWidth: '150px', height: '55px', margin: '0', padding: '0 1.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#1b1b1b', backgroundColor: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', boxSizing: 'border-box', outline: 'none', verticalAlign: 'middle' }}>
                {cuisines.map(c => <option key={c} value={c}>{c === 'All' ? 'All Cuisines' : c}</option>)}
            </select>
            <select value={diet} onChange={handleDiet} style={{ flex: '1', minWidth: '150px', height: '55px', margin: '0', padding: '0 1.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#1b1b1b', backgroundColor: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', boxSizing: 'border-box', outline: 'none', verticalAlign: 'middle' }}>
                {diets.map(d => <option key={d} value={d}>{d === 'All' ? 'All Diets' : d}</option>)}
            </select>
        </div>
      </header>
      
      <main style={{ padding: '3rem 2rem', maxWidth: '1300px', margin: '0 auto' }}>
        <h3 style={{ marginBottom: '2rem', color: '#2d6a4f', textAlign: 'center' }}>
          Showing {displayedRecipes.length} of {filteredRecipes.length} recipes
        </h3>

        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {displayedRecipes.length > 0 ? (
              displayedRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', fontSize: '1.2rem', color: '#6b7280' }}>
                No recipes found matching your filters.
              </div>
            )}
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.8rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #2d6a4f', background: currentPage === 1 ? '#e5e7eb' : '#fff', color: currentPage === 1 ? '#9ca3af' : '#2d6a4f', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>Prev</button>
            {pageNumbers.map(number => (
              <button key={number} onClick={() => setCurrentPage(number)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: currentPage === number ? '#2d6a4f' : '#f3f4f6', color: currentPage === number ? '#fff' : '#1b1b1b', cursor: 'pointer', fontWeight: 'bold', boxShadow: currentPage === number ? '0 4px 10px rgba(45,106,79,0.3)' : 'none', transition: 'background 0.3s' }}>{number}</button>
            ))}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #2d6a4f', background: currentPage === totalPages ? '#e5e7eb' : '#fff', color: currentPage === totalPages ? '#9ca3af' : '#2d6a4f', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>Next</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
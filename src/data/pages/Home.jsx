import React, { useState } from 'react';
import { recipes } from '../recipes.js'; 
import RecipeCard from '../Components/RecipeCard.jsx';
const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [diet, setDiet] = useState('All');

  // Automatically extract unique cuisines and diets from your data
  const cuisines = ['All', ...new Set(recipes.map(r => r.c))].sort();
  const diets = ['All', ...new Set(recipes.map(r => r.d))].sort();

  // Filter logic
  const filteredRecipes = recipes.filter(r => {
    const matchesSearch = r.t.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.en.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = cuisine === 'All' || r.c === cuisine;
    const matchesDiet = diet === 'All' || r.d === diet;
    
    return matchesSearch && matchesCuisine && matchesDiet;
  });

  // Limit to 9 items (3 grid lines) IF no filters are active
  const isFiltering = searchTerm !== '' || cuisine !== 'All' || diet !== 'All';
  const displayedRecipes = isFiltering ? filteredRecipes : filteredRecipes.slice(0, 9);

  return (
    <div id="homePage">
      <header className="hero" style={{ background: '#2d6a4f', color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to VeggieVeda</h1>
        <p>100 authentic vegetarian recipes, curated by R. Govinda Krishnan.</p>
        
        {/* Search and Filters Section */}
        <div style={{ maxWidth: '650px', margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Search by recipe name or ingredients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '1rem 1.5rem', borderRadius: '50px', border: 'none', width: '100%', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
            />
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <select value={cuisine} onChange={e => setCuisine(e.target.value)} style={{ padding: '0.8rem 1.5rem', borderRadius: '25px', border: 'none', cursor: 'pointer', flex: 1, fontSize: '1rem', color: '#1b1b1b' }}>
                    {cuisines.map(c => <option key={c} value={c}>{c === 'All' ? 'All Cuisines' : c}</option>)}
                </select>
                
                <select value={diet} onChange={e => setDiet(e.target.value)} style={{ padding: '0.8rem 1.5rem', borderRadius: '25px', border: 'none', cursor: 'pointer', flex: 1, fontSize: '1rem', color: '#1b1b1b' }}>
                    {diets.map(d => <option key={d} value={d}>{d === 'All' ? 'All Diets' : d}</option>)}
                </select>
            </div>
        </div>
      </header>
      
      <main style={{ padding: '3rem 2rem', maxWidth: '1300px', margin: '0 auto' }}>
        {/* Header showing results count */}
        {isFiltering && (
            <h3 style={{ marginBottom: '2rem', color: '#2d6a4f' }}>Found {filteredRecipes.length} recipes</h3>
        )}

        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
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
      </main>
    </div>
  );
};

export default Home;
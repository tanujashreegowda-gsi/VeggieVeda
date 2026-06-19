import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipes } from '../recipes';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find(r => r.id === parseInt(id));

  if (!recipe) return <div style={{padding: '4rem', textAlign: 'center'}}>Recipe not found!</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.2rem' }}>← Back</button>
      <h2>{recipe.t}</h2>
      <p style={{ color: '#2d6a4f', fontWeight: 'bold' }}>{recipe.c} • {recipe.d}</p>
      <img src={recipe.img} alt={recipe.t} style={{ width: '100%', borderRadius: '15px', marginTop: '1rem', marginBottom: '1rem' }} />
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{recipe.en}</p>
      {recipe.yt && (
        <a href={recipe.yt} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '1rem', color: '#fff', background: '#e62117', padding: '0.5rem 1rem', borderRadius: '5px', textDecoration: 'none' }}>
          ▶ Watch on YouTube
        </a>
      )}
    </div>
  );
};

export default RecipeDetail;
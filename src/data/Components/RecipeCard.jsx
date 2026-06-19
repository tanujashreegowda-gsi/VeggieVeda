import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="card" 
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      style={{ 
        background: '#fff', 
        borderRadius: '20px', 
        overflow: 'hidden', 
        boxShadow: '0 10px 20px rgba(0,0,0,0.08)', 
        cursor: 'pointer', 
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <img src={recipe.img} alt={recipe.t} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
      <div className="card-body" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.3rem', color: '#2d6a4f', fontSize: '1.4rem' }}>{recipe.t}</h3>
        
        {/* Diet and Cuisine Tags */}
        <p style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 'bold', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {recipe.c} • {recipe.d}
        </p>

        {/* 2-Line Truncated Description */}
        <p style={{ 
            fontSize: '1rem', 
            color: '#4b5563', 
            lineHeight: '1.5',
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden' 
        }}>
          {recipe.en}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const [translatedText, setTranslatedText] = useState(recipe.en);
  
  // We use a "cache" to remember translations so we don't ask the API twice for the same language
  const [cache, setCache] = useState({ en: recipe.en });

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ta', label: 'TA' },
    { code: 'te', label: 'TE' },
    { code: 'hi', label: 'HI' },
    { code: 'kn', label: 'KN' }
  ];

  const handleAskAI = (e) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('ask-ai', { detail: recipe.t }));
  };

  const handleLangClick = async (e, code) => {
    e.stopPropagation(); 
    setLang(code);

    // If we already translated this, pull it from our temporary memory
    if (cache[code]) {
      setTranslatedText(cache[code]);
      return;
    }

    // Show a loading state
    setTranslatedText("Translating...");

    try {
      // Call the free MyMemory Translation API
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(recipe.en)}&langpair=en|${code}`);
      const data = await response.json();

      if (data.responseData && data.responseData.translatedText) {
        setTranslatedText(data.responseData.translatedText);
        setCache(prev => ({ ...prev, [code]: data.responseData.translatedText }));
      } else {
        setTranslatedText(recipe.en); // Fallback to English if it fails
      }
    } catch (error) {
      console.error("Translation Error:", error);
      setTranslatedText(recipe.en);
    }
  };

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
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <img src={recipe.img} alt={recipe.t} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
      <div className="card-body" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '0.3rem', color: '#2d6a4f', fontSize: '1.4rem' }}>{recipe.t}</h3>
        
        <p style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 'bold', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {recipe.c} • {recipe.d}
        </p>

        {/* LANGUAGE TABS */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
          {languages.map(l => (
            <button
              key={l.code}
              onClick={(e) => handleLangClick(e, l.code)}
              style={{
                padding: '0.2rem 0.5rem',
                fontSize: '0.75rem',
                borderRadius: '6px',
                border: lang === l.code ? 'none' : '1px solid #d1d5db',
                background: lang === l.code ? '#2d6a4f' : '#f3f4f6',
                color: lang === l.code ? '#fff' : '#4b5563',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Dynamic Translated Text */}
        <p style={{ 
            fontSize: '1rem', 
            color: '#4b5563', 
            lineHeight: '1.5',
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden',
            marginBottom: '1.5rem'
        }}>
          {translatedText}
        </p>

        <div style={{ marginTop: 'auto' }}>
            <button 
              onClick={handleAskAI}
              style={{
                width: '100%',
                padding: '0.8rem',
                background: '#e8f5e9',
                color: '#2d6a4f',
                border: '1px solid #52b788',
                borderRadius: '50px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.3s',
                fontSize: '0.95rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#d8f3dc'}
              onMouseOut={(e) => e.currentTarget.style.background = '#e8f5e9'}
            >
              ✨ Ask AI about this
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipes } from '../recipes.js';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find(r => r.id === parseInt(id));

  const [lang, setLang] = useState('en');
  const [translatedText, setTranslatedText] = useState(recipe ? recipe.en : '');
  const [cache, setCache] = useState({ en: recipe ? recipe.en : '' });

  if (!recipe) return <div style={{padding: '4rem', textAlign: 'center'}}>Recipe not found!</div>;

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' }
  ];

  const handleLangClick = async (code) => {
    setLang(code);

    if (cache[code]) {
      setTranslatedText(cache[code]);
      return;
    }

    setTranslatedText("Translating please wait...");

    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(recipe.en)}&langpair=en|${code}`);
      const data = await response.json();

      if (data.responseData && data.responseData.translatedText) {
        setTranslatedText(data.responseData.translatedText);
        setCache(prev => ({ ...prev, [code]: data.responseData.translatedText }));
      } else {
        setTranslatedText(recipe.en);
      }
    } catch (error) {
      console.error("Translation Error:", error);
      setTranslatedText(recipe.en);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.2rem', color: '#4b5563', fontWeight: 'bold' }}>← Back</button>
      
      <h2 style={{ fontSize: '2.5rem', color: '#1b1b1b', marginBottom: '0.5rem' }}>{recipe.t}</h2>
      <p style={{ color: '#2d6a4f', fontWeight: 'bold', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{recipe.c} • {recipe.d}</p>
      
      <img src={recipe.img} alt={recipe.t} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '15px', marginTop: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
      
      {/* Detail Page Language Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {languages.map(l => (
          <button
            key={l.code}
            onClick={() => handleLangClick(l.code)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '50px',
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

      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#4b5563' }}>{translatedText}</p>
      
      {recipe.yt && (
        <div style={{ marginTop: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
            <a href={recipe.yt} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', background: '#e62117', padding: '0.8rem 1.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(230, 33, 23, 0.3)' }}>
            ▶ Watch Video Tutorial on YouTube
            </a>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
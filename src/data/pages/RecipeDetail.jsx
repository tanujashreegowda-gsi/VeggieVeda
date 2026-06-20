import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipes as baseRecipes } from '../recipes.js';
import { supabase } from '../supabaseClient.js'; // <-- Added Database Connection

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id);

  // 1. Setup states
  const [recipe, setRecipe] = useState(() => baseRecipes.find(r => r.id === recipeId) || null);
  const [isLoading, setIsLoading] = useState(!recipe);
  
  const [isLiked, setIsLiked] = useState(() => localStorage.getItem(`like_${recipeId}`) === 'true');
  const [showShareToast, setShowShareToast] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(`comments_${recipeId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [lang, setLang] = useState('en');
  const [translatedText, setTranslatedText] = useState('');
  const [cache, setCache] = useState({});

  // 2. Fetch from cloud if it is a new recipe (ID > 1000)
  useEffect(() => {
    const fetchCloudRecipe = async () => {
      if (!recipe) {
        // Remove the 1000 offset to find the real Supabase ID
        const dbId = recipeId - 1000;
        const { data, error } = await supabase.from('recipes').select('*').eq('id', dbId).single();
        
        if (data) {
          const cloudRecipe = { ...data, id: data.id + 1000 };
          setRecipe(cloudRecipe);
          setTranslatedText(cloudRecipe.en);
          setCache({ en: cloudRecipe.en });
        }
        setIsLoading(false);
      } else {
        setTranslatedText(recipe.en);
        setCache({ en: recipe.en });
      }
    };
    fetchCloudRecipe();
  }, [recipeId, recipe]);

  if (isLoading) return <div style={{padding: '4rem', textAlign: 'center', fontSize: '1.2rem', color: '#2d6a4f'}}>Loading Recipe...</div>;
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

  const handleToggleLike = () => {
    const nextState = !isLiked;
    setIsLiked(nextState);
    localStorage.setItem(`like_${recipeId}`, String(nextState));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment = {
      name: commentName.trim(),
      text: commentText.trim(),
      date: new Date().toLocaleDateString()
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments_${recipeId}`, JSON.stringify(updatedComments));

    setCommentName('');
    setCommentText('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.2rem', color: '#4b5563', fontWeight: 'bold' }}>← Back</button>
      
      <h2 style={{ fontSize: '2.5rem', color: '#1b1b1b', marginBottom: '0.5rem' }}>{recipe.t}</h2>
      <p style={{ color: '#2d6a4f', fontWeight: 'bold', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{recipe.c} • {recipe.d}</p>
      
      <img src={recipe.img} alt={recipe.t} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '15px', marginTop: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
        <button onClick={handleToggleLike} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.6rem 1.2rem', borderRadius: '50px', border: 'none', background: isLiked ? '#ffe5ec' : '#f3f4f6', color: isLiked ? '#ff0054' : '#4b5563', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>
          {isLiked ? '❤️ Liked' : '🤍 Like'}
        </button>

        <button onClick={handleShare} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.6rem 1.2rem', borderRadius: '50px', border: 'none', background: '#e0f2fe', color: '#0284c7', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>
          🔗 Share Recipe
        </button>

        {showShareToast && (
          <span style={{ fontSize: '0.9rem', color: '#0284c7', fontWeight: 'bold' }}>
            ✨ Link copied to clipboard!
          </span>
        )}
      </div>

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

      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#4b5563', marginBottom: '2.5rem', whiteSpace: 'pre-wrap' }}>{translatedText}</p>
      
      {recipe.yt && (
        <div style={{ marginTop: '2rem', marginBottom: '3rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
            <a href={recipe.yt} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', background: '#e62117', padding: '0.8rem 1.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(230, 33, 23, 0.3)' }}>
            ▶ Watch Video Tutorial on YouTube
            </a>
        </div>
      )}

      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
        <h3 style={{ color: '#2d6a4f', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Visitor Discussion ({comments.length})</h3>
        
        <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={commentName} 
              onChange={(e) => setCommentName(e.target.value)} 
              required 
              style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', width: '200px' }} 
            />
          </div>
          <textarea 
            placeholder="Share your thoughts or variations on this recipe..." 
            value={commentText} 
            onChange={(e) => setCommentText(e.target.value)} 
            required 
            rows="3" 
            style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', resize: 'vertical' }}
          ></textarea>
          <button type="submit" style={{ alignSelf: 'flex-start', padding: '0.7rem 1.5rem', background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(45,106,79,0.2)' }}>
            Post Comment
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {comments.length > 0 ? (
            comments.map((c, index) => (
              <div key={index} style={{ background: '#f9fafb', padding: '1.2rem', borderRadius: '15px', borderLeft: '4px solid #52b788' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <strong style={{ color: '#1b1b1b' }}>{c.name}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{c.date}</span>
                </div>
                <p style={{ color: '#4b5563', margin: 0, fontSize: '1rem', lineHeight: '1.5' }}>{c.text}</p>
              </div>
            ))
          ) : (
            <p style={{ color: '#9ca3af', fontStyle: 'italic', textAlign: 'center' }}>No comments yet. Be the first to share your cooking experience!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
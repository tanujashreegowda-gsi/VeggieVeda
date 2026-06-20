import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient.js'; // <-- This connects to your new database!

const Admin = () => {
  const navigate = useNavigate();
  
  // Security State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Recipe Form State
  const [title, setTitle] = useState('');
  const [cuisine, setCuisine] = useState('South Indian');
  const [diet, setDiet] = useState('Hindu Traditional');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [youtube, setYoutube] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Check if already logged in during this session
  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'veggie123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Access denied.');
      setPasswordInput('');
    }
  };

  // Handle Recipe Submission (NOW CONNECTED TO SUPABASE CLOUD)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill in the title and description fields.");
      return;
    }

    const newRecipe = {
      t: title,
      c: cuisine,
      d: diet,
      en: description,
      img: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500',
      yt: youtube
    };

    // SEND TO SUPABASE CLOUD
    const { error } = await supabase
      .from('recipes')
      .insert([newRecipe]);

    if (error) {
      console.error("Error saving recipe:", error.message);
      alert("Failed to save recipe to cloud database. Check the console.");
      return;
    }

    setSuccessMsg('✨ Recipe successfully saved to Cloud Database!');
    setTitle('');
    setDescription('');
    setImage('');
    setYoutube('');

    setTimeout(() => {
      setSuccessMsg('');
      navigate('/');
    }, 2000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  // 1. SHOW LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: '400px', margin: '5rem auto', padding: '2.5rem', background: '#fff', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
        <h2 style={{ color: '#2d6a4f', marginBottom: '0.5rem' }}>Admin Access</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Please enter the password to continue.</p>
        
        {authError && (
          <div style={{ color: '#e63946', background: '#ffe5ec', padding: '0.8rem', borderRadius: '10px', marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
            {authError}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="password" 
            placeholder="Enter Password..." 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            style={{ padding: '1rem', borderRadius: '50px', border: '1px solid #d1d5db', outline: 'none', textAlign: 'center', fontSize: '1.1rem' }}
          />
          <button type="submit" style={{ padding: '1rem', background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(45,106,79,0.3)' }}>
            Enter
          </button>
        </form>
      </div>
    );
  }

  // 2. SHOW DASHBOARD IF AUTHENTICATED
  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '2.5rem', background: '#fff', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', position: 'relative' }}>
      
      <button onClick={handleLogout} style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#e63946', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>
        Logout
      </button>

      <h2 style={{ color: '#2d6a4f', marginBottom: '1.5rem', textAlign: 'center' }}>Add New Recipe Form</h2>
      
      {successMsg && (
        <div style={{ background: '#d8f3dc', color: '#2d6a4f', padding: '1rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 'bold' }}>
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem', color: '#4b5563' }}>Recipe Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g., Mysore Bonda" />
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem', color: '#4b5563' }}>Cuisine Category</label>
            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', backgroundColor: '#fff', boxSizing: 'border-box' }}>
              <option value="South Indian">South Indian</option>
              <option value="North Indian">North Indian</option>
              <option value="Thai">Thai</option>
              <option value="Burmese">Burmese</option>
              <option value="Chinese">Chinese</option>
              <option value="Continental">Continental</option>
            </select>
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem', color: '#4b5563' }}>Diet Type</label>
            <select value={diet} onChange={(e) => setDiet(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', backgroundColor: '#fff', boxSizing: 'border-box' }}>
              <option value="Hindu Traditional">Hindu Traditional</option>
              <option value="Vegan">Vegan</option>
              <option value="Jain">Jain</option>
              <option value="Other Vegetarian">Other Vegetarian</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem', color: '#4b5563' }}>Instructions & Description *</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} placeholder="Provide detailed cooking steps..."></textarea>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem', color: '#4b5563' }}>Cover Image URL (Optional)</label>
          <input type="url" value={image} onChange={(e) => setImage(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', boxSizing: 'border-box' }} placeholder="https://example.com/image.jpg" />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem', color: '#4b5563' }}>YouTube Link URL (Optional)</label>
          <input type="url" value={youtube} onChange={(e) => setYoutube(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', boxSizing: 'border-box' }} placeholder="https://youtu.be/..." />
        </div>

        <button type="submit" style={{ width: '100%', padding: '1rem', background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(45,106,79,0.3)', marginTop: '0.5rem' }}>
          🚀 Publish to Cloud Database
        </button>
      </form>
    </div>
  );
};

export default Admin;
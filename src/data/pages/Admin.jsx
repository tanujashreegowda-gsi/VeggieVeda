import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [cuisine, setCuisine] = useState('South Indian');
  const [diet, setDiet] = useState('Hindu Traditional');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [youtube, setYoutube] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill in the title and description fields.");
      return;
    }

    const local = localStorage.getItem('custom_recipes');
    const customRecipes = local ? JSON.parse(local) : [];
    const newId = 101 + customRecipes.length;

    const newRecipe = {
      id: newId,
      t: title,
      c: cuisine,
      d: diet,
      en: description,
      img: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500',
      yt: youtube
    };

    customRecipes.push(newRecipe);
    localStorage.setItem('custom_recipes', JSON.stringify(customRecipes));

    setSuccessMsg('✨ Recipe successfully added to VeggieVeda!');
    setTitle('');
    setDescription('');
    setImage('');
    setYoutube('');

    setTimeout(() => {
      setSuccessMsg('');
      navigate('/');
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '2.5rem', background: '#fff', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#2d6a4f', marginBottom: '1.5rem', textAlign: 'center' }}>Add New Recipe Form</h2>
      
      {successMsg && (
        <div style={{ background: '#d8f3dc', color: '#2d6a4f', padding: '1rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 'bold' }}>
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem', color: '#4b5563' }}>Recipe Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none' }} placeholder="e.g., Mysore Bonda" />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem', color: '#4b5563' }}>Cuisine Category</label>
            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', backgroundColor: '#fff' }}>
              <option value="South Indian">South Indian</option>
              <option value="North Indian">North Indian</option>
              <option value="Thai">Thai</option>
              <option value="Burmese">Burmese</option>
              <option value="Chinese">Chinese</option>
              <option value="Continental">Continental</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem', color: '#4b5563' }}>Diet Type</label>
            <select value={diet} onChange={(e) => setDiet(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', backgroundColor: '#fff' }}>
              <option value="Hindu Traditional">Hindu Traditional</option>
              <option value="Vegan">Vegan</option>
              <option value="Jain">Jain</option>
              <option value="Other Vegetarian">Other Vegetarian</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem', color: '#4b5563' }}>Instructions & Description *</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', resize: 'vertical' }} placeholder="Provide detailed cooking steps..."></textarea>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem', color: '#4b5563' }}>Cover Image URL (Optional)</label>
          <input type="url" value={image} onChange={(e) => setImage(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none' }} placeholder="https://example.com/image.jpg" />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.4rem', color: '#4b5563' }}>YouTube Link URL (Optional)</label>
          <input type="url" value={youtube} onChange={(e) => setYoutube(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none' }} placeholder="https://youtu.be/..." />
        </div>

        <button type="submit" style={{ width: '100%', padding: '1rem', background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(45,106,79,0.3)', marginTop: '0.5rem' }}>
          🚀 Publish New Recipe
        </button>
      </form>
    </div>
  );
};

export default Admin;
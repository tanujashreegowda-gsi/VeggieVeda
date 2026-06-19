import React from 'react';

const About = () => {
  return (
    <section className="about-page" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '2rem auto', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <div className="about-content" style={{ textAlign: 'center' }}>
        
        {/* PROFILE PICTURE */}
        <img 
          src="/profile.jpg" 
          alt="R. Govinda Krishnan" 
          onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Govinda+Krishnan&background=2d6a4f&color=fff&size=150"; }}
          style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            objectFit: 'cover', 
            marginBottom: '1.5rem',
            border: '4px solid #d8f3dc',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }} 
        />

        <h1 style={{ color: '#2d6a4f', marginBottom: '1.5rem' }}>About VeggieVeda</h1>
        
        <div style={{ textAlign: 'left', fontSize: '1.1rem', color: '#4b5563', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1rem' }}>Namaste, I am R. Govinda Krishnan.</p>
          <p style={{ marginBottom: '1rem' }}>As an IT Accounting professional and Brahmin priest, I bridge the gap between technical precision and spiritual tradition. My journey is rooted in the belief that food is not just sustenance, but a sacred offering.</p>
          <p style={{ marginBottom: '1rem' }}>The saying <em style={{ color: '#2d6a4f', fontWeight: 'bold' }}>"Brahmanam Bhojana Priyam"</em> (The Brahmin loves food) drives my passion. I have curated these 100 recipes to ensure that vegetarianism is not just a diet, but a vibrant, flavorful lifestyle that anyone can adopt.</p>
          <p style={{ marginBottom: '1rem' }}>Whether it is the traditional South Indian Sambar or the vibrant flavors of Thai and Burmese cuisine, VeggieVeda is my attempt to bring global plant-based wisdom to your kitchen.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
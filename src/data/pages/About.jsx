import React from 'react';

const About = () => {
  return (
    <section className="about-page" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '2rem auto', background: '#fff', borderRadius: '20px' }}>
      <div className="about-content">
        <h1 style={{ color: '#2d6a4f', marginBottom: '1.5rem' }}>About VeggieVeda</h1>
        <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Namaste, I am R. Govinda Krishnan.</p>
        <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>As an IT Accounting professional and Brahmin priest, I bridge the gap between technical precision and spiritual tradition. My journey is rooted in the belief that food is not just sustenance, but a sacred offering.</p>
        <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>The saying <em>"Brahmanam Bhojana Priyam"</em> (The Brahmin loves food) drives my passion. I have curated these 100 recipes to ensure that vegetarianism is not just a diet, but a vibrant, flavorful lifestyle that anyone can adopt.</p>
        <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Whether it is the traditional South Indian Sambar or the vibrant flavors of Thai and Burmese cuisine, VeggieVeda is my attempt to bring global plant-based wisdom to your kitchen.</p>
      </div>
    </section>
  );
};

export default About;
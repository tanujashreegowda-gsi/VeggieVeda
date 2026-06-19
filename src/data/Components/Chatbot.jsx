import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipes } from '../recipes.js';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Namaste! 🌱 I am your VeggieVeda AI. What dish are you craving?' }
  ]);
  
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Listen for clicks from the Recipe Cards!
  useEffect(() => {
    const handleCardClick = (e) => {
      setIsOpen(true);
      const recipeName = e.detail;
      handleSend(`Help me with the ingredients and method for ${recipeName}`, true);
    };
    window.addEventListener('ask-ai', handleCardClick);
    return () => window.removeEventListener('ask-ai', handleCardClick);
  }, []);

  const handleSend = (overrideText = null, isFromCard = false) => {
    const userText = overrideText || input.trim();
    if (!userText) return;
    
    const cleanText = userText.toLowerCase().replace(/[.!?,]/g, '').trim();
    
    // 1. Add user message to screen
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    if (!overrideText) setInput('');

    // 2. THE NON-VEG GUARDRAIL
    const nonVegKeywords = ['chicken', 'meat', 'beef', 'pork', 'fish', 'seafood', 'egg', 'mutton', 'lamb', 'bacon', 'ham'];
    const hasNonVeg = nonVegKeywords.some(kw => cleanText.includes(kw));
    
    if (hasNonVeg) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `This Site will not enable me to search for your recipe as I can assist you only with Vegetarian/Vegan recipe.`
        }]);
      }, 500);
      return; // Stop processing instantly
    }

    // 3. Greeting Interceptor
    const greetings = ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening', 'hola'];
    if (greetings.includes(cleanText)) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `Hello there! 👋 How can I assist you today? You can ask me for a specific dish, an ingredient, or a type of cuisine!`
        }]);
      }, 500);
      return;
    }

    // 4. Simulated AI Search Logic
    setTimeout(() => {
      const searchTerms = cleanText.split(' ');
      const matches = recipes.filter(r => 
        searchTerms.some(term => term.length > 2 && (r.t.toLowerCase().includes(term) || r.c.toLowerCase().includes(term)))
      );

      if (matches.length > 0 && !isFromCard) {
        // FOUND IN TOP 100
        const topMatch = matches[0];
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `I found a perfect match! Here is a quick summary:\n\n${topMatch.en}`,
          recipeId: topMatch.id,
          recipeTitle: topMatch.t
        }]);
      } else {
        // NOT IN TOP 100 (OR CAME FROM CARD) -> SIMULATE WEB SEARCH IN CHAT
        const dishName = isFromCard ? userText.replace('Help me with the ingredients and method for ', '') : userText;
        
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `🔍 Searching the web for 100% vegetarian instructions for "${dishName}"...` 
        }]);

        // Simulate a delay for "web searching"
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            sender: 'bot', 
            text: `Here is what I found for ${dishName}:\n\n**Common Ingredients:**\n• Vegetables/Main base\n• Spices (Cumin, Coriander, Turmeric)\n• Oil/Ghee\n• Salt to taste\n\n**Basic Method:**\n1. Prep and chop all ingredients.\n2. Heat oil/ghee and add whole spices.\n3. Sauté aromatics (ginger, green chilies).\n4. Add main ingredients and ground spices.\n5. Cook until tender and garnish with fresh herbs.\n\nFor exact measurements and video tutorials, click below!`,
            webSearchQuery: dishName
          }]);
        }, 1500);
      }
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '60px', height: '60px', borderRadius: '50%', background: '#2d6a4f', color: '#fff', border: 'none', fontSize: '1.8rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {isOpen ? '✕' : '✨'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{ position: 'fixed', bottom: '5.5rem', right: '2rem', width: '350px', height: '500px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', zIndex: 9998, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          
          <div style={{ background: '#2d6a4f', color: '#fff', padding: '1rem', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center' }}>
            VeggieVeda AI
          </div>

          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: '#fefae0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                <div style={{ background: msg.sender === 'user' ? '#2d6a4f' : '#fff', color: msg.sender === 'user' ? '#fff' : '#1b1b1b', padding: '0.8rem 1rem', borderRadius: '15px', borderBottomRightRadius: msg.sender === 'user' ? '0' : '15px', borderBottomLeftRadius: msg.sender === 'bot' ? '0' : '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
                  {msg.text}
                </div>
                
                {msg.recipeId && (
                  <button onClick={() => { navigate(`/recipe/${msg.recipeId}`); setIsOpen(false); }} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', background: '#52b788', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem', width: '100%', fontWeight: 'bold' }}>
                    View Full Recipe 🍲
                  </button>
                )}

                {msg.webSearchQuery && (
                  <button onClick={() => { navigate(`/web-search?q=${encodeURIComponent(msg.webSearchQuery)}`); setIsOpen(false); }} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', background: '#e63946', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem', width: '100%', fontWeight: 'bold' }}>
                    Search Web Safely 🌐
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '1rem', background: '#fff', display: 'flex', gap: '0.5rem', borderTop: '1px solid #e5e7eb' }}>
            <input 
              type="text" 
              placeholder="Ask for a recipe..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{ flex: 1, padding: '0.8rem', borderRadius: '20px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem' }}
            />
            <button onClick={() => handleSend()} style={{ background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
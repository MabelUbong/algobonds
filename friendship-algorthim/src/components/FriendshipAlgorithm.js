// Update src/components/FriendshipAlgorithm.js
import React, { useState, useEffect } from 'react';
import '../styles/FriendshipAlgorithm.css';

function FriendshipAlgorithm() {
  // Initialize state from localStorage or empty array if nothing saved
  const [relationships, setRelationships] = useState(() => {
    const savedRelationships = localStorage.getItem('friendshipAlgorithmData');
    return savedRelationships ? JSON.parse(savedRelationships) : [];
  });
  
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    closeness: '',
    experiences: '',
    reciprocity: '',
    growth: ''
  });

  // Save to localStorage whenever relationships change
  useEffect(() => {
    localStorage.setItem('friendshipAlgorithmData', JSON.stringify(relationships));
  }, [relationships]);

  // Calculate friendship score based on criteria
  const calculateScore = (data) => {
    // Convert string inputs to numbers and handle empty values
    const time = parseFloat(data.time) || 0;
    const closeness = parseFloat(data.closeness) || 0;
    const experiences = parseFloat(data.experiences) || 0;
    const reciprocity = parseFloat(data.reciprocity) || 0;
    const growth = parseFloat(data.growth) || 0;
    
    // Calculate weighted score
    const score = (
      time * 0.3 +
      closeness * 0.25 +
      experiences * 0.2 +
      reciprocity * 0.15 +
      growth * 0.1
    ).toFixed(2);
    
    return score;
  };

  // Determine emoji based on score
  const getEmoji = (score) => {
    if (score >= 8) return "💖"; // Best friend
    if (score >= 6) return "😊"; // Close friend
    if (score >= 4) return "🤝"; // Good friend
    return "💬"; // Acquaintance
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Add a new relationship
  const handleAddRelationship = () => {
    // Validate that at least name is provided
    if (!formData.name.trim()) {
      alert("Please enter a name for this relationship");
      return;
    }
    
    // Calculate score
    const score = calculateScore(formData);
    
    // Create new relationship object
    const newRelationship = {
      ...formData,
      score,
      emoji: getEmoji(score)
    };
    
    // Add to relationships list
    setRelationships([...relationships, newRelationship]);
    
    // Reset form
    setFormData({
      name: '',
      time: '',
      closeness: '',
      experiences: '',
      reciprocity: '',
      growth: ''
    });
  };

  // Handle delete relationship
  const handleDeleteRelationship = (index) => {
    const updatedRelationships = [...relationships];
    updatedRelationships.splice(index, 1);
    setRelationships(updatedRelationships);
  };

  return (
    <div className="friendship-algorithm">
      <header className="app-header">
        <h1>🌟 Friendship Algorithm 🌟</h1>
        <p>Improve the relationships you already have</p>
      </header>
      
      <section className="form-section">
        <h2>Add a Relationship</h2>
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Friend's name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="time">Time Spent Together (0-10)</label>
          <input
            type="number"
            id="time"
            name="time"
            min="0"
            max="10"
            value={formData.time}
            onChange={handleInputChange}
            placeholder="Rate from 0-10"
          />
          <small>How much quality time do you spend together?</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="closeness">Emotional Closeness (0-10)</label>
          <input
            type="number"
            id="closeness"
            name="closeness"
            min="0"
            max="10"
            value={formData.closeness}
            onChange={handleInputChange}
            placeholder="Rate from 0-10"
          />
          <small>How comfortable are you sharing personal feelings?</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="experiences">Shared Experiences (0-10)</label>
          <input
            type="number"
            id="experiences"
            name="experiences"
            min="0"
            max="10"
            value={formData.experiences}
            onChange={handleInputChange}
            placeholder="Rate from 0-10"
          />
          <small>How many meaningful experiences have you shared?</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="reciprocity">Reciprocity (0-10)</label>
          <input
            type="number"
            id="reciprocity"
            name="reciprocity"
            min="0"
            max="10"
            value={formData.reciprocity}
            onChange={handleInputChange}
            placeholder="Rate from 0-10"
          />
          <small>How balanced is the give and take in this relationship?</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="growth">Personal Growth (0-10)</label>
          <input
            type="number"
            id="growth"
            name="growth"
            min="0"
            max="10"
            value={formData.growth}
            onChange={handleInputChange}
            placeholder="Rate from 0-10"
          />
          <small>How much does this relationship help you grow as a person?</small>
        </div>
        
        <button className="add-button" onClick={handleAddRelationship}>
          Add Relationship
        </button>
      </section>
      
      <section className="relationships-section">
        <h2>Your Relationships</h2>
        
        {relationships.length === 0 ? (
          <p className="no-relationships">No relationships added yet. Start by adding your first relationship above!</p>
        ) : (
          <div className="relationship-cards">
            {relationships.map((relationship, index) => (
              <div className="relationship-card" key={index}>
                <div className="card-header">
                  <span className="emoji">{relationship.emoji}</span>
                  <h3>{relationship.name}</h3>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDeleteRelationship(index)}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="card-content">
                  <p className="score">Friendship Score: <span>{relationship.score}/10</span></p>
                  
                  <div className="metrics">
                    <div className="metric">
                      <span className="metric-label">Time:</span>
                      <span className="metric-value">{relationship.time}/10</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Closeness:</span>
                      <span className="metric-value">{relationship.closeness}/10</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Experiences:</span>
                      <span className="metric-value">{relationship.experiences}/10</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Reciprocity:</span>
                      <span className="metric-value">{relationship.reciprocity}/10</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Growth:</span>
                      <span className="metric-value">{relationship.growth}/10</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default FriendshipAlgorithm;
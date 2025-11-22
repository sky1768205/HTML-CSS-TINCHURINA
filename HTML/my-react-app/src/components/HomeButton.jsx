// src/components/HomeButton.jsx
import React, { useState } from 'react';
import './HomeButton.css';

const HomeButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="home-button-container">
      <button
        className="home-button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        На главную
      </button>

      {isHovered && (
        <div className="lantern">
          <img src="/images/фонарь.png" alt="Фонарь" />
        </div>
      )}
    </div>
  );
};

export default HomeButton;
// src/components/HomeButton.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router'; // ← добавьте этот импорт
import './HomeButton.css';

const HomeButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // ← хук для программной навигации

  const handleClick = () => {
    navigate('/'); // → переходим на главную страницу
  };

  return (
    <div className="home-button-container">
      <button
        className="home-button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick} // ← добавьте обработчик клика
        aria-label="Вернуться на главную страницу"
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
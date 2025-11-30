// src/components/AnimalCircle.jsx

import React, { useState } from 'react';
import AnimalModal from './AnimalModal'; // Импортируем модальное окно

const AnimalCircle = ({ imageSrc, title, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="animal-circle-container">
      <button
        className="animal-circle"
        onClick={openModal}
        aria-label={`Показать описание ${title}`}
      >
        <img src={imageSrc} alt={title} className="animal-image" />
      </button>

      {/* Модальное окно */}
      <AnimalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        description={description}
      />
    </div>
  );
};

export default AnimalCircle;
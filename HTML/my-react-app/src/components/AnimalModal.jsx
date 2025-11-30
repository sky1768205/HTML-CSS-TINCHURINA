// src/components/AnimalModal.jsx

import React from 'react';

const AnimalModal = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="animal-modal-overlay" onClick={onClose}>
      <div className="animal-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="animal-modal-title">{title}</h2>
        <p className="animal-modal-description">{description}</p>
        <button className="animal-modal-close" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default AnimalModal;
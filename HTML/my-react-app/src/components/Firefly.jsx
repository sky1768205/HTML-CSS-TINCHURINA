// src/components/Firefly.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Firefly = ({ delay, duration }) => {
  // Генерируем случайные координаты при монтировании компонента
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Генерируем случайные координаты от 0 до 100% ширины и высоты окна
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    setPosition({ x: randomX, y: randomY });
  }, []);

  return (
    <motion.div
      className="firefly"
      style={{
        position: 'absolute',
        top: `${position.y}%`,
        left: `${position.x}%`,
        transform: 'translate(-50%, -50%)', // Центрируем светлячка по его координатам
      }}
      initial={{ opacity: 0 }}
      animate={{
        x: [0, Math.random() * 20 - 10, 0], // Лёгкое колебание влево-вправо
        y: [0, Math.random() * 20 - 10, 0], // Лёгкое колебание вверх-вниз
        opacity: [0, 1, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: duration || 3,
        delay: delay || 0,
        ease: "easeInOut",
      }}
    />
  );
};

export default Firefly;
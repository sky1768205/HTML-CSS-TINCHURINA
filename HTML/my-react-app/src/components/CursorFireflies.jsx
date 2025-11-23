// src/components/CursorFireflies.jsx
import React, { useEffect, useRef, useState } from 'react';
import './CursorFireflies.css';

const CursorFireflies = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const fireflyRefs = useRef([]);

  // Отслеживаем положение курсора
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Генерируем 5-7 светлячков
  const fireflies = Array.from({ length: 1 }, (_, i) => (
    <div
      key={i}
      className="firefly"
      ref={(el) => (fireflyRefs.current[i] = el)}
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
      }}
    />
  ));

  // Анимация светлячков — они плавно двигаются к курсору
  useEffect(() => {
    const animateFireflies = () => {
      fireflyRefs.current.forEach((firefly, index) => {
        if (!firefly) return;

        // Чем дальше индекс, тем больше задержка
        const delay = index * 20; // Задержка в миллисекундах

        setTimeout(() => {
          // Легкое смещение для "живости"
          const offsetX = Math.random() * 9 - 2;
          const offsetY = Math.random() * 3 - 2;

          firefly.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }, delay);
      });

      requestAnimationFrame(animateFireflies);
    };

    animateFireflies();
  }, [cursorPosition]);

  return <div className="cursor-fireflies">{fireflies}</div>;
};

export default CursorFireflies;
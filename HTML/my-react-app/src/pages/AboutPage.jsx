// src/pages/AboutPage.jsx

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Firefly from '../components/Firefly';
import './AboutPage.css';
import CursorFireflies from '../components/CursorFireflies';
import HomeButton from '../components/HomeButton';
import AnimalCircle from '../components/AnimalCircle';
const AboutPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const ravenVariants = {
    initial: { x: -100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10,
      },
    },
  };

  // Анимация для блоков информации
  const blockVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
    hover: { // Анимация при наведении
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <div className="about-page">
      {/* Фоновое изображение с параллаксом */}
      <div
        className="background-image"
        style={{
          
        }}
      >
        <img src="/images/фон4.png" alt="Лес" />
      </div>

      {/* Анимированные светлячки */}
      <div className="fireflies">
        {[...Array(15)].map((_, i) => (
          <Firefly key={i} delay={i * 0.3} duration={2 + Math.random()} />
        ))}
      </div>

      {/* Ворон */}
      <motion.div
        className="raven"
        animate={{
          y: [0, -10, 0, 10, 0],
          rotate: [0, 2, -2, 0],
          x: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <img src="/images/вороненокб.png" alt="Ворон" />
      </motion.div>

      {/* Основной контент */}
      {/* Основной контент — с эффектом свечения при наведении */}
<motion.div
  ref={ref}
  className="content-container"
  variants={containerVariants}
  initial="hidden"
  animate={controls}
  whileHover={{
    textShadow: '0 0 20px rgba(255, 215, 0, 0.8)', // золотое свечение
    scale: 1.01,
    transition: { duration: 0.3, ease: "easeOut" }
  }}
>
  <motion.h1
    variants={itemVariants}
    style={{ margin: 0 }}
  >
    О НАС
  </motion.h1>
  <motion.p variants={itemVariants}>
    Добро пожаловать в нашу кофейню, где скандинавская мифология оживает в каждой чашке.
  </motion.p>
  <motion.p variants={itemVariants}>
    Мы создаем уникальную атмосферу, вдохновленную легендами Севера.
  </motion.p>
</motion.div>

      {/* Растушевка и темный фон */}
      <div className="fade-to-dark">
        {/* Блоки информации с анимацией */}
        <div className="info-blocks">
          <motion.div
            className="info-block"
            variants={blockVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover" // Анимация при наведении
            viewport={{ once: true }} // Анимация срабатывает только один раз
          >
            <h2>Наша история</h2>
            <p>Мы начали свой путь с маленькой кофейни в сердце города, вдохновленные легендами Севера.</p>
          </motion.div>

          <motion.div
            className="info-block"
            variants={blockVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover" // Анимация при наведении
            viewport={{ once: true }}
            transition={{ delay: 0.2 }} // Задержка для второго блока
          >
            <h2>Наши напитки</h2>
            <p>Каждый напиток — это маленький шедевр, который вы можете попробовать только у нас.</p>
          </motion.div>

          <motion.div
            className="info-block"
            variants={blockVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover" // Анимация при наведении
            viewport={{ once: true }}
            transition={{ delay: 0.4 }} // Задержка для третьего блока
          >
            <h2>Наши гости</h2>
            <p>Мы гордимся тем, что наши гости приходят к нам не просто за кофе, а за атмосферой.</p>
          </motion.div>
        </div>
        {/* Светлячки, следующие за курсором */}
<CursorFireflies />

        <div className="animal-circles-wrapper">

  <AnimalCircle
    imageSrc="/images/котик.png" // замените на путь к вашей первой картинке
    title="Таинственный Кот Ди"
    description="Этот кот — создатель волшебного сайта. Он спрятал на главной странице загадочную анимацию, выстроил страницу продуктов с точностью древнего рунного круга и соткал множество других заклинаний кода — только для тех, кто верит, что за каждым пикселем может скрываться магия."
  />
  <AnimalCircle
    imageSrc="/images/пантерка.png" // замените на путь ко второй картинке
    title="Лесной Хранитель Катя"
    description="Стоит лишь вызвать её имя — и она явится: создаст страницу «О нас» с душой старинной саги, вплетёт в дашборды тонкие узоры функциональности, подберёт стили, будто перелистывая древние скрижали, и отрисует каждый элемент вручную — с заботой, будто вырезает руны по дереву."
  />
  <AnimalCircle
    imageSrc="/images/лисичка.png" // замените на путь к третьей картинке
    title="Рыжий Мечтатель Кристина"
    description="Она не боится сложностей — ведь сама родилась из заката, где сходятся логика и вдохновение. Её бэкенд — как уютный костёр в глубине леса: надёжный, тёплый, держит всё в равновесии. Она вплела в дашборды тонкие нити данных, помогала другим жителям найти свой путь в коде, и создала множество мелких чудес: чек, кнопки, будто выточенные из янтаря, и иконки, мерцающие, как искры в ночи."
  />
</div>
        {/* Кнопка "На главную" с фонарем */}
        <HomeButton />
      </div>
    </div>
  );
};

export default AboutPage;
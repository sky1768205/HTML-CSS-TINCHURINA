import React, { useState, useEffect, useRef } from 'react';

export default function Footer() {
    const [offset, setOffset] = useState(0);
    const animationRef = useRef(null);

    useEffect(() => {
        const amplitude = 15; // 15px вверх-вниз
        const duration = 18000; // 18 секунды на полный цикл

        const animate = (time) => {
            // Плавное колебание с помощью синуса по вертикали
            const progress = (time % duration) / duration;
            const newOffset = Math.sin(progress * Math.PI * 2) * amplitude;
            setOffset(newOffset);

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <footer className="text-white p-8 relative overflow-hidden">
            {/* Анимационный слой */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Еле заметное свечение */}
                <div
                    className="absolute bottom-8 left-8 rounded-full bg-[#f2bd728d] bg-opacity-5 blur-md"
                    style={{
                        transform: `translateY(${-offset}px)`,
                        width: '100px',
                        height: '100px',
                        transition: 'transform 0.1s linear'
                    }}
                />

                {/* Герой */}
                <div
                    className="absolute bottom-8 left-8 z-20"
                    style={{
                        transform: `translateY(${-offset}px)`,
                        transition: 'transform 0.1s linear'
                    }}
                >
                    <img
                        src="/images/explorer-with-lantern.png"
                        alt="Исследователь с фонарём"
                        className="w-30 h-30"
                    />
                </div>
            </div>

            {/* Контент футера */}
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">ODIN'S BREW</h2>
                        <p className="text-gray-300 mb-2">
                            Скандинавский кофе с 2024 года.
                        </p>
                        <p className="text-gray-300">
                            От Вальхаллы к вашему утреннему ритуалу.
                        </p>
                    </div>

                    {/* Menu Section */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">МЕНЮ</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-white transition-colors">Главная</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Наши кофейни</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Меню</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                        </ul>
                    </div>

                    {/* Follow Us Section */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">МЫ В СОЦСЕТЯХ</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-white transition-colors">VK</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Telegram</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                        </ul>
                    </div>

                    {/* Contact Us Section */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">КОНТАКТЫ</h3>
                        <p className="text-gray-300 mb-2">Всегда рады помочь</p>
                        <a href="mailto:info@odinsbrew.ru" className="text-gray-300 hover:text-white transition-colors">
                            info@odinsbrew.ru
                        </a>
                        <p className="text-gray-300 mt-2">+7 (999) 123-45-67</p>
                    </div>
                </div>


            </div>
        </footer>
    );
}
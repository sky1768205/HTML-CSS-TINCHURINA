import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import CoffeUpdates from '../components/CoffeUpdates';

export default function HomePage() {
    const [scrollY, setScrollY] = useState(0);

    const blogPosts = [
        {
            id: 1,
            title: "Мудрость Одина: почему руны появляются в кофейной гуще?",
            excerpt: "В туманных владениях Иггдрасиля знание Всеотца пронизывает каждую чашку кофе.",
            date: "НОЧЬ ПОЛНОЙ ЛУНЫ",
            image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 2,
            title: "Благословение Фрейи: как кофе пробуждает дар ясновидения",
            excerpt: "Богиня Ванов дарует ясность тем, кто пьет из священных зерен.",
            date: "СЕВЕРНОЕ СИЯНИЕ",
            image: "https://images.unsplash.com/photo-1518832553480-c3d1fdbb4b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 3,
            title: "Сила Тора: могущество древних кофейных ритуалов",
            excerpt: "Мощь Мьёльнира течет в жилах тех, кто вкусил громовой напиток.",
            date: "ГРОЗОВАЯ БУРЯ",
            image: "https://images.unsplash.com/photo-1509043759401-136742328bb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen relative">
            {/* Прогресс бар */}
            <div className="fixed top-0 left-0 w-full h-1 bg-[#171717]/30 z-50">
                <div
                    className="h-full bg-liner-to-r from-[#2C4B35] to-[#F8F8F9] transition-all duration-300"
                    style={{ width: `${(scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}
                ></div>
            </div>

            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden min-h-screen flex items-center">
                <div className="container mx-auto px-4 relative z-30">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-[#F8F8F9] mb-6 text-center tracking-widest">
                            ᚨᛚᚠᚺᛖᛁᛗᚱ ᛒᚱᚢᚾᛊᛏ
                        </h1>
                        <h2 className="text-7xl font-light text-[#F8F8F9] mb-8 text-center font-serif tracking-tighter">
                            ODIN'S BREW
                        </h2>
                        <p className="text-xl text-[#F8F8F9] mb-12 text-center leading-relaxed max-w-2xl mx-auto opacity-90">
                            Где древняя нордическая магия встречается со священными кофейными ритуалами. Вкуси мудрость Иггдрасиля в каждой чашке.
                        </p>
                        <div className="text-center">
                            <Link
                                to="/products"
                                className="inline-block bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] px-12 py-6 rounded-lg hover:from-[#1E3525] hover:to-[#2C4B35] transition-all duration-500 font-semibold text-lg border border-[#F8F8F9]/20 hover:border-[#F8F8F9]/40 shadow-2xl transform hover:scale-105"
                            >
                                ВОЙТИ В СВЯЩЕННУЮ РОЩУ
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
                    <div className="text-[#F8F8F9] text-2xl">ᛟ</div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-32 bg-[#171717]/50 backdrop-blur-sm relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-4xl font-bold text-[#F8F8F9] mb-8">
                            Пророчество Священных Зёрен
                        </h3>
                        <p className="text-lg text-[#F8F8F9]/80 mb-8 leading-relaxed">
                            В тени Иггдрасиля, где норны ткут судьбу, Всеотец открыл магию кофейных зерен.
                            Каждое зерно несет в себе мудрость веков и силу молота Тора.
                        </p>
                        <p className="text-lg text-[#F8F8F9]/80 mb-12 leading-relaxed">
                            Руны шепчут тайны тем, кто варит кофе с намерением, открывая пути через девять миров достойным знания Одина.
                        </p>
                        <button className="text-[#2C4B35] font-semibold hover:text-[#1E3525] transition-colors text-lg bg-[#F8F8F9] px-8 py-3 rounded-lg transform hover:scale-105">
                            <Link to="/about">ПРОЧЕСТЬ РУНЫ СУДЬБЫ</Link>
                        </button>
                    </div>
                </div>
            </section>

            {/* Magazine Offer Block */}
            <section className="py-32 bg-[#171717]/60 backdrop-blur-sm relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl font-bold text-[#F8F8F9] mb-6">
                                КУПИ 2 РУНИЧЕСКИХ КРУЖКИ И ПОЛУЧИ СВИТОК ЗНАНИЙ БЕСПЛАТНО
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="text-center lg:text-left">
                                <h4 className="text-lg font-normal text-[#2C4B35] mb-4 tracking-widest">БЛАГОСЛОВЕНИЕ ОДИНА</h4>
                                <h5 className="text-6xl font-bold text-[#F8F8F9] mb-8 leading-tight">
                                    Получи Свою<br />
                                    <span className="text-[#2C4B35]">Руническую Мудрость</span>
                                </h5>
                                <p className="text-xl text-[#F8F8F9]/80 mb-12 leading-relaxed">
                                    Самый священный ритуал приготовления из залов Вальхаллы.<br />
                                    Создан, чтобы пробудить твоего внутреннего бога.
                                </p>
                                <Link
                                    to="/products"
                                    className="inline-block bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] px-16 py-6 rounded-lg font-semibold hover:from-[#1E3525] hover:to-[#2C4B35] transition-all duration-500 text-lg border border-[#2C4B35] hover:border-[#F8F8F9]/20 transform hover:scale-105"
                                >
                                    НАЧАТЬ ПУТЕШЕСТВИЕ
                                </Link>
                            </div>

                            <div className="flex justify-center lg:justify-end">
                                <div className="grid grid-cols-2 gap-6 max-w-md">
                                    <div className="flex flex-col gap-6">
                                        <div className="group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                            <img
                                                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                                alt="Руническая кружка 1"
                                                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                            <img
                                                src="https://images.unsplash.com/photo-1577968897966-030b96db6ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                                alt="Руническая кружка 2"
                                                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        <div className="group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                            <img
                                                src="https://images.unsplash.com/photo-1560769684-55015cee73a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                                alt="Древние свитки"
                                                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Blog Section */}
            <section className="py-32 bg-[#171717]/60 backdrop-blur-sm relative">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-[#F8F8F9] mb-16">
                        СКАНДИНАВСКАЯ МУДРОСТЬ И СВЯЩЕННЫЕ НАПИТКИ
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogPosts.map(post => (
                            <article key={post.id} className="bg-[#2C4B35]/10 rounded-2xl overflow-hidden shadow-2xl border border-[#2C4B35]/20 hover:border-[#2C4B35]/40 transition-all duration-500 transform hover:-translate-y-2">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 to-transparent"></div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-semibold text-[#F8F8F9] mb-4 leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-[#F8F8F9]/80 mb-6 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <span className="text-[#2C4B35] text-sm font-semibold tracking-widest">
                                        {post.date}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-32 bg-[#171717]/60 backdrop-blur-sm relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <CoffeUpdates />
                    </div>
                </div>
            </section>
        </div>
    );
}
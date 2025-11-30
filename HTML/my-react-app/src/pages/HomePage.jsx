import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import CoffeUpdates from '../components/CoffeUpdates';
import BlogSection from '../components/BlogSection';
import CoffeeShopMap from '../components/CoffeShopMap';

export default function HomePage() {
    const [scrollY, setScrollY] = useState(0);



    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen relative">
              <style>
    {`
      @keyframes pulseSaturation {
        0% { filter: saturate(0%); }
        100% { filter: saturate(180%); }
      }
    `}
  </style>
    <div
    style={{
      backgroundImage: 'url(/images/Homeback.jpg)',
      animation: 'pulseSaturation 1.5s ease-in-out infinite alternate',
      filter: 'saturate(100%)'
    }}
    className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
  >
    <div className="absolute inset-0 bg-[#171717]/60"></div>
  </div>


            {/* Прогресс бар */}
            <div className="fixed top-0 left-0 w-full h-1 bg-[#171717]/30 z-50">
                <div
                    className="h-full bg-linear-to-r from-[#2C4B35] to-[#F8F8F9] transition-all duration-300"
                    style={{ width: `${(scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}
                ></div>
            </div>
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden min-h-screen flex items-center">
                <div className="container mx-auto px-4 relative z-30">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-7xl font-light text-[#F8F8F9] mb-8 text-center font-serif tracking-tighter">
                            ODIN'S BREW
                        </h2>
                        <p className="text-xl text-[#F8F8F9] mb-12 text-center leading-relaxed max-w-2xl mx-auto opacity-90">
                            Скандинавский кофе, вдохновленный суровой красотой северных земель.
                            Откройте для себя вкус, достойный воинов и мореплавателей.
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
            </section>

            {/* Story Section */}
            <section className="py-32 bg-[#171717]/50 backdrop-blur-sm relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-4xl font-bold text-[#F8F8F9] mb-8">
                            Скандинавская Кофейная Сага
                        </h3>
                        <p className="text-lg text-[#F8F8F9]/80 mb-8 leading-relaxed">
                            В духе древних скандинавских традиций мы создаем кофе, который пробуждает дух приключений.
                            Каждая чашка — это путешествие по суровым фьордам и тёплым скандинавским домам.
                        </p>
                        <p className="text-lg text-[#F8F8F9]/80 mb-12 leading-relaxed">
                            Наши зерна, отобранные с заботой о качестве, дарят энергию для новых свершений и создают атмосферу
                            уюта в духе северного гостеприимства.
                        </p>
                        <button className="text-[#2C4B35] font-semibold hover:text-[#1E3525] transition-colors text-lg bg-[#F8F8F9] px-8 py-3 rounded-lg transform hover:scale-105">
                            <Link to="/about">САГА О НАС</Link>
                        </button>
                    </div>
                </div>
            </section>

            {/* Magazine Offer Block */}
            <section className="py-32 bg-[#171717]/60 backdrop-blur-sm relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-6xl font-bold text-[#F8F8F9] mb-6">
                                Открой Вкус  <span className="text-[#2C4B35]">Северного Сияния</span>
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="text-center lg:text-left">

                                <p className="text-xl text-[#F8F8F9]/80 mb-12 leading-relaxed">
                                    Эксклюзивные сорта, собранные в тени норвежских фьордов.<br />
                                    Каждое зерно пропитано духом древних саг и свежестью арктического ветра.
                                </p>
                                <p className="text-lg text-[#F8F8F9]/60 mb-8 italic">
                                    "Там, где айсберги встречаются с вулканами, рождается кофе достойный богов"
                                </p>


                                <Link
                                    to="/products"
                                    className="inline-block bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] px-16 py-6 rounded-lg font-semibold hover:from-[#1E3525] hover:to-[#2C4B35] transition-all duration-500 text-lg border border-[#2C4B35] hover:border-[#F8F8F9]/20 transform hover:scale-105"
                                >
                                    ИСПЫТАТЬ ХОЛОД СЕВЕРА
                                </Link>
                            </div>

                            <div className="flex justify-center lg:justify-end">
                                <div className="grid grid-cols-2 gap-6 max-w-md">
                                    <div className="flex flex-col gap-6">
                                        <div className="group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                            <img
                                                src="/images/Пакет1.jpg"
                                                alt="Ледяной эликсир фьордов"
                                                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[#F8F8F9] p-2 text-sm text-center">
                                                "ВИКИНГ ФЬОРД"
                                            </div>
                                        </div>
                                        <div className="group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                            <img
                                                src="/images/Пакет2.jpg"
                                                alt="Утренний туман Вальхаллы"
                                                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[#F8F8F9] p-2 text-sm text-center">
                                                "УТРО ВАЛЬХАЛЛЫ"
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        <div className="group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                            <img
                                                src="/images/пакет3.jpg"
                                                alt="Рунический сбор полярной ночи"
                                                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[#F8F8F9] p-2 text-sm text-center">
                                                "ПОЛЯРНАЯ НОЧЬ"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <BlogSection />

            {/* Newsletter Section */}
            <section className="py-32 bg-[#171717]/60 backdrop-blur-sm relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <CoffeUpdates />

                    </div>

                </div>

            </section>
            <CoffeeShopMap />
        </div>
    );
}
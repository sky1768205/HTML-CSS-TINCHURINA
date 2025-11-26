// components/BlogSection.jsx
import React from 'react';

const BlogSection = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Открытие кофейни 'Оdin's Brew': где боги встречаются с кофе",
            excerpt: "Мы рады объявить о торжественном открытии нашей кофейни в самом сердце города. Каждая чашка здесь - это ритуал, а каждый глоток - путешествие в мир скандинавских легенд.",
            date: "ДЕНЬ ОТКРЫТИЯ",
            image: "/images/OpenCoffe.jpg"
        },
        {
            id: 2,
            title: "Новая коллекция зерен 'Руны Одина': расшифруй свой вкус",
            excerpt: "Представляем 5 уникальных сортов кофе, вдохновленных руническими символами. От нежного 'Ансуз' до мощного 'Турисаз' - найди свой идеальный вкус.",
            date: "НОВИНКА",
            image: "/images/typesofcoffe.jpg"
        },
        {
            id: 3,
            title: "Мастер-класс 'Искусство кофейных рун': читай судьбу в чашке",
            excerpt: "Каждую субботу наши бариста учат искусству гадания на кофейной гуще. Узнай, какие секреты хранит твоя утренняя чашка кофе.",
            date: "МАСТЕР-КЛАСС",
            image: "/images/Изображение.jpg"
        },
    ];

    return (
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
                                    className="w-full h-80 object-cover transform hover:scale-110 transition-transform duration-700"
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
    );
};

export default BlogSection;
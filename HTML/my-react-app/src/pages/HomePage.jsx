import React from 'react';
import { Link } from 'react-router';
import CoffeUpdates from '../components/CoffeUpdates';

export default function HomePage() {
    const blogPosts = [
        {
            id: 1,
            title: "Health Check: why do I get a headache when I haven't had my coffee?",
            excerpt: "It is a paradisomatic country, in which roasted parts of sentences fly into your mouth.",
            date: "OCTOBER 9, 2018",
            image: "/images/IMAGE-17.png"
        },
        {
            id: 2,
            title: "How long does a cup of coffee keep you awake?",
            excerpt: "It is a paradisomatic country, in which roasted parts. Vel qui et ad voluptatem.",
            date: "OCTOBER 9, 2018",
            image: "/images/IMAGE-18.png"
        },
        {
            id: 3,
            title: "Recent research suggests that heavy coffee drinkers may reap health benefits.",
            excerpt: "It is a paradisomatic country, in which roasted parts of sentences fly into your mouth.",
            date: "OCTOBER 9, 2018",
            image: "/images/IMAGE-19.png"
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                        <source src="/video/6248979_Person_People_3840x2160.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold text-white mb-4 text-center drop-shadow-2xl">
                            BEST PLACE TO BUY DESIGN
                        </h1>
                        <h2 className="text-6xl font-light text-white mb-8 text-center drop-shadow-2xl">
                            Coffee Mugs
                        </h2>
                        <p className="text-xl text-white mb-8 text-center leading-relaxed drop-shadow-2xl">
                            The most versatile furniture system ever created. Designed to fit your life, made to move and grow.
                        </p>
                        <div className="text-center">
                            <Link
                                to="/products"
                                className="inline-block bg-white/90 text-coffee-900 px-8 py-4 rounded-lg hover:bg-white transition-colors font-semibold drop-shadow-2xl backdrop-blur-sm"
                            >
                                EXPLORE OUR PRODUCTS
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl font-bold text-coffee-900 mb-6">
                            Even the all-powerful Pointing has no control about the blind texts.
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            It is a paradisomatic country, in which roasted parts of sentences fly into your mouth.<br />
                            Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.
                        </p>
                        <button className="text-coffee-600 font-semibold hover:text-coffee-700 transition-colors underline">
                            <Link to="/about_us">Read the full Story</Link>
                        </button>
                    </div>
                </div>
            </section>

            {/* Magazine Offer Block - Точная копия с фото */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                BUY 2 MUGS AND GET A COFFEE MAGAZINE FREE
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Левая часть - текст */}
                            <div className="text-center lg:text-left">
                                <h4 className="text-lg font-normal text-gray-600 mb-2">PREMIUM OFFER</h4>
                                <h5 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                                    Get our Coffee<br />
                                    Magazine
                                </h5>
                                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                    The most versatile furniture system ever<br />
                                    created. Designed to fit your life.
                                </p>
                                <Link
                                    to="/products"
                                    className="inline-block bg-coffee-600 text-white bg-black px-12 py-4 rounded-lg font-semibold hover:bg-coffee-700 transition-colors text-lg"
                                >
                                    START SHOPPING
                                </Link>
                            </div>

                            {/* Правая часть - сетка из 4 фото */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="grid grid-cols-2 gap-4 max-w-md">
                                    <div className="flex flex-col gap-4">
                                        <img
                                            src="/images/IMAGE-14.png"
                                            alt="Coffee Magazine 1"
                                            className="rounded-2xl shadow-2xl w-full h-32 object-cover"
                                        />
                                        <img
                                            src="images/IMAGE-15.png"
                                            alt="Coffee Magazine 2"
                                            className="rounded-2xl shadow-2xl w-full h-32 object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <img
                                            src="/images/IMAGE-13.png"
                                            alt="Coffee Magazine 3"
                                            className="rounded-2xl w-full h-64 object-cover"
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="photo">
                <img src="images/IMAGE-16.png" />
            </section>

            {/* Blog Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-coffee-900 mb-4">
                        BEHIND THE MUGS, LIFESTYLE STORIES
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {blogPosts.map(post => (
                            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <span className="text-coffee-600 text-sm font-medium">
                                        {post.date}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <CoffeUpdates />
                    </div>
                </div>
            </section>
        </div>
    );
}
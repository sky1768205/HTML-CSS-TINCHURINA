import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import LoadingPage from "./loadingPage"

export default function BlogPage() {
    const [posts, setPosts] = useState([])
    const [scrollProgress, setScrollProgress] = useState(0)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            setScrollProgress(scrollTop / docHeight)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        async function getPosts() {
            setLoading(true);
            const resp = await fetch("http://localhost:3000/api/blog");
            const data = await resp.json();

            if (data.success) {
                setPosts(data.data || []);
            }
            setLoading(false);
        }

        getPosts();
    }, []);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Фон с параллакс эффектом */}
            <div
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center grayscale"
                style={{
                    backgroundImage: 'url(/images/чб.jpg)',
                    transform: `translateY(${scrollProgress * 30}px)`
                }}
            />

            {/* Затемнение фона */}
            <div className="fixed top-0 left-0 w-full h-full bg-[#171717]/40 pointer-events-none" />

            {/* Основной контент */}
            <div className="relative z-10 min-h-screen">
                <div className="p-8">
                    <div className="max-w-6xl mx-auto">

                        {/* Заголовок в стиле книги */}
                        <div className="text-center mb-16 pt-20">
                            <div className="mb-6">
                                <span className="text-[#F8F8F9]/60 text-sm tracking-widest font-light">
                                    СКАНДИНАВСКАЯ МУДРОСТЬ
                                </span>
                            </div>
                            <h1 className="text-6xl font-serif text-[#F8F8F9] mb-4 tracking-tight leading-tight drop-shadow-2xl">
                                ТАИНСТВЕННЫЙ БЛОГ
                            </h1>
                            <div className="w-48 h-0.5 bg-[#2C4B35]/60 mx-auto shadow-lg mb-6"></div>
                            <p className="text-[#F8F8F9]/70 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                                Где боги встречаются с кофе, а каждый пост — это страница древней саги
                            </p>
                        </div>

                        {/* Сетка постов */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-24">

                            {posts.map((post, index) => (
                                <NavLink
                                    key={post.id}
                                    to={`/blog/${post.id}`}
                                    className="block"
                                >
                                    <div className="bg-[#2c463393] backdrop-blur-sm rounded-2xl border border-[#F8F8F9]/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">

                                        {/* Изображение поста */}
                                        <div className="relative overflow-hidden">
                                            <img
                                                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                                                src={`http://localhost:3000/${post.image_url}`}
                                                alt={post.title}
                                                onError={(e) => {
                                                    e.target.src = '/images/placeholder.jpg'
                                                }}
                                            />

                                            {/* Бейдж даты */}
                                            <div className="absolute top-6 left-6 bg-[#2C4B35]/90 text-[#F8F8F9] px-5 py-2 rounded-full text-sm font-medium tracking-wider border border-[#F8F8F9]/30">
                                                {post.date}
                                            </div>

                                            {/* Градиент поверх изображения */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-transparent to-transparent"></div>
                                        </div>

                                        {/* Контент поста */}
                                        <div className="p-8 relative">
                                            {/* Декоративный элемент */}
                                            <div className="absolute top-0 left-8 w-16 h-0.5 bg-[#2C4B35]/40 -translate-y-1"></div>

                                            <h3 className="font-serif text-2xl text-[#F8F8F9] mb-4 leading-tight group-hover:text-[#6c776f] transition-colors duration-300">
                                                {post.title}
                                            </h3>

                                            <p className="text-[#F8F8F9]/80 mb-6 text-base leading-relaxed font-light line-clamp-3 min-h-[4.5rem]">
                                                {post.excerpt}
                                            </p>

                                            {/* Кнопка читать далее */}
                                            <div className="pt-4 border-t border-[#F8F8F9]/20">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[#b6c3bb] font-medium text-sm tracking-wider hover:underline">
                                                        РАСКРЫТЬ САГУ
                                                    </span>
                                                    <span className="text-[#2C4B35] text-lg">→</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </NavLink>
                            ))}

                        </div>




                    </div>
                </div>
            </div>
        </div>
    )
}
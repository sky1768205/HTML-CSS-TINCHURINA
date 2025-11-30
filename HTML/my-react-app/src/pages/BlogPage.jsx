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
        setLoading(true); // включаем загрузку

        const resp = await fetch("http://localhost:3000/api/blog");
        const data = await resp.json();

        if (data.success) {
            setPosts(data.data || []);
        }

        setLoading(false); // выключаем загрузку
        }

        getPosts();
    }, []);

    if (loading) {
        return (
            <LoadingPage />
        );
    }
    


    return (
        <div className="min-h-screen relative overflow-hidden">
            <div
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: 'url(/images/фон-катлог.jpg)',
                    transform: `translateY(${scrollProgress * 30}px)`
                }}
            />

            <div className="fixed top-0 left-0 w-full h-full bg-black/20 pointer-events-none" />

            <div className="relative z-10 min-h-screen">
                <div className="p-8">
                    <div className="max-w-6xl mx-auto">

                        <div className="text-center mb-12 pt-16">
                            <h1 className="text-5xl font-light text-white mb-6 tracking-wide drop-shadow-2xl">
                                Блог
                            </h1>
                            <div className="w-32 h-0.5 bg-white/70 mx-auto shadow-lg"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">

                            {posts.map(post => (
                                <NavLink
                                    key={post.id}
                                    to={`/blog/${post.id}`}
                                >
                                    <div className="bg-white/95 rounded-2xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:translate-y-2 group">

                                        <div className="relative overflow-hidden">
                                            <img
                                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                                src={`http://localhost:3000/${post.image_url}`}
                                                alt={post.title}
                                                onError={(e) => {
                                                    e.target.src = '/images/placeholder.jpg'
                                                }}
                                            />

                                            <div className="absolute top-4 left-4 bg-[#2C4B35]/90 text-white px-4 py-2 rounded-full text-xs font-medium">
                                                {post.date}
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="font-semibold text-gray-800 mb-3 text-xl group-hover:text-[#2C4B35] transition-colors">
                                                {post.title}
                                            </h3>

                                            <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-4 min-h-[4.5rem]">
                                                {post.excerpt}
                                            </p>

                                            <div className="pt-3 border-t border-gray-100 text-right">
                                                <span className="text-[#2C4B35] font-medium text-sm hover:underline">
                                                    Читать далее →
                                                </span>
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

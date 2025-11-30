import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { motion } from "framer-motion"
import LoadingPage from "./loadingPage"

export default function BlogItemPage() {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [loading, setLoading] = useState(true);

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
        async function getPost() {
            try {
                setLoading(true); // включаем загрузку
                const resp = await fetch(`http://localhost:3000/api/blog/${id}`)
                const data = await resp.json()

                if (data.success && data.data) {
                    setPost(data.data)
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading post:', error)
            }
        }

        if (id) getPost()
    }, [id])

    if (loading) {
        return (
            <LoadingPage />
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Фон с параллакс эффектом */}
            <div
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: 'url(/images/фон-катлог.jpg)',
                    transform: `translateY(${scrollProgress * 30}px)`,
                }}
            />

            {/* Затемнение фона */}
            <div className="fixed top-0 left-0 w-full h-full bg-black/20 pointer-events-none" />

            <motion.div
                className="fixed top-1/3 right-8 z-10"
                animate={{
                    y: [0, -15, 0, 15, 0],
                    rotate: [0, 2, -2, 0],
                    x: [0, 8, -8, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            >
                <img
                    src="/images/вороненокб.png"
                    alt="Ворон"
                    className="w-32 h-32 drop-shadow-2xl"
                />
            </motion.div>

            {/* Основной контент */}
            <div className="relative z-10 min-h-screen">
                <div className="p-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Кнопка назад */}
                        <button
                            onClick={() => window.history.back()}
                            className="mb-8 text-white hover:text-gray-200 transition-colors flex items-center gap-2"
                        >
                            <span className="text-xl">←</span>
                            <span>Назад к блогу</span>
                        </button>

                        {/* Карточка поста */}
                        <div className="bg-[#2c463393] backdrop-blur-sm rounded-2xl border border-white/30 overflow-hidden shadow-2xl">
                            <div className="flex flex-col lg:flex-row">
                                {/* Изображение поста */}
                                <div className="lg:w-1/2 p-8">
                                    <div className="relative">
                                        <img
                                            className="w-full h-96 object-cover rounded-xl shadow-lg"
                                            src={`http://localhost:3000/${post.image_url}`}
                                            alt={post.title}
                                            onError={(e) => {
                                                e.target.src = '/images/placeholder.jpg'
                                            }}
                                        />
                                        {/* Бейдж даты */}
                                        <div className="absolute top-4 left-4 bg-[#2C4B35]/90 text-white px-4 py-2 rounded-full text-sm font-medium">
                                            {post.date}
                                        </div>
                                    </div>
                                </div>

                                {/* Информация о посте */}
                                <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                                    <div>
                                        {/* Заголовок */}
                                        <h1 className="text-4xl font-light text-white mb-6">
                                            {post.title}
                                        </h1>

                                        {/* Краткий текст */}
                                        <div className="text-white leading-relaxed text-lg mb-6">
                                            {post.excerpt}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

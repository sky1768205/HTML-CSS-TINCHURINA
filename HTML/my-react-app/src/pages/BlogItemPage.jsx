import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import LoadingPage from "./loadingPage"

export default function BlogItemPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [posts, setPosts] = useState([])
    const [scrollProgress, setScrollProgress] = useState(0)
    const [loading, setLoading] = useState(true)

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
            try {
                const resp = await fetch("http://localhost:3000/api/blog")
                const data = await resp.json()

                if (data.success) {
                    setPosts(data.data || [])
                }
            } catch (error) {
                console.error('Error loading posts:', error)
            }
        }

        getPosts()
    }, [])

    useEffect(() => {
        async function getPost() {
            try {
                setLoading(true)
                const resp = await fetch(`http://localhost:3000/api/blog/${id}`)
                const data = await resp.json()

                if (data.success && data.data) {
                    setPost(data.data)
                }
                setLoading(false)
            } catch (error) {
                console.error('Error loading post:', error)
                setLoading(false)
            }
        }

        if (id) getPost()
    }, [id])

    // Функции для навигации между постами
    const getCurrentPostIndex = () => {
        return posts.findIndex(p => p.id === parseInt(id))
    }

    const getNextPost = () => {
        const currentIndex = getCurrentPostIndex()
        if (currentIndex < posts.length - 1) {
            return posts[currentIndex + 1]
        }
        return null
    }

    const getPrevPost = () => {
        const currentIndex = getCurrentPostIndex()
        if (currentIndex > 0) {
            return posts[currentIndex - 1]
        }
        return null
    }

    const handleNextPost = () => {
        const nextPost = getNextPost()
        if (nextPost) {
            navigate(`/blog/${nextPost.id}`)
        }
    }

    const handlePrevPost = () => {
        const prevPost = getPrevPost()
        if (prevPost) {
            navigate(`/blog/${prevPost.id}`)
        }
    }

    if (loading) {
        return <LoadingPage />
    }

    const nextPost = getNextPost()
    const prevPost = getPrevPost()

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Фон с параллакс эффектом */}
            <div
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center grayscale"
                style={{
                    backgroundImage: 'url(/images/чб.jpg)',
                    transform: `translateY(${scrollProgress * 30}px)`,
                }}
            />

            {/* Затемнение фона */}
            <div className="fixed top-0 left-0 w-full h-full bg-[#171717]/40 pointer-events-none" />

            {/* Основной контент */}
            <div className="relative z-10 min-h-screen font-[Chalkduster]">
                <div className="p-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Кнопка назад */}
                        <button
                            onClick={() => window.history.back()}
                            className="font-[Chalkduster] mb-8 text-[#F8F8F9] hover:text-gray-200 transition-colors flex items-center gap-2"
                        >
                            <span className="text-xl">←</span>
                            <span>Назад к блогу</span>
                        </button>

                        {/* Основная карточка поста */}
                        <div className="bg-[#2c463393] backdrop-blur-sm rounded-3xl border border-[#F8F8F9]/20 overflow-hidden shadow-2xl mb-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Изображение поста */}
                                <div className="relative overflow-hidden">
                                    <img
                                        className="w-full h-96 lg:h-full object-cover"
                                        src={`http://localhost:3000/${post.image_url}`}
                                        alt={post.title}
                                        onError={(e) => {
                                            e.target.src = '/images/placeholder.jpg'
                                        }}
                                    />
                                    {/* Бейдж даты */}
                                    <div className="absolute top-6 left-6 bg-[#2C4B35] text-[#F8F8F9] px-6 py-3 rounded-xl font-bold text-lg">
                                        {post.date}
                                    </div>
                                </div>

                                {/* Информация о посте */}
                                <div className="p-10 flex flex-col justify-center">
                                    <h1 className="text-4xl font-bold text-[#F8F8F9] mb-6 leading-tight">
                                        {post.title}
                                    </h1>
                                    <p className="text-[#F8F8F9]/80 text-lg leading-relaxed mb-8">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 text-[#a7bdad] font-semibold">
                                        <span>Опубликовано в блоге</span>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#F8F8F9]/20">
                            <button
                                onClick={handlePrevPost}
                                disabled={!prevPost}
                                className={`flex items-center gap-2 transition-colors ${prevPost
                                    ? 'text-[#F8F8F9] hover:text-[#2C4B35] cursor-pointer'
                                    : 'text-[#F8F8F9]/30 cursor-not-allowed'
                                    }`}
                            >
                                <span className="text-xl">←</span>
                                <div className="text-left">
                                    <span className="block text-sm text-[#F8F8F9]/60">Предыдущая</span>
                                    <span className="block font-medium">
                                        {prevPost ? prevPost.title : 'Нет предыдущей'}
                                    </span>
                                </div>
                            </button>

                            <button
                                onClick={handleNextPost}
                                disabled={!nextPost}
                                className={`flex items-center gap-2 transition-colors ${nextPost
                                    ? 'text-[#F8F8F9] hover:text-[#2C4B35] cursor-pointer'
                                    : 'text-[#F8F8F9]/30 cursor-not-allowed'
                                    }`}
                            >
                                <div className="text-right">
                                    <span className="block text-sm text-[#F8F8F9]/60">Следующая</span>
                                    <span className="block font-medium">
                                        {nextPost ? nextPost.title : 'Нет следующей'}
                                    </span>
                                </div>
                                <span className="text-xl">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
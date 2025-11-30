import { useEffect, useState, useContext } from "react"
import { NavLink, useParams } from "react-router"
import { CartContext } from "../stores/stores"
import LoadingPage from "./loadingPage"

export default function CategoryPage() {
    const { id } = useParams()
    const [category, setCategory] = useState()
    const [products, setProducts] = useState([])
    const [scrollProgress, setScrollProgress] = useState(0)
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useContext(CartContext)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            setScrollProgress(scrollTop / docHeight)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    function addToCart(product) {
        if (!cart.find(element => element.id === product.id)) {
            setCart([...cart, { ...product, quantity: 1 }])
        }
    }

    useEffect(() => {
        async function getProducts() {
            setLoading(true); // включаем загрузку
            const resp = await fetch('http://localhost:3000/api/products')
            const data = await resp.json()

            if (data.success) {
                if (id) {
                    const filteredProducts = data.data.filter(product => product.category === id)
                    setProducts(filteredProducts)
                    setCategory({ title: id })
                } else {
                    setProducts(data.data || [])
                    setCategory({ title: 'Все продукты' })
                }
            }
            setLoading(false);
        }
        getProducts()
    }, [id])

    if (loading) {
        return (
            <LoadingPage />
        );
    }

    function renderButton(product) {
        const cartItem = cart.find(element => element.id === product.id)

        if (!cartItem) {
            return (
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        addToCart(product)
                    }}
                    className="absolute bottom-4 right-4 bg-[#2C4B35] hover:bg-[#1E3525] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg border border-white/20 z-10">
                    В КОРЗИНУ
                </button>
            )
        } else {
            return (
                <div className="absolute bottom-4 right-4 bg-white/90 text-[#2C4B35] px-4 py-2 rounded-lg text-sm font-medium shadow border z-10">
                    В корзине: {cartItem.quantity}
                </div>
            )
        }
    }

    if (products.length === 0) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <div
                    className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/images/чб.jpg)',
                        transform: `translateY(${scrollProgress * 50}px)`,
                    }}
                />
                <div className="min-h-screen bg-black/40 backdrop-blur-sm relative z-10 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-light text-white mb-4">Продукты не найдены</h1>
                        <p className="text-white/80">В категории "{id}" пока нет продуктов.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: 'url(/images/чб.jpg)',
                    transform: `translateY(${scrollProgress * 30}px)`,
                }}
            />

            <div className="fixed top-0 left-0 w-full h-full bg-black/20 pointer-events-none" />

            <div className="relative z-10 min-h-screen">
                <div className="p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 pt-16">
                            <h1 className="text-5xl font-light text-white mb-6 tracking-wide drop-shadow-2xl">
                                {category.title}
                            </h1>
                            <div className="w-32 h-0.5 bg-white/70 mx-auto shadow-lg"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
                            {products.map(product => (
                                <NavLink key={product.id} to={`/products/${product.id}`}>
                                    <div className="bg-white/95 rounded-2xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:translate-y-2 group">
                                        <div className="relative overflow-hidden">
                                            <img
                                                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                                                src={`http://localhost:3000/${product.image_url}`}
                                                alt={product.name}
                                                onError={(e) => {
                                                    e.target.src = '/images/placeholder.jpg'
                                                }}
                                            />
                                            <div className="absolute top-4 left-4 bg-[#2C4B35]/90 text-white px-4 py-2 rounded-full text-xs font-medium">
                                                {product.category}
                                            </div>
                                            {renderButton(product)}
                                        </div>

                                        <div className="p-6">
                                            <h3 className="font-semibold text-gray-800 mb-3 text-xl group-hover:text-[#2C4B35] transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 min-h-[3.5rem]">
                                                {product.description}
                                            </p>
                                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                                <p className="text-2xl font-light text-[#2C4B35]">
                                                    ${product.price}
                                                </p>
                                                <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
                                                    SKU: {product.id}
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
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { CartContext } from "../stores/stores";
import { motion } from "framer-motion";
import LoadingPage from "./loadingPage";

export default function ProductItemPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [cart, setCart] = useContext(CartContext);
    const [scrollProgress, setScrollProgress] = useState(0)
    const [loading, setLoading] = useState(false);

    const updateCartQuantity = (newQuantity) => {
        if (newQuantity === 0) {
            // Удаляем товар из корзины
            setCart(cart.filter(item => item.id !== product.id));
        } else {
            const existingItem = cart.find(element => element.id === product.id);

            if (existingItem) {
                // Обновляем количество существующего товара
                setCart(cart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                ));
            } else {
                // Добавляем новый товар
                setCart([
                    ...cart,
                    {
                        ...product,
                        quantity: newQuantity
                    }
                ]);
            }
        }
    }

    const handleAdd = () => {
        const currentQuantity = cart.find(item => item.id === product.id)?.quantity || 0;
        updateCartQuantity(currentQuantity + 1);
    }

    const handleRemove = () => {
        const currentQuantity = cart.find(item => item.id === product.id)?.quantity || 0;
        if (currentQuantity > 0) {
            updateCartQuantity(currentQuantity - 1);
        }
    }

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
        async function getProduct() {
            try {
                setLoading(true);
                const resp = await fetch(`http://localhost:3000/api/products/${id}`)
                const data = await resp.json()

                if (data.success && data.data) {
                    setProduct(data.data)
                } else if (Array.isArray(data)) {
                    setProduct(data[0])
                } else {
                    setProduct(data)
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading product:', error)

                const respAll = await fetch('http://localhost:3000/api/products')
                const allData = await respAll.json()
                if (allData.success) {
                    const foundProduct = allData.data.find(p => p.id === parseInt(id))
                    setProduct(foundProduct)
                }
            }
        }

        if (id) {
            getProduct()
        }
    }, [id])

    if (loading || !product) {
        return <LoadingPage />;
    }

    const cartItem = cart.find(element => element.id === product.id);
    const quantity = cartItem?.quantity || 0;

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Фон с параллакс эффектом */}
            <div
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: 'url(/images/чб.jpg)',
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
                            <span>Назад к каталогу</span>
                        </button>

                        {/* Карточка товара */}
                        <div className="bg-[#2c463393] backdrop-blur-sm rounded-2xl border border-white/30 overflow-hidden shadow-2xl">
                            <div className="flex flex-col lg:flex-row">
                                {/* Изображение товара */}
                                <div className="lg:w-1/2 p-8">
                                    <div className="relative">
                                        <img
                                            className="w-full h-96 object-cover rounded-xl shadow-lg"
                                            src={`http://localhost:3000/${product.image_url}`}
                                            alt={product.name}
                                            onError={(e) => {
                                                e.target.src = '/images/placeholder.jpg'
                                            }}
                                        />
                                        {/* Бейдж категории */}
                                        <div className="absolute top-4 left-4 bg-[#2C4B35]/90 text-white px-4 py-2 rounded-full text-sm font-medium">
                                            {product.category}
                                        </div>
                                    </div>
                                </div>

                                {/* Информация о товаре */}
                                <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                                    <div>
                                        {/* Заголовок и цена */}
                                        <div className="mb-6">
                                            <h1 className="text-4xl font-light text-white mb-4">
                                                {product.name}
                                            </h1>
                                            <div className="text-3xl font-light text-white">
                                                ${product.price}
                                            </div>
                                        </div>

                                        {/* Описание */}
                                        <div className="mb-8">
                                            <h3 className="text-lg font-semibold text-white mb-3">Описание</h3>
                                            <p className="text-white leading-relaxed text-lg">
                                                {product.description}
                                            </p>
                                        </div>

                                        {/* Дополнительная информация */}
                                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Категория:</span>
                                                    <p className="text-gray-700 font-medium">{product.category}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Артикул:</span>
                                                    <p className="text-gray-700 font-medium">#{product.id}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        {quantity === 0 ? (
                                            <button
                                                onClick={handleAdd}
                                                className="w-full bg-[#2C4B35] hover:bg-[#1E3525] text-white py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                                            >
                                                ДОБАВИТЬ В КОРЗИНУ
                                            </button>
                                        ) : (
                                            <div className="flex items-center justify-between bg-[#2C4B35] rounded-xl p-1">
                                                <button
                                                    onClick={handleRemove}
                                                    className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors text-xl font-bold"
                                                >
                                                    -
                                                </button>
                                                <div className="flex-1 text-center">
                                                    <div className="text-white font-bold text-lg">{quantity} шт.</div>
                                                    <div className="text-white/80 text-sm">в корзине</div>
                                                </div>
                                                <button
                                                    onClick={handleAdd}
                                                    className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors text-xl font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
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
import { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import { CartContext } from "../stores/stores"

export default function ProductItemPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const { addToCart, cartItems } = useContext(CartContext)

    function handleAddToCart(e) {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product)
    }

    useEffect(() => {
        async function getProduct() {
            try {
                const resp = await fetch(`http://localhost:3000/api/products/${id}`)
                const data = await resp.json()

                if (Array.isArray(data)) {
                    setProduct(data[0])
                } else {
                    setProduct(data)
                }
            } catch (error) {
                console.error('Error loading product:', error)
                // Fallback: загружаем все продукты и находим нужный
                try {
                    const respAll = await fetch('http://localhost:3000/api/products')
                    const allProducts = await respAll.json()
                    const foundProduct = allProducts.find(p => p.id === parseInt(id))
                    setProduct(foundProduct)
                } catch (fallbackError) {
                    console.error('Fallback also failed:', fallbackError)
                }
            }
        }

        if (id) {
            getProduct()
        }
    }, [id])

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">☕</div>
                    <p className="text-xl text-gray-600">Loading product...</p>
                </div>
            </div>
        )
    }

    const cartItem = cartItems.find(item => item.id === product.id)

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <Link
                    to="/catalog"
                    className="inline-flex items-center text-coffee-600 hover:text-coffee-800 mb-8 text-lg font-medium"
                >
                    ← Back to Products
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row">
                        {/* Изображение товара */}
                        <div className="lg:w-1/2 p-8">
                            <img
                                className="w-full h-96 object-cover rounded-xl"
                                src={product.image}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500"
                                }}
                            />
                        </div>

                        {/* Информация о товаре */}
                        <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                            <h1 className="text-3xl font-bold text-coffee-900 mb-4">
                                {product.name}
                            </h1>

                            <div className="mb-6">
                                <div className="flex items-center gap-4">
                                    {product.originalPrice ? (
                                        <>
                                            <span className="text-3xl font-bold text-coffee-600">
                                                ${product.price}
                                            </span>
                                            <span className="text-xl text-gray-500 line-through">
                                                ${product.originalPrice} USD
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-3xl font-bold text-coffee-600">
                                            ${product.price} USD
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-8">
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {product.description || "A premium quality product designed for coffee enthusiasts. Crafted with attention to detail and perfect for your daily coffee ritual."}
                                </p>
                            </div>

                            {product.roastLevel && (
                                <div className="mb-6">
                                    <span className="text-sm font-medium text-gray-500">Roast Level:</span>
                                    <span className="ml-2 text-coffee-700 font-medium">{product.roastLevel}</span>
                                </div>
                            )}

                            {product.weight && (
                                <div className="mb-8">
                                    <span className="text-sm font-medium text-gray-500">Weight:</span>
                                    <span className="ml-2 text-coffee-700 font-medium">{product.weight}g</span>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-coffee-600 hover:bg-coffee-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
                                >
                                    {cartItem ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Дополнительная информация */}
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-coffee-900 mb-6">Product Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                            <div>
                                <h3 className="font-semibold text-coffee-800 mb-2">Features</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Premium quality materials</li>
                                    <li>Dishwasher safe</li>
                                    <li>Microwave safe</li>
                                    <li>Ergonomic design</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-coffee-800 mb-2">Shipping & Returns</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Free shipping on orders over $50</li>
                                    <li>30-day return policy</li>
                                    <li>Secure packaging</li>
                                    <li>Worldwide delivery</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useEffect, useState, useContext } from "react"
import { NavLink } from "react-router"
import { CartContext } from "../stores/stores"

export default function ProductList() {
    const [products, setProducts] = useState([])
    const { addToCart, cartItems } = useContext(CartContext)

    function handleAddToCart(product, e) {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product)
    }

    useEffect(() => {
    async function getProducts() {
        try {
            const resp = await fetch('http://localhost:3000/api/products')
            const result = await resp.json()
            setProducts(result.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }
    getProducts()
}, [])

    function renderButton(product) {
        const cartItem = cartItems.find(item => item.id === product.id)

        if (!cartItem) {
            return (
                <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-4 right-4 bg-coffee-600 hover:bg-coffee-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                    Add to Cart
                </button>
            )
        } else {
            return (
                <div className="absolute bottom-4 right-4 bg-gray-500 text-white px-4 py-2 rounded text-sm font-medium">
                    In Cart: {cartItem.quantity}
                </div>
            )
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-coffee-900 mb-12">
                    MORE PRODUCTS
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {products.map(product => (
                        <NavLink
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="block"
                        >
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative">
                                    <img
                                        className="w-full h-64 object-cover"
                                        src={`http://localhost:3000/${product.image_url}`}
                                        alt={product.name}
                                    />
                                    {renderButton(product)}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        {product.originalPrice && (
                                            <span className="text-lg font-bold text-coffee-600">
                                                ${product.price}
                                            </span>
                                        )}
                                        {product.originalPrice && (
                                            <span className="text-lg text-gray-500 line-through">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                        {!product.originalPrice && (
                                            <span className="text-lg font-bold text-coffee-600">
                                                ${product.price} USD
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">☕</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-500">
                            Products will appear here soon
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
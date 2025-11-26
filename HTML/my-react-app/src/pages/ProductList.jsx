import { useEffect, useState, useContext } from "react"
import { NavLink, useParams } from "react-router"
import { CartContext } from "../stores/stores"

export default function CategoryPage() {
    const { id } = useParams()
    const [category, setCategory] = useState()
    const [products, setProducts] = useState([])

    const [cart, setCart] = useContext(CartContext)

    function addToCart(product) {


        if (cart.findIndex(element => element.id === product.id) === -1) {
            setCart(
                [
                    ...cart,
                    {
                        ...product,
                        quantity: 1
                    }
                ]
            )
        }
    }

    useEffect(() => {
        async function getCategory() {
            const resp = await fetch('http://localhost:3000/api/products')
            const data = await resp.json()
            setCategory(data.category)
            setProducts(data.data || [])
        }
        getCategory()
    }, [id])

    function renderButton(product) {
        const index = cart.findIndex(element => element.id === product.id)

        if (index === -1) {
            return (
                <button
                    onClick={(e) => addToCart(product, e)}
                    className="absolute bottom-2 left-2 bg-green-500 hover:bg-black text-white px-4 py-2 rounded text-sm font-medium">
                    Add to Cart
                </button>
            )
        } else {
            return (
                <div className="absolute bottom-2 left-2 bg-gray-500 text-white px-4 py-2 rounded text-sm font-medium">
                    In Cart: {cart[index].quantity}
                </div>
            )
        }
    }


    return (
        <div>
            {
                category && (
                    <div className="p-4">
                        <h1 className="text-2xl font-bold mb-6">{category.title}</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map(product => (
                                <NavLink
                                    key={product.id}
                                    to={`/products/${product.id}`}
                                >
                                    <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <div className="relative">
                                            <img
                                                className="w-full h-48 object-cover"
                                                src={`http://localhost:3000/${product.image_url}`}
                                                alt={product.title}
                                            />
                                            {renderButton(product)}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800 mb-2">
                                                {product.title}
                                            </h3>
                                            <p className="text-lg font-bold text-gray-900">
                                                ${product.price}
                                            </p>
                                        </div>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { CartContext } from "../stores/stores";

export default function ProductItemPage() {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [cart, setCart] = useContext(CartContext);

    function addToCart(e) {
        e.preventDefault();
        e.stopPropagation();

        if (cart.findIndex(element => element.id === product.id) === -1) {
            setCart([
                ...cart,
                {
                    ...product,
                    quantity: 1
                }
            ]);
        }
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

                const respAll = await fetch('http://localhost:3000/api/products')
                const allProducts = await respAll.json()
                const foundProduct = allProducts.find(p => p.id === parseInt(id))
                setProduct(foundProduct)
            }
        }

        if (id) {
            getProduct()
        }
    }, [id])


    return (
        <div className="p-4 max-w-4xl mx-auto">
            <button
                onClick={() => window.history.back()}
                className="mb-4 text-green-600 hover:text-green-800"
            >
                ← Назад
            </button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-6">
                        <img
                            className="w-full h-96 object-cover rounded-lg"
                            src={`http://localhost:3333${product.image}`}
                            alt={product.title}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/500x500?text=No+Image"
                            }}
                        />
                    </div>

                    <div className="md:w-1/2 p-6">
                        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
                            {product.title}
                        </h1>

                        <div className="mb-6">
                            <span className="text-3xl font-bold">
                                ${product.price}
                            </span>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <button
                            onClick={addToCart}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
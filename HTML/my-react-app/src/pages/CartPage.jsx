import { useContext, useState } from "react";
import { CartContext } from "../stores/stores";
import Counter from "../components/ui/Counter";
import { useNavigate } from "react-router";

export default function CartPage() {
    const [cart, setCart] = useContext(CartContext);
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const continueShopping = () => {
        navigate("/");
    };

    const handleOrder = () => {
        setShowSuccess(true);
    };

    const onCloseSuccess = () => {
        setShowSuccess(false);
    };

    if (cart.length === 0) {
        return (
            <div className="p-4 text-start min-h-screen bg-[#171717] text-[#F8F8F9]">
                <h1 className="text-3xl font-bold mb-8 font-serif">Корзина Odin's Brew</h1>
                <div className="bg-[#2C4B35]/20 p-12 rounded-2xl border border-[#2C4B35]/30">
                    <p className="text-xl mb-8 text-[#F8F8F9]/80">Ваша корзина пуста</p>
                    <button
                        onClick={continueShopping}
                        className="bg-[#2C4B35] text-[#F8F8F9] py-4 px-12 rounded-xl font-semibold text-lg transition-all duration-300 border border-[#2C4B35] hover:bg-[#1E3525] hover:border-[#F8F8F9]/30"
                    >
                        Найти свои сокровища
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 min-h-screen bg-[#171717] text-[#F8F8F9]">
            <h1 className="text-3xl font-bold mb-8 font-serif">Корзина Odin's Brew</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((product) => (
                        <div key={product.id} className="bg-[#2C4B35]/10 rounded-2xl p-6 border border-[#2C4B35]/20 hover:border-[#2C4B35]/40 transition-all duration-300">
                            <div className="flex items-start gap-6">
                                <img
                                    className="w-28 h-28 object-cover rounded-xl border border-[#2C4B35]/30"
                                    src={`http://localhost:3000/${product.image_url}`}
                                    alt={product.title}
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-semibold text-[#F8F8F9] text-xl">
                                            {product.title}
                                        </h3>
                                        <button
                                            onClick={() => removeFromCart(product.id)}
                                            className="text-[#F8F8F9]/60 hover:text-[#F8F8F9] text-2xl transition-colors hover:scale-110"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-6 mb-4">
                                        <Counter quantity={product.quantity} id={product.id} />
                                        <span className="text-[#F8F8F9]/80 text-lg">${product.price}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-[#2C4B35]">
                                            ${product.price * product.quantity}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-[#2C4B35]/20 p-8 rounded-2xl border border-[#2C4B35]/30 h-fit">
                    <h3 className="text-2xl font-bold mb-6 font-serif">Сбор даров</h3>
                    <div className="mb-8">
                        <p className="text-lg mb-3 text-[#F8F8F9]/80">{totalItems} сокровищ в пути</p>
                        <p className="text-3xl font-bold text-[#2C4B35]">Всего ${totalPrice}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <input
                            type="text"
                            placeholder="Имя викинга"
                            className="w-full p-4 bg-[#171717]/50 border border-[#2C4B35]/30 rounded-xl text-[#F8F8F9] placeholder-[#F8F8F9]/40 focus:outline-none focus:border-[#2C4B35]"
                        />
                        <input
                            type="tel"
                            placeholder="Рунический знак"
                            className="w-full p-4 bg-[#171717]/50 border border-[#2C4B35]/30 rounded-xl text-[#F8F8F9] placeholder-[#F8F8F9]/40 focus:outline-none focus:border-[#2C4B35]"
                        />
                        <input
                            type="email"
                            placeholder="Весть от ворона"
                            className="w-full p-4 bg-[#171717]/50 border border-[#2C4B35]/30 rounded-xl text-[#F8F8F9] placeholder-[#F8F8F9]/40 focus:outline-none focus:border-[#2C4B35]"
                        />
                    </div>

                    <button
                        onClick={handleOrder}
                        className="w-full bg-[#2C4B35] text-[#F8F8F9] py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-[#2C4B35] hover:bg-[#1E3525] hover:border-[#F8F8F9]/30"
                    >
                        Отправить в путь
                    </button>
                </div>
            </div>

            {showSuccess && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-[#2C4B35] text-[#F8F8F9] p-8 rounded-2xl border border-[#F8F8F9]/20 max-w-md text-center">
                        <div className="text-4xl mb-4">🐦‍⬛</div>
                        <h3 className="text-2xl font-bold mb-4 font-serif">Ворон в пути!</h3>
                        <p className="text-lg mb-6 text-[#F8F8F9]/80">
                            Ваши дары приняты. Ждите вести от наших воронов!
                        </p>
                        <button
                            onClick={onCloseSuccess}
                            className="bg-[#F8F8F9] text-[#2C4B35] px-8 py-3 rounded-xl font-semibold hover:bg-[#2C4B35] hover:text-[#F8F8F9] transition-all duration-300 border border-[#2C4B35]"
                        >
                            Продолжить странствие
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
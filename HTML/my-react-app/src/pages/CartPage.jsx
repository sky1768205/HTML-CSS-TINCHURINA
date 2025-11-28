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
            <div className="min-h-screen relative overflow-hidden">
                {/* Фон */}
                <div
                    className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/images/фон-катлог.jpg)',
                    }}
                />

                {/* Затемнение фона */}
                <div className="fixed top-0 left-0 w-full h-full bg-[#171717]/40 pointer-events-none" />

                <div className="min-h-screen bg-[#171717]/40 backdrop-blur-sm relative z-10 flex items-center justify-center p-8">
                    <div className="text-center max-w-md">
                        <div className="text-6xl mb-6 text-[#F8F8F9]">☕</div>
                        <h1 className="text-3xl font-light text-[#F8F8F9] mb-4">Корзина пуста</h1>
                        <p className="text-[#F8F8F9]/80 mb-8">Начните свое путешествие по меню</p>
                        <button
                            onClick={continueShopping}
                            className="bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] px-8 py-3 rounded-xl font-medium hover:from-[#1E3525] hover:to-[#2C4B35] transition-colors shadow-2xl"
                        >
                            Исследовать меню
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Фон */}
            <div
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: 'url(/images/фон.jpg)',
                }}
            />

            {/* Затемнение фона */}
            <div className="fixed top-0 left-0 w-full h-full bg-[#171717]/30 pointer-events-none" />

            <div className="relative z-10 min-h-screen p-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-light text-[#F8F8F9] mb-8">
                        Сокровищница
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Список товаров */}
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-[#2c463393] backdrop-blur-sm rounded-2xl p-6 border border-[#F8F8F9]/20 shadow-2xl"
                                >
                                    <div className="flex items-center gap-6">
                                        <img
                                            className="w-24 h-24 object-cover rounded-xl border-2 border-[#F8F8F9]/30"
                                            src={`/${product.image_url}`}
                                            alt={product.name}
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-medium text-[#F8F8F9] text-lg">
                                                    {product.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeFromCart(product.id)}
                                                    className="text-[#F8F8F9]/60 hover:text-red-400 transition-colors p-1"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <Counter quantity={product.quantity} id={product.id} />
                                                <span className="text-[#F8F8F9]/80 text-lg">${product.price}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xl font-medium text-[#F8F8F9]">
                                                ${(product.price * product.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Панель заказа */}
                        <div className="bg-[#2c463393] backdrop-blur-sm rounded-2xl p-6 border border-[#F8F8F9]/20 shadow-2xl h-fit">
                            <h3 className="text-2xl font-light text-[#F8F8F9] mb-6">Рунный заказ</h3>
                            <div className="mb-6">
                                <p className="text-[#F8F8F9]/80 mb-2">{totalItems} сокровищ</p>
                                <p className="text-3xl font-light text-[#F8F8F9]">${totalPrice.toFixed(2)}</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <input
                                    type="text"
                                    placeholder="Имя "
                                    className="w-full p-4 bg-[#171717]/50 border border-[#F8F8F9]/30 rounded-xl text-[#F8F8F9] placeholder-[#F8F8F9]/60 focus:outline-none focus:border-[#2C4B35]"
                                />
                                <input
                                    type="tel"
                                    placeholder="Фамилия"
                                    className="w-full p-4 bg-[#171717]/50 border border-[#F8F8F9]/30 rounded-xl text-[#F8F8F9] placeholder-[#F8F8F9]/60 focus:outline-none focus:border-[#2C4B35]"
                                />
                                <input
                                    type="email"
                                    placeholder="Почта"
                                    className="w-full p-4 bg-[#171717]/50 border border-[#F8F8F9]/30 rounded-xl text-[#F8F8F9] placeholder-[#F8F8F9]/60 focus:outline-none focus:border-[#2C4B35]"
                                />
                            </div>

                            <button
                                onClick={handleOrder}
                                className="w-full bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] py-4 rounded-xl font-medium text-lg hover:from-[#1E3525] hover:to-[#2C4B35] transition-colors shadow-2xl"
                            >
                                СКОВАТЬ ЗАКЛЯТИЕМ
                            </button>
                        </div>
                    </div>

                    {showSuccess && (
                        <div className="fixed inset-0 bg-[#171717]/80 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-[#2c4633] border border-[#F8F8F9]/20 p-8 rounded-2xl shadow-2xl max-w-sm text-center mx-4">

                                <h3 className="text-2xl font-light text-[#F8F8F9] mb-4">Заклятие свершилось!</h3>
                                <p className="text-[#F8F8F9]/80 mb-6">
                                    Ворон уже летит с вестью о вашем заказе
                                </p>
                                <button
                                    onClick={onCloseSuccess}
                                    className="bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] px-8 py-3 rounded-xl font-medium hover:from-[#1E3525] hover:to-[#2C4B35] transition-colors shadow-lg"
                                >
                                    Продолжить путь
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
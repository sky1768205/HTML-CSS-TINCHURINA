import { useContext, useState } from "react";
import { CartContext } from "../stores/stores";
import Counter from "../components/ui/Counter";
import { useNavigate } from "react-router";

export default function CartPage() {
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate();
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const removeFromCart = (productId) => setCart(cart.filter(item => item.id !== productId));
  const continueShopping = () => navigate("/");

  const handleOrder = () => {
    if (cart.length === 0) return;

    const shop = "Магазин №1"; // позже можно брать из БД
    const receipt = {
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        shop: shop
      })),
      totalPrice,
      totalItems,
      date: new Date().toLocaleString(),
      status: "В обработке"
    };

    setOrderData(receipt);
    setShowReceipt(true);
  };

  const confirmOrder = () => {
    setCart([]); // очищаем корзину
    setShowReceipt(false);
    setOrderData(prev => prev ? { ...prev, status: "Оформлен" } : null);
  };

  const receiptStyle = {
    backgroundImage: 'url(/images/Check.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  // Если корзина пуста и заказа нет
  if (cart.length === 0 && !orderData) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center grayscale"
             style={{ backgroundImage: 'url(/images/фон.jpg)' }} />
        <div className="fixed top-0 left-0 w-full h-full bg-[#171717]/40 pointer-events-none" />
        <div className="min-h-screen bg-[#171717]/40 backdrop-blur-sm relative z-10 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6 text-[#F8F8F9]">☕</div>
            <h1 className="text-3xl font-light text-[#F8F8F9] mb-4">Корзина пуста</h1>
            <p className="text-[#F8F8F9]/80 mb-8">Начните свое путешествие по меню</p>
            <button onClick={continueShopping}
                    className="bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] px-8 py-3 rounded-xl font-medium hover:from-[#1E3525] hover:to-[#2C4B35] transition-colors shadow-2xl">
              Исследовать меню
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
           style={{ backgroundImage: 'url(/images/фон.jpg)' }} />
      <div className="fixed top-0 left-0 w-full h-full bg-[#171717]/30 pointer-events-none" />
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-light text-[#F8F8F9] mb-8">Сокровищница</h1>

          {/* Чек или подтверждённый заказ */}
          {orderData && (
            <div className="p-8 rounded-2xl shadow-2xl max-w-md mx-auto mb-8" style={receiptStyle}>
              <h3 className="text-2xl font-light text-black mb-4">
                {showReceipt ? "Чек заказа" : "Ваш заказ"}
              </h3>
              <p className="text-black mb-2">
                Статус: {orderData.status}
              </p>
              <p className="text-black mb-4">Дата: {orderData.date}</p>

              <div className="space-y-2 mb-4">
                {orderData.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-black">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm">{item.shop}</p>
                    </div>
                    <div className="text-right">
                      <p>{item.quantity} × ${item.price.toFixed(2)}</p>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-medium text-black text-lg mb-4">
                <span>Итого:</span>
                <span>${orderData.totalPrice.toFixed(2)}</span>
              </div>

              {showReceipt ? (
                <button onClick={confirmOrder}
                        className="w-full bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] py-4 rounded-xl font-medium text-lg hover:from-[#1E3525] hover:to-[#2C4B35] transition-colors shadow-2xl">
                  Подтвердить заказ
                </button>
              ) : (
                <button onClick={continueShopping}
                        className="w-full bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] py-4 rounded-xl font-medium text-lg hover:from-[#1E3525] hover:to-[#2C4B35] transition-colors shadow-2xl">
                  Вернуться к меню
                </button>
              )}
            </div>
          )}

          {/* Корзина */}
          {!showReceipt && !orderData?.status && cart.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {cart.map(product => (
                  <div key={product.id} className="bg-[#2c463393] backdrop-blur-sm rounded-2xl p-6 border border-[#F8F8F9]/20 shadow-2xl">
                    <div className="flex items-center gap-6">
                      <img className="w-24 h-24 object-cover rounded-xl border-2 border-[#F8F8F9]/30"
                           src={`http://localhost:3000/${product.image_url}`}
                           alt={product.name} />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium text-[#F8F8F9] text-lg">{product.name}</h3>
                          <button onClick={() => removeFromCart(product.id)}
                                  className="text-[#F8F8F9]/60 hover:text-red-400 transition-colors p-1">✕</button>
                        </div>
                        <div className="flex items-center gap-6">
                          <Counter quantity={product.quantity} id={product.id} />
                          <span className="text-[#F8F8F9]/80 text-lg">${product.price}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-medium text-[#F8F8F9]">${(product.price * product.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#2c463393] backdrop-blur-sm rounded-2xl p-6 border border-[#F8F8F9]/20 shadow-2xl h-fit">
                <h3 className="text-2xl font-light text-[#F8F8F9] mb-6">Рунный заказ</h3>
                <div className="mb-6">
                  <p className="text-[#F8F8F9]/80 mb-2">{totalItems} сокровищ</p>
                  <p className="text-3xl font-light text-[#F8F8F9]">${totalPrice.toFixed(2)}</p>
                </div>
                <div className="space-y-4 mb-6">
                  <input type="text" placeholder="Имя"
                         className="w-full p-4 bg-[#171717]/50 border border-[#F8F8F9]/30 rounded-xl text-[#F8F8F9] placeholder-[#F8F8F9]/60 focus:outline-none focus:border-[#2C4B35]" />
                  <input type="tel" placeholder="Фамилия"
                         className="w-full p-4 bg-[#171717]/50 border border-[#F8F8F9]/30 rounded-xl text-[#F8F8F9] placeholder-[#F8F8F9]/60 focus:outline-none focus:border-[#2C4B35]" />
                  <input type="email" placeholder="Почта"
                         className="w-full p-4 bg-[#171717]/50 border border-[#F8F8F9]/30 rounded-xl text-[#F8F8F9] placeholder-[#F8F8F9]/60 focus:outline-none focus:border-[#2C4B35]" />
                </div>
                <button onClick={handleOrder}
                        className="w-full bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] py-4 rounded-xl font-medium text-lg hover:from-[#1E3525] hover:to-[#2C4B35] transition-colors shadow-2xl">
                  СКОВАТЬ ЗАКЛЯТИЕМ
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

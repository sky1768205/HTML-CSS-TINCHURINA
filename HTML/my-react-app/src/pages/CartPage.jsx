// CartPage.jsx - основной файл корзины
import { useContext, useState, useRef } from "react";
import { CartContext } from "../stores/stores";
import CartItems from "../components/ui/CartItems";
import Receipt from "../components/ui/Receipt";
import StickerPanel from "../components/ui/StickerPanel";
import { useNavigate } from "react-router";

export default function CartPage() {
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [isReceiptVisible, setIsReceiptVisible] = useState(false);
  const [isOrderFinalized, setIsOrderFinalized] = useState(false);
  const receiptRef = useRef(null);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOrder = (formData) => {
    if (cart.length === 0) return;

    const receipt = {
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        shop: "Магазин №1"
      })),
      totalPrice,
      totalItems,
      date: new Date().toLocaleString(),
      status: "В обработке",
      customer: formData,
      stickers
    };

    setOrderData(receipt);
    setIsReceiptVisible(true);
  };

  const confirmReceipt = () => {
    setIsOrderFinalized(true);
    setCart([]); // очищаем корзину
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
           style={{ backgroundImage: 'url(/images/фон.jpg)' }} />
      <div className="fixed top-0 left-0 w-full h-full bg-[#171717]/30 pointer-events-none" />
      <div className="relative z-10 min-h-screen p-8 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-light text-[#F8F8F9] mb-8">Сокровищница</h1>

        {/* Корзина */}
        {!isReceiptVisible && cart.length > 0 && (
          <CartItems
            cart={cart}
            totalItems={totalItems}
            totalPrice={totalPrice}
            onOrder={handleOrder}
          />
        )}

        {/* Чек перед подтверждением */}
        {isReceiptVisible && !isOrderFinalized && orderData && (
          <div className="flex flex-col items-center gap-4">
            <Receipt
              orderData={orderData}
              stickers={stickers}
              setStickers={setStickers}
              isOrderFinalized={isOrderFinalized}
              receiptRef={receiptRef}
            />
            <StickerPanel
              stickers={stickers}
              setStickers={setStickers}
              isOrderFinalized={isOrderFinalized}
              receiptRef={receiptRef}
            />

            <button
              onClick={confirmReceipt}
              className="w-64 bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] py-3 rounded-xl font-medium text-lg"
            >
              Подтвердить заказ
            </button>
          </div>
        )}

        {/* Финальный чек */}
        {isOrderFinalized && orderData && (
          <Receipt
            orderData={orderData}
            stickers={stickers}
            setStickers={setStickers}
            isOrderFinalized={isOrderFinalized}
            receiptRef={receiptRef}
          />
        )}

        {/* Пустая корзина */}
        {cart.length === 0 && !isReceiptVisible && (
          <div className="text-center text-[#F8F8F9] mt-20">
            <h2 className="text-3xl mb-4">Корзина пуста</h2>
            <p className="mb-4">Начните своё путешествие по меню</p>
            <button onClick={() => navigate("/")}
                    className="bg-gradient-to-r from-[#2C4B35] to-[#1E3525] px-8 py-3 rounded-xl">
              Исследовать меню
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
// CartItem.jsx
import Counter from "./Counter";
import { CartContext } from "../../stores/stores";
import { useContext } from "react";

export default function CartItem({ product }) {
  const [cart, setCart] = useContext(CartContext);

  const removeFromCart = () => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  return (
    <div className="bg-[#2c463393] backdrop-blur-sm rounded-2xl p-6 border border-[#F8F8F9]/20 shadow-2xl">
      <div className="flex items-center gap-6">
        <img className="w-24 h-24 object-cover rounded-xl border-2 border-[#F8F8F9]/30"
             src={`http://localhost:3000/${product.image_url}`} alt={product.name} />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-[#F8F8F9] text-lg">{product.name}</h3>
            <button onClick={removeFromCart}
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
  );
}

// CartItems.jsx
import CartItem from "./CartItem";
import { useState } from "react";

export default function CartItems({ cart, totalItems, totalPrice, setStickers, stickers, onOrder }) {
  const [formData, setFormData] = useState({ name: "", surname: "", email: "" });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl w-full">
      <div className="lg:col-span-2 space-y-6">

{cart.map(product => (
  <CartItem key={product.id} product={product} />
))}

      </div>

      <div className="bg-[#2c463393] backdrop-blur-sm rounded-2xl p-6 border border-[#F8F8F9]/20 shadow-2xl h-fit flex flex-col gap-4">
        <h3 className="text-2xl font-light text-[#F8F8F9] mb-2">Рунный заказ</h3>
        <p className="text-[#F8F8F9]/80">{totalItems} сокровищ</p>
        <p className="text-3xl font-light text-[#F8F8F9]">${totalPrice.toFixed(2)}</p>

        <input type="text" name="name" placeholder="Имя" value={formData.name} onChange={handleChange}
               className="w-full p-4 bg-[#171717]/50 border border-[#F8F8F9]/30 rounded-xl text-[#F8F8F9] placeholder-[#F8F8F9]/60" />
        <input type="text" name="surname" placeholder="Фамилия" value={formData.surname} onChange={handleChange}
               className="w-full p-4 bg-[#171717]/50 border border-[#F8F8F9]/30 rounded-xl text-[#F8F8F9] placeholder-[#F8F8F9]/60" />
        <input type="email" name="email" placeholder="Почта" value={formData.email} onChange={handleChange}
               className="w-full p-4 bg-[#171717]/50 border border-[#F8F8F9]/30 rounded-xl text-[#F8F8F9] placeholder-[#F8F8F9]/60" />

        <button onClick={() => onOrder(formData)}
                className="w-full bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] py-4 rounded-xl font-medium text-lg">
          СКОВАТЬ ЗАКЛЯТИЕМ
        </button>
      </div>
    </div>
  );
}

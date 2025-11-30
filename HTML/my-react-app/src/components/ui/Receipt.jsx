// Receipt.jsx - чек растягивается под количество товаров
import { useState, useEffect } from "react";

export default function Receipt({ orderData, stickers, setStickers, isOrderFinalized, receiptRef }) {
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, sticker) => {
    if (isOrderFinalized) return;
    e.preventDefault();

    const rect = receiptRef.current.getBoundingClientRect();
    setDraggingId(sticker.id);
    setOffset({
      x: e.clientX - rect.left - sticker.x,
      y: e.clientY - rect.top - sticker.y
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingId || isOrderFinalized || !receiptRef.current) return;

    const rect = receiptRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - offset.x;
    const y = e.clientY - rect.top - offset.y;

    const boundedX = Math.max(0, Math.min(x, rect.width - 48));
    const boundedY = Math.max(0, Math.min(y, rect.height - 48));

    setStickers(prev =>
      prev.map(sticker =>
        sticker.id === draggingId
          ? { ...sticker, x: boundedX, y: boundedY }
          : sticker
      )
    );
  };

  const handleMouseUp = () => setDraggingId(null);

  useEffect(() => {
    if (draggingId) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingId, offset, isOrderFinalized]);

  return (
    <div
      ref={receiptRef}
      className="relative shadow-lg select-none font-serif"
      style={{
        width: "400px",
        borderRadius: "1rem",
        padding: "32px 24px",
        backgroundImage: 'url(/images/Check.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        color: "#2C1810",
      }}
    >
      {/* Заголовок */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#8B4513] mb-1 tracking-wide">Ваш заказ</h3>
        <div className="w-16 h-0.5 bg-[#8B4513] mx-auto opacity-60"></div>
      </div>

      {/* Информация о заказе */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center bg-white/30 rounded-lg px-3 py-2">
          <span className="text-sm font-medium text-[#5D4037]">Статус:</span>
          <span className="text-sm font-semibold text-[#8B4513] bg-amber-100 px-2 py-1 rounded-full">
            {orderData.status}
          </span>
        </div>
        <div className="flex justify-between items-center bg-white/30 rounded-lg px-3 py-2">
          <span className="text-sm font-medium text-[#5D4037]">Дата:</span>
          <span className="text-sm font-semibold text-[#8B4513]">{orderData.date}</span>
        </div>
      </div>

      {/* Список товаров */}
      <div className="mb-35">
        <h4 className="text-lg font-bold text-[#8B4513] mb-3 text-center">Состав заказа</h4>
        <div className="flex flex-col gap-2">
          {orderData.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white/40 rounded-lg px-3 py-2 border-l-4 border-[#8B4513]"
            >
              <div className="flex-1">
                <div className="font-medium text-[#5D4037] text-sm">{item.name}</div>
                <div className="text-xs text-[#795548]">Магазин: {item.shop}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-[#8B4513]">{item.price * item.quantity} ₽</div>
                <div className="text-xs text-[#795548]">{item.quantity} шт × {item.price} ₽</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Итоговая информация */}
      <div className="pt-3 mb-3">
        <div className="flex justify-between items-center mb-2 font-semibold">
          <span>Количество товаров:</span>
          <span className="font-bold">{orderData.totalItems} шт</span>
        </div>
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Общая сумма:</span>
          <span>{orderData.totalPrice} ₽</span>
        </div>
      </div>

      {/* Стикеры */}
      {stickers.map(sticker => (
        <img
          key={sticker.id}
          src={sticker.src}
          alt="sticker"
          onMouseDown={(e) => handleMouseDown(e, sticker)}
          className={`absolute w-full h-full max-w-40 max-h-40 select-none ${isOrderFinalized ? '' : 'cursor-grab active:cursor-grabbing'}`}
          style={{
            left: `${sticker.x}px`,
            top: `${sticker.y}px`,
            pointerEvents: isOrderFinalized ? "none" : "auto",
            transform: draggingId === sticker.id ? 'scale(1.1)' : 'scale(1)',
            transition: draggingId === sticker.id ? 'none' : 'transform 0.1s',
            zIndex: draggingId === sticker.id ? 10 : 1
          }}
        />
      ))}
    </div>
  );
}

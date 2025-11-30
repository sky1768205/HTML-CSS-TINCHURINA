// StickerPanel.jsx - исправленная панель стикеров
export default function StickerPanel({ stickers, setStickers, isOrderFinalized, receiptRef }) {
  const addSticker = (src) => {
    if (isOrderFinalized || !receiptRef.current) return;

    const rect = receiptRef.current.getBoundingClientRect();
    
    // Добавляем небольшую случайность в позицию
    const randomOffset = () => Math.random() * 40 - 20;
    
    setStickers(prev => [
      ...prev,
      {
        src,
        x: rect.width / 2 - 24 + randomOffset(),
        y: rect.height / 2 - 24 + randomOffset(),
        id: Date.now() + Math.random()
      }
    ]);
  };

  const stickerImages = [
    { src: "/images/sticker1.png", alt: "Стикер 1" },
    { src: "/images/sticker2.png", alt: "Стикер 2" },
    { src: "/images/sticker3.png", alt: "Стикер 3" },
    // Добавьте больше стикеров по необходимости
  ];

  return (
    <div className="flex flex-col gap-4 mt-4 p-4 bg-white/10 rounded-xl">
      <h4 className="text-white text-lg font-medium text-center">Добавить стикеры</h4>
      <div className="flex gap-3 justify-center">
        {stickerImages.map((sticker, index) => (
          <img 
            key={index}
            src={sticker.src} 
            alt={sticker.alt}
            className={`w-20 h-20 cursor-pointer transition-transform hover:scale-110 ${
              isOrderFinalized ? 'opacity-50 cursor-not-allowed' : ''
            }`} 
            onClick={() => addSticker(sticker.src)}
            title={isOrderFinalized ? "Заказ завершен" : "Добавить стикер"}
          />
        ))}
      </div>
      {!isOrderFinalized && (
        <p className="text-white/70 text-sm text-center">
          Нажмите на стикеры для украшения
        </p>
      )}
    </div>
  );
}
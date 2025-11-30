// components/RuneOracle.jsx
import React from 'react';

const RuneOracle = () => {
    const runeImages = [
        "/images/путь.png",
        // "/images/rune2.jpg",
        // "/images/rune3.jpg"
    ];

    const castPrediction = () => {
        const randomImage = runeImages[Math.floor(Math.random() * runeImages.length)];

        const alertBox = document.createElement('div');
        alertBox.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80';
        alertBox.innerHTML = `
            <img 
                src="${randomImage}" 
                alt="Руническое пророчество" 
                class="w-100 h-100. object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
            />
        `;

        // Закрытие по клику
        alertBox.onclick = () => alertBox.remove();

        document.body.appendChild(alertBox);
    };

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <button
                onClick={castPrediction}
                className="bg-[#2C4B35] text-[#F8F8F9] p-4 rounded-full shadow-lg hover:shadow-[#2C4B35]/25 hover:scale-110 transition-all duration-300 border border-[#F8F8F9]/20 group"
            >
                <span className="font-[Chalkduster] flex items-center gap-2 text-sm font-bold">
                    <span className=" font-[Chalkduster] group-hover:rotate-180 transition-transform duration-500" style={{ fontFamily: "'Chalkduster', cursive" }}>ᛜ</span>
                    Руническое Гадание
                </span>
            </button>
        </div>
    );
};

export default RuneOracle;
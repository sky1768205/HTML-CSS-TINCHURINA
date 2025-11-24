// components/RuneOracle.jsx
import React from 'react';

const RuneOracle = () => {
    const runePredictions = [
        {
            rune: "ᚠ",
            name: "Феу",
            prediction: "Сегодня удачный день для новых начинаний. Боги благословляют ваши предприятия.",
            meaning: "Богатство, удача, новые возможности"
        },
        {
            rune: "ᚢ",
            name: "Уруз",
            prediction: "Сила воли приведет к победе. Не сомневайтесь в своих способностях.",
            meaning: "Сила, здоровье, жизненная энергия"
        },
        {
            rune: "ᚦ",
            name: "Турисаз",
            prediction: "Время для размышлений. Примите мудрое решение, и врата откроются.",
            meaning: "Врата, защита, размышления"
        },
        {
            rune: "ᚨ",
            name: "Ансуз",
            prediction: "Боги шепчут вам. Прислушайтесь к знакам и посланиям свыше.",
            meaning: "Сигналы, послания, мудрость Одина"
        },
        {
            rune: "ᚱ",
            name: "Райдо",
            prediction: "Путешествие принесет неожиданные встречи. Дорога ведет к судьбе.",
            meaning: "Путешествие, колесо, движение"
        },
        {
            rune: "ᚲ",
            name: "Кеназ",
            prediction: "Творческий огонь горит ярко. Ваше вдохновение осветит путь.",
            meaning: "Факел, знание, вдохновение"
        },
        {
            rune: "ᚷ",
            name: "Гебо",
            prediction: "Встреча с союзником изменит всё. Дар судьбы ждет вас.",
            meaning: "Дар, партнерство, единство"
        },
        {
            rune: "ᚹ",
            name: "Вуньо",
            prediction: "Радость и гармония наполнят день. Празднуйте маленькие победы.",
            meaning: "Радость, свет, совершенство"
        },
        {
            rune: "ᚺ",
            name: "Хагалаз",
            prediction: "Перемены на подходе. Примите разрушение старого как возможность для роста.",
            meaning: "Град, разрушение, трансформация"
        },
        {
            rune: "ᚾ",
            name: "Наутиз",
            prediction: "Терпение будет вознаграждено. Преодоление трудностей закалит характер.",
            meaning: "Нужда, выносливость, необходимость"
        }
    ];

    const castPrediction = () => {
        const randomRune = runePredictions[Math.floor(Math.random() * runePredictions.length)];
        const message = `
 ПРОРОЧЕСТВО РУН 

${randomRune.rune} ${randomRune.name}

${randomRune.prediction}

Значение: ${randomRune.meaning}

Пусть мудрость Одина ведет ваш путь!
        `;
        alert(message);
    };

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <button
                onClick={castPrediction}
                className="bg-[#2C4B35] text-[#F8F8F9] p-4 rounded-full shadow-lg hover:shadow-[#2C4B35]/25 hover:scale-110 transition-all duration-300 border border-[#F8F8F9]/20 group"
            >
                <span className="flex items-center gap-2 text-sm font-bold">
                    <span className="group-hover:rotate-180 transition-transform duration-500">⚗️</span>
                    Руническое Гадание
                </span>
            </button>
        </div>
    );
};

export default RuneOracle;
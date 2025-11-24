import { useState } from 'react';

export default function CoffeUpdates() {
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);

        // Имитация отправки данных
        setTimeout(() => {
            setIsSubmitting(false);
            setShowAlert(true);
            setEmail('');

            // Автоматическое скрытие алерта через 5 секунд
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
        }, 1000);
    };

    // Стили в одном файле
    const styles = `
        @keyframes scroll-unroll {
            0% {
                transform: translate(-50%, -50%) scale(0.1) rotate(-5deg);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.1) rotate(2deg);
                opacity: 0.8;
            }
            100% {
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
                opacity: 1;
            }
        }
        
        @keyframes progress-bar {
            from {
                width: 100%;
            }
            to {
                width: 0%;
            }
        }
        
        @keyframes wax-appear {
            from {
                transform: scale(0) rotate(-180deg);
                opacity: 0;
            }
            to {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
        }
        
        .animate-scroll-unroll {
            animation: scroll-unroll 1s ease-out forwards;
        }
        
        .animate-progress-bar {
            animation: progress-bar 5s linear;
        }
        
        .animate-wax-appear {
            animation: wax-appear 0.8s ease-out 0.5s forwards;
            opacity: 0;
        }
        
        .font-runic {
            font-family: system-ui, -apple-system, sans-serif;
            letter-spacing: 2px;
        }
        
        .ancient-scroll {
            background: 
                linear-gradient(135deg, #f5e8c8 0%, #e6d5b8 25%, #d4c0a1 50%, #c5af8a 75%, #b59f7a 100%),
                url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23a52a2a' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
            background-blend-mode: multiply;
            border: 2px solid #8B4513;
            box-shadow: 
                0 10px 30px rgba(0,0,0,0.3),
                inset 0 0 50px rgba(139, 69, 19, 0.1),
                0 0 20px rgba(139, 69, 19, 0.2);
            position: relative;
            overflow: hidden;
        }
        
        .ancient-scroll::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: linear-gradient(to bottom, rgba(139, 69, 19, 0.3), transparent);
            pointer-events: none;
        }
        
        .ancient-scroll::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: linear-gradient(to top, rgba(139, 69, 19, 0.3), transparent);
            pointer-events: none;
        }
        
        .ink-text {
            color: #2F1B0A;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
            font-family: 'Georgia', serif;
        }
        
        .wax-seal {
            background: radial-gradient(circle at 30% 30%, #dc2626, #7f1d1d, #450a0a);
            box-shadow: 
                2px 2px 10px rgba(0,0,0,0.5),
                inset 1px 1px 5px rgba(255,255,255,0.3);
            border: 2px solid #fef3c7;
        }
        
        .burning-rope {
            background: linear-gradient(90deg, #dc2626, #f59e0b, #dc2626);
            background-size: 200% 100%;
            animation: burning-flame 2s linear infinite;
        }
        
        @keyframes burning-flame {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    `;

    return (
        <>
            <style>{styles}</style>

            {/* Кастомный алерт в виде древнего свитка с анимацией развертывания */}
            {showAlert && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999]">
                    <div className="ancient-scroll rounded-lg px-12 py-10 shadow-2xl max-w-md animate-scroll-unroll">
                        <div className="text-center relative z-10">
                            {/* Восковая печать с задержкой появления */}
                            <div className="absolute -top-6 -right-6 w-16 h-16 wax-seal rounded-full flex items-center justify-center text-amber-100 text-xl font-bold border-3 border-amber-200 animate-wax-appear">
                                ᛟ
                            </div>

                            <div className="ink-text font-serif mb-8">
                                <div className="text-3xl font-bold mb-4 tracking-wider border-b-2 border-amber-800 pb-3">
                                    ОДИН СЛЫШИТ ТЕБЯ
                                </div>
                                <div className="text-lg mb-4 leading-relaxed">
                                    Твоя преданность кофейному искусству не останется без награды!
                                </div>
                                <div className="text-md font-semibold mb-2 text-amber-800">
                                    Жди весточку от воронов Хугина и Мунина
                                </div>
                                <div className="text-sm opacity-80 mt-6 pt-4 border-t border-amber-700">
                                    Священные зёрна уже в пути к тебе
                                </div>
                            </div>

                            {/* Декоративные элементы свитка */}
                            <div className="flex justify-between items-center mt-8">
                                <div className="w-12 h-1 bg-amber-700 opacity-60 rounded-full"></div>
                                <div className="text-xs ink-text opacity-70 font-runic px-4">ᚲᛟᚠᚠᛖᛖ ᛒᛚᛖᛊᛊᛁᚾᚷ</div>
                                <div className="w-12 h-1 bg-amber-700 opacity-60 rounded-full"></div>
                            </div>
                        </div>

                        {/* Прогресс бар в виде горящей веревки */}
                        <div className="absolute bottom-0 left-0 w-full h-3 rounded-b-lg overflow-hidden">
                            <div className="h-full burning-rope animate-progress-bar rounded-full"></div>
                        </div>

                        <button
                            onClick={() => setShowAlert(false)}
                            className="absolute -top-3 -right-3 w-10 h-10 bg-amber-900 text-amber-100 rounded-full flex items-center justify-center text-lg hover:bg-amber-800 transition-colors shadow-lg z-20 border-2 border-amber-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Основная форма подписки - УБИРАЕМ backdrop-blur и делаем обычный фон */}
            <div className="py-20 px-4 w-full bg-[#171717]/90 border border-[#2C4B35]/30 rounded-2xl shadow-2xl relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="text-lg font-normal text-[#2C4B35] mb-4 tracking-widest">
                            КОФЕЙНЫЕ ВЕСТИ ОТ ВАЛЬХАЛЛЫ
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#F8F8F9] mb-4">
                            ПОДПИШИСЬ НА КОФЕЙНЫЕ ПРОРОЧЕСТВА
                        </h2>
                        <p className="text-[#F8F8F9]/80 text-xl md:text-2xl">
                            Узнавай первым о новых сортах и ритуалах заваривания
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                        <div className="relative w-full md:flex-1">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ВАШ_ЭЛЬФИЙСКИЙ@EMAIL.РУ"
                                className="w-full px-6 py-4 rounded-xl bg-[#2C4B35]/20 border border-[#2C4B35]/50 text-[#F8F8F9] placeholder-[#F8F8F9]/40 focus:outline-none focus:border-[#F8F8F9]/50 focus:ring-2 focus:ring-[#2C4B35]/30 transition-all duration-300 text-lg"
                                required
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2C4B35]">
                                ☕
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting || !email}
                            className="w-full md:w-auto bg-gradient-to-r from-[#2C4B35] to-[#1E3525] text-[#F8F8F9] px-12 py-4 rounded-xl font-semibold hover:from-[#1E3525] hover:to-[#2C4B35] transition-all duration-500 border border-[#2C4B35] hover:border-[#F8F8F9]/30 disabled:opacity-50 disabled:cursor-not-allowed text-lg whitespace-nowrap min-w-[200px] relative overflow-hidden group"
                        >
                            <span className={`relative z-10 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                                ПОЛУЧИТЬ ВЕСТИ
                            </span>

                            {/* Анимация загрузки */}
                            {isSubmitting && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-[#F8F8F9] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            {/* Эффект свечения */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F8F8F9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </form>

                    <div className="text-center mt-8">
                        <p className="text-[#F8F8F9]/60 text-sm">
                            Присылаем только самое важное: новые сорта кофе, секреты заваривания и специальные предложения
                        </p>
                        <div className="flex justify-center gap-6 mt-4 text-[#F8F8F9]/40">
                            <span>☕ Свежие зерна</span>
                            <span>📜 Рецепты</span>
                            <span>🎁 Скидки</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
import { NavLink, Outlet } from "react-router";
import { CartContext } from "../stores/stores";
import { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import RuneOracle from "../components/RuneOracle";

export default function MainLayout() {
    const [cart, setCart] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [runeHover, setRuneHover] = useState(null);
    const [isRavenActive, setIsRavenActive] = useState(false);
    const [flyingRunes, setFlyingRunes] = useState([]);
    const audioRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        // Инициализация аудио
        audioRef.current = new Audio();
        audioRef.current.volume = 0.3;

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const activateRavenSignal = () => {
        if (isRavenActive) return;

        setIsRavenActive(true);

        // Воспроизведение звука ворона
        playRavenSound();

        // Создаем летающие руны
        createFlyingRunes();

        // Возврат через 4 секунды
        setTimeout(() => {
            setIsRavenActive(false);
            setFlyingRunes([]);
        }, 4000);
    };

    const playRavenSound = () => {
        try {
            // Создаем простой звуковой эффект с помощью Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);

        } catch (error) {
            console.log('Audio error:', error);
        }
    };

    const createFlyingRunes = () => {
        const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ'];
        const newRunes = runes.map((rune, index) => ({
            id: Date.now() + index,
            rune,
            x: 50,
            y: 50,
            targetX: 50 + Math.cos(index) * 40,
            targetY: 50 + Math.sin(index) * 40,
            opacity: 1
        }));

        setFlyingRunes(newRunes);

        // Исчезновение рун через 2 секунды
        setTimeout(() => {
            setFlyingRunes(prev => prev.map(rune => ({ ...rune, opacity: 0 })));
        }, 2000);
    };

    return (
        <CartContext value={[cart, setCart]}>
            <div className="min-h-screen bg-[#171717] relative overflow-hidden">
                {/* Единый фоновый рисунок на всю страницу */}
                <div
                    className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{
                        backgroundImage: 'url(/public/images/home.png)'
                    }}
                >
                    <div className="absolute inset-0 bg-[#171717]/70"></div>
                </div>

                {/* Летающие руны */}
                {flyingRunes.map(({ id, rune, x, y, targetX, targetY, opacity }) => (
                    <div
                        key={id}
                        className="fixed pointer-events-none z-40 text-[#2C4B35] text-lg font-bold transition-all duration-1000"
                        style={{
                            left: `${targetX}%`,
                            top: `${targetY}%`,
                            opacity: opacity,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {rune}
                    </div>
                ))}

                {/* Шапка с прозрачностью и затемнением при скролле */}
                <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-[#171717]/40 backdrop-blur-md border-b border-[#2C4B35]/20 py-3'
                    : 'bg-transparent py-6'
                    }`}>
                    <div className="container mx-auto px-6">
                        <div className="flex items-center">
                            <NavLink
                                to="/"
                                className="mr-8 text-2xl font-bold text-[#F8F8F9] font-serif hover:text-[#2C4B35] transition-colors duration-300"
                            >
                                ODIN'S BREW
                            </NavLink>

                            <div className="flex items-center gap-x-8 mx-auto">
                                {[
                                    { to: "/", name: "Хейм", rune: "ᚺ" },
                                    { to: "/blog", name: "Саги", rune: "ᛊ" },
                                    { to: "/about", name: "Руны", rune: "ᚱ" },
                                    { to: "/products", name: "Пироговый Зал", rune: "ᛗ" }
                                ].map((item, index) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `group relative text-[#F8F8F9] hover:text-[#2C4B35] transition-all duration-300 font-medium px-4 py-2 rounded-lg ${isActive ? 'bg-[#2C4B35]/30 text-[#2C4B35] border border-[#2C4B35]/50' : 'hover:bg-[#2C4B35]/20'
                                            }`
                                        }
                                        onMouseEnter={() => setRuneHover(index)}
                                        onMouseLeave={() => setRuneHover(null)}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="text-[#2C4B35] opacity-70 group-hover:opacity-100 transition-opacity">
                                                {item.rune}
                                            </span>
                                            {item.name}
                                        </span>

                                        {/* Анимированная подсветка при наведении */}
                                        {runeHover === index && (
                                            <div className="absolute inset-0 border border-[#2C4B35]/50 rounded-lg animate-pulse"></div>
                                        )}
                                    </NavLink>
                                ))}
                            </div>

                            <div className="flex items-center gap-x-6">
                                {/* Интерактивный индикатор магического кофе с вороной-проводником */}
                                <div className="flex items-center gap-x-3 mr-4 relative">
                                    <div className="flex items-center gap-x-2 bg-[#2C4B35]/20 px-3 py-2 rounded-lg border border-[#2C4B35]/30">
                                        <div
                                            className={`w-3 h-3 rounded-full transition-all duration-500 ${isRavenActive
                                                    ? 'bg-[#F8F8F9] animate-pulse shadow-lg shadow-[#F8F8F9]/50'
                                                    : 'bg-[#2C4B35]'
                                                }`}
                                        ></div>
                                        <span className="text-sm text-[#F8F8F9]">Варится Магия</span>
                                    </div>

                                    {/* Кнопка ворона-проводника */}
                                    <button
                                        onClick={activateRavenSignal}
                                        disabled={isRavenActive}
                                        className="group relative p-2 rounded-lg bg-[#2C4B35]/30 hover:bg-[#2C4B35]/50 transition-all duration-300 border border-[#2C4B35]/40 hover:border-[#F8F8F9]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Ворон Хугин подает знак"
                                    >
                                        <div className={`w-4 h-4 transition-all duration-300 ${isRavenActive
                                                ? 'text-[#F8F8F9] animate-bounce'
                                                : 'text-[#F8F8F9] group-hover:text-[#2C4B35]'
                                            }`}>
                                            🐦‍⬛
                                        </div>

                                        {/* Эффект пульсации при наведении */}
                                        <div className="absolute inset-0 rounded-lg bg-[#2C4B35]/20 group-hover:animate-ping group-hover:opacity-75"></div>

                                        {/* Тултип */}
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#171717] text-[#F8F8F9] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                                            Знак ворона
                                        </div>
                                    </button>
                                </div>

                                <NavLink to="/account" className="relative group">
                                    <div className="p-2 rounded-lg bg-[#2C4B35]/20 hover:bg-[#2C4B35]/30 transition-all duration-300 border border-[#2C4B35]/50 hover:border-[#F8F8F9]/50">
                                        <div className="w-5 h-5 text-[#F8F8F9] group-hover:text-[#2C4B35] transition-colors">
                                            👁️
                                        </div>
                                    </div>
                                </NavLink>

                                <NavLink to="/cart" className="relative group">
                                    <div className="p-2 rounded-lg bg-[#2C4B35]/20 hover:bg-[#2C4B35]/30 transition-all duration-300 border border-[#2C4B35]/50 hover:border-[#F8F8F9]/50">
                                        <div className="w-5 h-5 text-[#F8F8F9] group-hover:text-[#2C4B35] transition-colors">
                                            🍶
                                        </div>
                                        <div className="absolute -top-1 -right-1 text-[10px] w-5 h-5 flex justify-center items-center bg-[#2C4B35] text-[#F8F8F9] rounded-full font-bold border border-[#F8F8F9]/50 shadow-lg">
                                            {cart.length}
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Отступ для фиксированного хедера */}
                <div className="h-24"></div>

                <main className="relative z-10">
                    <Outlet />
                </main>

                <footer className="relative z-10 bg-[#171717]/80 backdrop-blur-md border-t border-[#2C4B35]/30 text-[#F8F8F9] p-8">
                    <Footer />
                </footer>

                {/* Компонент рунического гадания */}
                <RuneOracle />
            </div>
        </CartContext>
    )
}
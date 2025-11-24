import { NavLink, Outlet } from "react-router";
import { CartContext } from "../stores/stores";
import { useState, useEffect, useRef } from "react";
import Footer from "./Footer";

export default function MainLayout() {
    const [cart, setCart] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [runeHover, setRuneHover] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);

    const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', '�ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛟ', 'ᛞ'];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const initMagicParticles = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const particles = [];
            const particleCount = 40;

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.2,
                    speedY: (Math.random() - 0.5) * 0.2,
                    opacity: Math.random() * 0.3 + 0.1,
                });
            }

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach(particle => {
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;

                    if (particle.x > canvas.width) particle.x = 0;
                    if (particle.x < 0) particle.x = canvas.width;
                    if (particle.y > canvas.height) particle.y = 0;
                    if (particle.y < 0) particle.y = canvas.height;

                    const dx = particle.x - mousePosition.x;
                    const dy = particle.y - mousePosition.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        particle.opacity = Math.min(particle.opacity + 0.03, 0.6);
                        particle.size = Math.min(particle.size + 0.2, 3);
                    } else {
                        particle.opacity = Math.max(particle.opacity - 0.01, 0.1);
                        particle.size = Math.max(particle.size - 0.1, 1);
                    }

                    ctx.fillStyle = `rgba(248, 248, 249, ${particle.opacity})`;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                });

                requestAnimationFrame(animate);
            };

            animate();
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', initMagicParticles);

        initMagicParticles();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', initMagicParticles);
        };
    }, [mousePosition]);

    return (
        <CartContext value={[cart, setCart]}>
            <div className="min-h-screen bg-[#171717] relative overflow-hidden">
                {/* Анимированные ветви деревьев */}
                <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-cover bg-center opacity-40"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)'
                        }}>
                    </div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center opacity-40"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)',
                            transform: 'scaleX(-1)'
                        }}>
                    </div>
                </div>

                {/* Магические частицы */}
                <canvas
                    ref={canvasRef}
                    className="fixed inset-0 pointer-events-none z-0 opacity-40"
                />

                {/* Мистический фон с рунами */}
                <div className="absolute inset-0 opacity-10 z-1">
                    {runes.map((rune, index) => (
                        <div
                            key={index}
                            className="absolute text-2xl text-[#F8F8F9]/20 animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        >
                            {rune}
                        </div>
                    ))}
                </div>

                {/* Уроборос анимация */}
                <div className="absolute top-10 right-10 w-20 h-20 opacity-20 z-10">
                    <div className="w-full h-full border-2 border-[#2C4B35] rounded-full animate-spin-slow">
                        <div className="w-4 h-4 bg-[#2C4B35] rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                </div>

                {/* Магический курсор-фонарь */}
                <div
                    className="fixed pointer-events-none z-50 mix-blend-screen"
                    style={{
                        left: `${mousePosition.x - 60}px`,
                        top: `${mousePosition.y - 60}px`,
                    }}
                >
                    <div className="w-32 h-32 rounded-full bg-[#F8F8F9]/20 blur-xl animate-pulse"></div>
                    <div className="absolute inset-0 w-32 h-32 rounded-full bg-[#F8F8F9]/30 blur-lg"></div>
                </div>

                <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-[#171717]/90 backdrop-blur-md border-b border-[#2C4B35]/30 py-3'
                    : 'bg-transparent py-6'
                    }`}>
                    <div className="container mx-auto px-6">
                        <div className="flex items-center">
                            <NavLink
                                to="/"
                                className="mr-8 text-2xl font-bold text-[#F8F8F9] font-serif hover:text-[#2C4B35] transition-colors duration-300"
                            >
                                ᚨᛚᚠᚺᛖᛁᛗᚱ ᛒᚱᚢᚾᛊᛏ
                            </NavLink>

                            <div className="flex items-center gap-x-8 mx-auto">
                                {[
                                    { to: "/", name: "Heim", rune: "ᚺ" },
                                    { to: "/blog", name: "Sagas", rune: "ᛊ" },
                                    { to: "/about_us", name: "Runes", rune: "ᚱ" },
                                    { to: "/products", name: "Mead Hall", rune: "ᛗ" }
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
                                {/* Индикатор магического кофе */}
                                <div className="flex items-center gap-x-2 mr-4">
                                    <div className="w-2 h-2 bg-[#2C4B35] rounded-full animate-pulse"></div>
                                    <span className="text-sm text-[#F8F8F9]">Brewing Magic</span>
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

                {/* Плавающий элемент с мистическим кофе */}
                <div className="fixed bottom-6 right-6 z-40">
                    <button className="bg-[#2C4B35] text-[#F8F8F9] p-4 rounded-full shadow-lg hover:shadow-[#2C4B35]/25 hover:scale-110 transition-all duration-300 border border-[#F8F8F9]/20 group">
                        <span className="flex items-center gap-2 text-sm font-bold">
                            <span className="group-hover:rotate-180 transition-transform duration-500">⚗️</span>
                            Cast Brew
                        </span>
                    </button>
                </div>

                {/* Анимированные частицы */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-[#F8F8F9]/30 rounded-full animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 10}s`
                            }}
                        />
                    ))}
                </div>
            </div>
        </CartContext>
    )
}
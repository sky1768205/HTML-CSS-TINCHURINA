import { NavLink, Outlet } from "react-router";
import { CartContext } from "../stores/stores";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import RuneOracle from "../components/RuneOracle";
// import RavenIndicator from "./Button_raven";

export default function MainLayout() {
    const [cart, setCart] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [runeHover, setRuneHover] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <CartContext value={[cart, setCart]}>
            <div className="min-h-screen bg-[#171717] relative overflow-hidden">


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
                                    { to: "/", name: "Домой", rune: "ᚺ" },
                                    { to: "/blog", name: "Легенды", rune: "ᛊ" },
                                    { to: "/about", name: "Сага о нас", rune: "ᚱ" },
                                    { to: "/products", name: "Эликсиры", rune: "ᛗ" }
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

                                        {runeHover === index && (
                                            <div className="absolute inset-0 border border-[#2C4B35]/50 rounded-lg animate-pulse"></div>
                                        )}
                                    </NavLink>
                                ))}
                            </div>

                            <div className="flex items-center gap-x-6">
                                {/* <RavenIndicator /> */}

                                <NavLink to="/account" className="relative group">
                                    <div className=" rounded-lg bg-[#2C4B35]/20 hover:bg-[#2C4B35]/30 transition-all duration-300 border border-[#2C4B35]/50 hover:border-[#F8F8F9]/50">

                                        <img className="w-12 h-12" src="/images/Frame 2 (1).png" alt="" />

                                    </div>
                                </NavLink>

                                <NavLink to="/cart" className="relative group">
                                    <div className="rounded-lg bg-[#2C4B35]/20 hover:bg-[#2C4B35]/30 transition-all duration-300 border border-[#2C4B35]/50 hover:border-[#F8F8F9]/50">

                                        <img className="w-12 h-12" src="images/Frame 7 (1).png" alt="" />

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
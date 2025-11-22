import { NavLink, Outlet } from "react-router";
import { CartContext } from "../stores/stores";
import { useState } from "react";
import Footer from "./Footer";

export default function MainLayout() {

    const [cart, setCart] = useState([])
    return (

        <CartContext value={[cart, setCart]}>
            <div className="container mx-auto">
                <header className="flex items-center py-4 px-6">
                    <NavLink to="/" className="mr-8 text-2xl">
                        CoffeStyle.
                    </NavLink>

                    <div className="flex items-center gap-x-8 mx-auto">
                        <NavLink to="/" >Home</NavLink>
                        <NavLink to="/blog" >Blog</NavLink>
                        <NavLink to="/about" >About</NavLink>
                        <NavLink to="/products" >Our Products</NavLink>

                    </div>
                    <NavLink to="/account" className="ml-auto flex-end relative"><img src="/images/user-btn.svg" className="w-6 h-6" alt="" /></NavLink>
                    <NavLink to="/cart" className="ml-auto relative">
                        <img src="/images/IMAGE.svg" alt="" className="w-6 h-6" />
                        <div className="absolute -top-2 -right-2 text-[10px] w-4 h-4 flex justify-center items-center text-white rounded-full">
                            {cart.length}
                        </div>
                    </NavLink>

                </header>

                <main>
                    <Outlet />
                </main>

                <footer className="bg-white text-black p-8">
                    <Footer />
                </footer>
            </div>
        </CartContext>
    )
}
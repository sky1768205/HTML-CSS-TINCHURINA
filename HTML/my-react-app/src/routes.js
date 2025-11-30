import { createBrowserRouter } from "react-router";

import MainLayout from "./components/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductItemPage from "./pages/ProductItemPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPages from "./pages/RegisterPage.jsx";
import Account from "./pages/Account.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogItemPage from "./pages/BlogItemPage.jsx";




export const router = createBrowserRouter([
    {
        Component: MainLayout,
        children: [
            {

                index: true,
                Component: HomePage
            },
            {
                path: 'products',
                Component: ProductList
            },
            {
                path: 'products/:id',
                Component: ProductItemPage
            },
            {
                path: '/about',
                Component: AboutPage
            },
            {
                path: 'cart',
                Component: CartPage

            },
            {
                path: '/login',
                Component: LoginPage
            },
            {
                path: '/register',
                Component: RegisterPages
            },
            {
                path: '/account',
                Component: Account
            },
            {
                path: '/blog',
                Component: BlogPage
            },
            {
                path: '/blog/:id',
                Component: BlogItemPage
            },
            {
                path:'*',
                Component: ErrorPage
            }

        ]
    }
]);
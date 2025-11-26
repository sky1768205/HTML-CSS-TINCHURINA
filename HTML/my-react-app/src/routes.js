import { createBrowserRouter } from "react-router";

import MainLayout from "./components/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductItemPage from "./pages/ProductItemPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CartPage from "./pages/CartPage.jsx";




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

        ]
    }
]);
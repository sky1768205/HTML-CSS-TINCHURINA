import { createBrowserRouter } from "react-router";

import MainLayout from "./components/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductItemPage from "./pages/ProductItemPage.jsx";




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

        ]
    }
]);
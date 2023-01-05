import { createBrowserRouter } from "react-router-dom";

import Home from "../components/Home";
import ListOfProducts from "../components/ListOfProducts";
import Layout from "../components/Layout";
import ProductDetails from "../components/ProductDetails";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import CartWishList from "../components/CartWishList";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children:[
            {
                path: '/',
                element: <Home />
            }, {
                path: '/products/searchByCategory',
                element: <ListOfProducts />
            }, {
                path: '/products/searchByProductName',
                element: <ListOfProducts />
            }, {
                path: '/product/:id',
                element: <ProductDetails />
            }, {
                path: '/login',
                element: <LogInForm />
            }, {
                path: '/signup',
                element: <SignUpForm />
            }, {
                path: '/cart',
                element: <CartWishList />
            }, {
                path: '/wishlist',
                element: <CartWishList />
            }
        ]
    }
])

export default router
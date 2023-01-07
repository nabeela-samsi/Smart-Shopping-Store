import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import ListOfProducts from "../pages/ListOfProducts";
import Layout from "../components/Layout";
import ProductDetails from "../pages/ProductDetails";
import CartWishList from "../pages/CartWishList";
import NotFound from "../pages/NotFoundPage";
import SignUpForm from "../pages/SignUpForm";
import UserForm from "../pages/LogInForm";

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
                element: <UserForm />
            }, {
                path: '/signup',
                element: <SignUpForm />
            }, {
                path: '/cart',
                element: <CartWishList />
            }, {
                path: '/wishlist',
                element: <CartWishList />
            }, {
                path: "*",
                element: <NotFound />
            }
        ]
    }
])

export default router
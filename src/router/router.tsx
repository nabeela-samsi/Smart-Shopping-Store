import { createBrowserRouter } from "react-router-dom";

import Home from "../components/Home";
import ListOfProducts from "../components/ListOfProducts";
import Layout from "../components/Layout";
import ProductDetails from "../components/ProductDetails";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";

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
            }
        ]
    }
])

export default router
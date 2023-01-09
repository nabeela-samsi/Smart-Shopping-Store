import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import ListOfProducts from "../pages/ListOfProducts";
import Layout from "../components/Layout";
import ProductDetails from "../pages/ProductDetails";
import CartWishList from "../pages/CartWishList";
import NotFound from "../pages/NotFoundPage";
import SignUpForm from "../pages/SignUpForm";
import UserForm from "../pages/LogInForm";
import CategoryForm from "../pages/CategoryForm";
import ProductForm from "../pages/ProductForm";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children:[
            {
                path: '/',
                element: <Home />,
            },{
                path: '/login',
                element: <UserForm />
            }, {
                path: '/signup',
                element: <SignUpForm />
            }, {
                path: '/product/',
                children: [
                    {
                        path: ':id',
                        element: <ProductDetails />
                    }, {
                        path: 'create',
                        element: <ProductForm />
                    }
                ]
            }, {
                path: '/products/',
                children: [
                    {
                        path: 'searchByCategory',
                        element: <ListOfProducts />
                    }, {
                        path: 'searchByProductName',
                        element: <ListOfProducts />
                    },
                ]
            }, {
                path: '/category/',
                children: [
                    {
                        path: 'create',
                        element: <CategoryForm />
                    }
                ]
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
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import ListOfProducts from "../pages/ListOfProducts";
import Layout from "../components/Layout";
import ProductDetails from "../pages/ProductDetails";
import CartWishList from "../pages/CartWishList";
import NotFound from "../pages/NotFoundPage";
import CategoryForm from "../pages/CategoryForm";
import ProductForm from "../pages/ProductForm";
import LogInForm from "../pages/LogInForm";
import UserProfile from "../pages/UserProfile";
import UserForm from "../pages/UserForm";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children:[
            {
                path: '/',
                element: <Home />,
            },{
                path: '/login',
                element: <LogInForm />
            }, {
                path: '/signup',
                element: <UserForm />
            }, {
                path: '/userprofile/',
                children: [
                    {
                        path: ':id',
                        element: <UserProfile />
                    }, {
                        path: 'edit/:id',
                        element: <UserForm />
                    }
                ]
            }, {
                path: '/product/',
                children: [
                    {
                        path: ':id',
                        element: <ProductDetails />
                    }, {
                        path: 'create',
                        element: <ProductForm />
                    }, {
                        path: 'edit/:id',
                        element: <ProductForm />
                    }
                ]
            }, {
                path: '/products/',
                children: [
                    {
                        path: '',
                        element: <ListOfProducts />
                    } ,{
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
                    }, {
                        path: 'edit/:id',
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
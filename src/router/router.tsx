import { createBrowserRouter } from "react-router-dom";

import Home from "../components/Home";
import ListOfProducts from "../components/ListOfProducts";
import Layout from "../components/Layout";

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
            }
        ]
    }
])

export default router
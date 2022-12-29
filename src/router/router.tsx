import { createBrowserRouter } from "react-router-dom";
import Header from "../components/Header";

import Home from "../components/Home";
import ListOfProducts from "../components/ListOfProducts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    }, {
        path: '/products/:categoryid',
        element: <ListOfProducts />
    }
])

export default router
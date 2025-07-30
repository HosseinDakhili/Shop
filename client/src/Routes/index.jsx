import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import ProductDetails from "../Pages/ProductDetails";
import Private from "./Authentication/Private";
import Profile from "../Pages/Profile";
import Cart from "../Pages/Cart";
import Public from "./Authentication/Public";
import Auth from "../Pages/Auth";
import NotFound from "../Pages/NotFound";
import Layout from "../Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products/:categoryId/:categoryName",
        element: <Products />,
      },
      {
        path: "/product-details/:id/:name",
        element: <ProductDetails />,
      },
      {
        path: "/profile",
        element: <Private />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
        ],
      },
      {
        path: "/cart",
        element: <Private />,
        children: [
          {
            index: true,
            element: <Cart />,
          },
        ],
      },
      {
        path: "/auth",
        element: <Public />,
        children: [
          {
            index: true,
            element: <Auth />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

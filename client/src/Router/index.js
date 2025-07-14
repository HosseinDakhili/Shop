import { createBrowserRouter } from "react-router-dom";
import Products from "../Pages/Products";
import ProductDetails from "../Pages/ProductDetails";
export const router = createBrowserRouter([
     {
          path: "/",
          element: <Home />,
     },
     {
          path: "/product",
          element: <Products />,
     },
     {
          path: "/product/:id",
          element: <ProductDetails />,
     },
])
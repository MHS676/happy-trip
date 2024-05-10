import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../assets/Pages/Home/Home";
import ErrorPage from "../assets/Pages/ErrorPage/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement:<ErrorPage/>,
    children: [
        {
            path: "/",
            element: <Home/>,
        },
        
    ]
  },
]);

export default router
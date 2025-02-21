import { createBrowserRouter } from "react-router-dom";
import Home from "../containers/Home";
import Recipe from "../containers/Recipe";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Recipe",
    element: <Recipe />,
  },
]);

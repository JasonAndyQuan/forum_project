import { createBrowserRouter } from "react-router-dom";

import Home from "./routes/Home.jsx";
import Nav from "./routes/Nav.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    element: <Nav />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"/err",
        element: <ErrorPage />
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default router;

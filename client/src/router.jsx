import { createBrowserRouter } from "react-router-dom";

import Home from "./routes/Home.jsx";
import Nav from "./routes/Nav.jsx";
import AboutPage from "./routes/about.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import PostPage from "./routes/PostPage.jsx";

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
        children: [
          {
            path:"/posts/:id",
            element: <PostPage />
          },
        ]
      },
      {
        path:"/about",
        element: <AboutPage />
      },

    ],
  },
]);

export default router;

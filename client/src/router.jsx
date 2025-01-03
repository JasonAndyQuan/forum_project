import { createBrowserRouter } from "react-router-dom";

import Home from "./routes/Home.jsx";
import Nav from "./routes/Nav.jsx";
import AboutPage from "./routes/About.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import PostPage from "./routes/PostPage.jsx";
import UserPage from "./routes/UserPage.jsx";

const router = createBrowserRouter([
  {
    element: <Nav />,
    errorElement: <ErrorPage />,
    children: [
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
      {
        path:"/users/:id",
        element: <UserPage />
      }
    ],
  },
]);

export default router;

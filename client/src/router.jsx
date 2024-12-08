import { createBrowserRouter } from "react-router-dom";

import Home from "./routes/Home.jsx";
const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import AdminPage from "./pages/ProfileAdminPage";
import { ProfilePage } from "./pages/ProfilePage";
import Register from "./pages/RegisterPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/homepage",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    loader: () =>
      fetch(`${import.meta.env.VITE_API_URL}/admin`, {
        credentials: "include",
      }),
  },
]);

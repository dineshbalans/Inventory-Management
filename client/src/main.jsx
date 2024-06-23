import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/layout/RootLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UserLayout from "./pages/layout/UserLayout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import store from "./store/store.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "user",
        element: <UserLayout />,
        children: [
          {
            path: "register",
            element: <RegisterPage />,
          },

          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
      {
        path: "inventory",
        element: <InventoryPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);

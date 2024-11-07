import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import WelcomePage from "../Pages/WelcomePage/WelcomePage";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoutes from "./ProtectedRoutes";
import CreateAlleyPage from "../Pages/AlleyForms/CreateAlleyPage/CreateAlleyPage";
import UpdateAlleyPage from "../Pages/AlleyForms/UpdateAlleyPage/UpdateAlleyPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <WelcomePage />},
            {path: "login", element: <LoginPage />},
            {path: "register", element: <RegisterPage />},
            {path: "home", element: <ProtectedRoutes><HomePage /></ProtectedRoutes>},
            {path: "addalley", element: <ProtectedRoutes><CreateAlleyPage /></ProtectedRoutes>},
            {path: "updatealley", element: <ProtectedRoutes><UpdateAlleyPage /></ProtectedRoutes>}
        ]
    }
])
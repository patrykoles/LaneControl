import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import WelcomePage from "../Pages/WelcomePage/WelcomePage";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoutes from "./ProtectedRoutes";
import CreateAlleyPage from "../Pages/AlleyForms/CreateAlleyPage/CreateAlleyPage";
import UpdateAlleyPage from "../Pages/AlleyForms/UpdateAlleyPage/UpdateAlleyPage";
import AlleyDetailsPage from "../Pages/AlleyDetailsPage/AlleyDetailsPage";
import CreateLanePage from "../Pages/LaneForms/CreateLanePage/CreateLanePage";
import UpdateLanePage from "../Pages/LaneForms/UpdateLanePage/UpdateLanePage";
import MenuPage from "../Pages/MenuPage/MenuPage";

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
            {path: "updatealley/:alleyid", element: <ProtectedRoutes><UpdateAlleyPage /></ProtectedRoutes>},
            {path: "alleydetails/:alleyid", element: <ProtectedRoutes><AlleyDetailsPage /></ProtectedRoutes>},
            {path: "addlane/:alleyid", element: <ProtectedRoutes><CreateLanePage /></ProtectedRoutes>},
            {path: "updatelane/:alleyid/:id", element: <ProtectedRoutes><UpdateLanePage /></ProtectedRoutes>},
            {path: "menu", element: <ProtectedRoutes><MenuPage /></ProtectedRoutes>} 
        ]
    }
])
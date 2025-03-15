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
import CreateMenuItemPage from "../Pages/MenuItemForms/CreateMenuItemPage/CreateMenuItemPage";
import UpdateMenuItemPage from "../Pages/MenuItemForms/UpdateMenuItemPage/UpdateMenuItemPage";
import CreateReservationPage from "../Pages/ReservationForms/CreateReservationPage/CreateReservationPage";
import ReservationsPage from "../Pages/ReservationsPage/ReservationsPage";
import UpdateReservationPage from "../Pages/ReservationForms/UpdateReservationPage/UpdateReservationPage";
import ReservationDetailsPage from "../Pages/ReservationDetailsPage/ReservationDetailsPage";
import CreateOrderPage from "../Pages/CreateOrderPage/CreateOrderPage";
import AdminReservationPage from "../Pages/AdminReservationPage/AdminReservationPage";
import AdminProtectedRoutes from "./AdminProtectedRoutes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <WelcomePage />},
            {path: "login", element: <LoginPage />},
            {path: "register", element: <RegisterPage />},
            {path: "home", element: <ProtectedRoutes><HomePage /></ProtectedRoutes>},
            {path: "addalley", element: <AdminProtectedRoutes><CreateAlleyPage /></AdminProtectedRoutes>},
            {path: "updatealley/:alleyid", element: <AdminProtectedRoutes><UpdateAlleyPage /></AdminProtectedRoutes>},
            {path: "alleydetails/:alleyid", element: <ProtectedRoutes><AlleyDetailsPage /></ProtectedRoutes>},
            {path: "addlane/:alleyid", element: <AdminProtectedRoutes><CreateLanePage /></AdminProtectedRoutes>},
            {path: "updatelane/:alleyid/:id", element: <AdminProtectedRoutes><UpdateLanePage /></AdminProtectedRoutes>},
            {path: "menu", element: <ProtectedRoutes><MenuPage /></ProtectedRoutes>},
            {path: "addmenuitem", element: <AdminProtectedRoutes><CreateMenuItemPage /></AdminProtectedRoutes>},
            {path: "updatemenuitem/:id", element: <AdminProtectedRoutes><UpdateMenuItemPage /></AdminProtectedRoutes>},
            {path: "addreservation/:alleyid", element: <ProtectedRoutes><CreateReservationPage /></ProtectedRoutes>},
            {path: "reservations", element: <ProtectedRoutes><ReservationsPage /></ProtectedRoutes>},
            {path: "reservationdetails/:id", element: <ProtectedRoutes><ReservationDetailsPage /></ProtectedRoutes>},
            {path: "addorder/:reservationid", element: <ProtectedRoutes><CreateOrderPage /></ProtectedRoutes>},
            {path: "adminreservations", element: <AdminProtectedRoutes><AdminReservationPage /></AdminProtectedRoutes>},
        ]
    }
])
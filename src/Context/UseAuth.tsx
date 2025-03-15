import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAPI, registerAPI } from "../Services/AuthServices";
import React from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';


type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    isAdmin: boolean; 
    registerUser: (email: string, username: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if(user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;

            const decoded: any = jwtDecode(token);
            setIsAdmin(decoded.role === "Admin"); 
        }
        setIsReady(true);
    }, []);

    const registerUser = async (email: string, username: string, password: string) => {
        await registerAPI(email, username, password)
            .then((res) => {
                if (res && res?.data.token) {
                    const { token, userName, email } = res?.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify({ userName, email }));
                    setToken(token);
                    setUser({ userName, email });

                    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                    const decoded: any = jwtDecode(token);
                    setIsAdmin(decoded.role === "Admin");

                    toast.success("Login Success!");
                    navigate("/home");
                }
            })
            .catch((e) => toast.warning("Server error occurred"));
    };

    const loginUser = async (username: string, password: string) => {
        await loginAPI(username, password)
            .then((res) => {
                if (res && res?.data.token) {
                    const { token, userName, email } = res?.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify({ userName, email }));
                    setToken(token);
                    setUser({ userName, email });

                    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                    const decoded: any = jwtDecode(token);
                    //console.log(decoded)

                    setIsAdmin(decoded.role === "Admin");

                    toast.success("Login Success!");
                    navigate("/home");
                }
            })
            .catch((e) => toast.warning("Server error occurred"));
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        setIsAdmin(false);
        navigate("/");
    };

    return (
        <UserContext.Provider value={{ loginUser, user, token, isAdmin, logout, isLoggedIn, registerUser}}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
};

export const useAuth = () => React.useContext(UserContext);
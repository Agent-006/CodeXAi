/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Axios from "../config/axios";
import { useNavigate, useLocation } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");
            const currentPath = location.pathname;

            if (token) {
                const res = await Axios.get("/api/users/profile");
                if (res) {
                    setUser(res.data.user);
                }
            } else {
                // Allow access to login and register routes
                if (currentPath === "/login" || currentPath === "/register") {
                    return;
                }
                // Redirect to home for all other routes
                navigate("/");
            }
        })();
    }, [navigate, location]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
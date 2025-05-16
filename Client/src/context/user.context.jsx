/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Axios from "../config/axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");

            if (token) {
                const res = await Axios.get("/api/users/profile");
                if (res) {
                    setUser(res.data.user);
                }
            } else {
                navigate("/");
            }
        })();
    }, [navigate]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
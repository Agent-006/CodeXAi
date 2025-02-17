/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Axios from "../config/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");

            if (token) {
                const res = await Axios.get("/api/users/profile");
                if (res) {
                    setUser(res.data.user);
                }
            }
        })();
    },[]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

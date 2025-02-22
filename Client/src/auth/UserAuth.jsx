/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";

export default function UserAuth({ children }) {
    const { user } = useContext(UserContext);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (user) {
            setLoading(false);
            navigate("/profile");
        } else {
            navigate("/");
            setLoading(false);
        }

        if (!token) {
            setLoading(false);
            navigate("/");
        }
    }, [user, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}

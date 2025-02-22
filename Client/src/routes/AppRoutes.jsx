import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Project from "../screens/Project";
import { UserProvider } from "../context/user.context";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/project/:projectId" element={<Project />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
};

export default AppRoutes;

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/user.context";
import Axios from "../config/axios";

const Register = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const res = await Axios.post("/api/users/register", {
                email: data.email,
                password: data.password,
            });

            if (res.status === 200) {
                console.log(res.data);

                localStorage.setItem("token", res.data.token);
                setUser(res.data.user);

                navigate("/profile");
            }

            setData({
                email: "",
                password: "",
            });
        } catch (error) {
            console.error("Error: ", error.response?.data || error.message);
            // TODO: show error popup
        }
    };

    // TODO: Change the ui
    return (
        <div className="h-screen flex justify-center items-center bg-zinc-950 text-zinc-200 ">
            <form className="h-96 w-80" onSubmit={handleSubmit}>
                <div className="h-full w-full bg-zinc-900/40 p-6 rounded-lg shadow-lg text-center flex flex-col justify-between border-2 border-zinc-900">
                    <div className="mt-8">
                        <h1 className="text-3xl font-bold">Join CodeXAi</h1>
                    </div>
                    <div className="space-y-5 w-full">
                        <div className="space-y-2 flex flex-col w-full">
                            <input
                                value={data.email}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full border-[1px] border-zinc-800 px-3 py-2 rounded text-zinc-200 outline-none bg-transparent"
                                type="text"
                                placeholder="Email"
                            />
                            <input
                                value={data.password}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full border-[1px] border-zinc-800 px-3 py-2 rounded text-zinc-200 outline-none bg-transparent"
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="text-sm">
                            Already have an account?
                            <span>
                                <Link to="/login" className="text-blue-500">
                                    {" "}
                                    Login
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className="w-full">
                        <button
                            className="
                    w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded"
                            type="sumbit"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;

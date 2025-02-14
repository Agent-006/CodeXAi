import { AnimatedModal } from "../components/AnimatedModel";
import { UserContext } from "../context/user.context";
import { useContext, useEffect, useState } from "react";
import { BentoGridDemo } from "../components/BentoGridDemo";
import Aurora from "../blocks/Backgrounds/Aurora/Aurora";
import axios from "../config/axios";
// import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [projects, setProjects] = useState([]);
    // const navigate = useNavigate();
    const { user } = useContext(UserContext);

    console.log(user);

    useEffect(() => {
        // if (user === null) {
        //     navigate("/login");
        // }
        // TODO: re-render when a new project is created
        (async () => {
            try {
                const res = await axios.get(
                    "/api/projects/get-all-userprojects"
                );
                setProjects(res.data.projects);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center text-zinc-200">
            <nav className="absolute z-20 top-5 rounded-md w-[98%] p-4 flex justify-between items-center bg-zinc-950/40 backdrop-blur-2xl antialiased">
                <h1 className="text-xl font-semibold">
                    Welcome, {user?.email.split("@")[0] || "user"}
                </h1>
                <button className="bg-zinc-950/60 border-[1px] border-zinc-400 px-4 py-2 rounded cursor-pointer hover:bg-zinc-950/70 transition-colors font-semibold">
                    Logout
                </button>
            </nav>
            <Aurora
                // colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                speed={0.5}
            />
            <div className="absolute bg-zinc-950/10 h-screen w-full flex flex-col items-center justify-between p-4">
                <div className="bg-transparent backdrop-blur-2xl p-4 rounded w-full mt-24 flex-1 overflow-y-auto antialiased">
                    <h2 className="text-3xl mb-4 font-semibold">
                        All Projects
                    </h2>
                    {/*TODO: Replace the following with dynamic project data */}
                    {projects?.length === 0 ? (
                        <div className="text-xl text-center text-zinc-200 font-semibold">
                            Hey! You don&apos;t have any projects yet.
                            <p>Create one now!</p>
                        </div>
                    ) : (
                        <BentoGridDemo projects={projects} />
                    )}
                </div>
            </div>
            <div className="absolute bottom-12 right-12">
                <AnimatedModal />
            </div>
        </div>
    );
}

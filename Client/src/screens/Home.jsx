// import SplashCursor from "../blocks/Animations/SplashCursor/SplashCursor";

import { useNavigate } from "react-router-dom";
import { Vortex } from "../components/ui/votex";

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/register");
    };

    return (
        <div className="bg-zinc-950 h-screen w-full flex justify-center items-center text-zinc-200">
            <Vortex
                backgroundColor="black"
                rangeY={800}
                particleCount={500}
                baseHue={120}
                className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
            >
                <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
                    The hell is CodeXAi?
                </h2>
                <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
                    AI-powered real-time collaboration platform for developers
                    to code, chat, and innovate together.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                    <button
                        onClick={handleClick}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
                    >
                        Get started
                    </button>
                </div>
            </Vortex>
        </div>
    );
};

export default Home;

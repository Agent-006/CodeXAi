import SplashCursor from "../blocks/Animations/SplashCursor/SplashCursor";

const Home = () => {
    return (
        <div className="bg-zinc-950 h-screen w-full flex justify-center items-center text-zinc-200">
            <SplashCursor BACK_COLOR={{ r: 0.5, g: 0, b: 0 }} />
        </div>
    );
};

export default Home;

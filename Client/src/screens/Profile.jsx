import { AnimatedModal } from "../components/AnimatedModel";
import { UserContext } from "../context/user.context";
import { useContext } from "react";

export default function Profile() {
    const { user } = useContext(UserContext);

    console.log(user);


    return (
        <div className="bg-zinc-950 h-screen w-full flex text-zinc-200">
            <AnimatedModal />
        </div>
    );
}

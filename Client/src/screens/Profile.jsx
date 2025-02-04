import { UserContext } from "../context/user.context";
import { useContext } from "react";

export default function Profile() {
    const { user } = useContext(UserContext);

    console.log(user);

    return (
        <div className="bg-zinc-950 h-screen w-full flex justify-center items-center text-zinc-200"></div>
    );
}

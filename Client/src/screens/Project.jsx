/* eslint-disable react/prop-types */

import {
    RiAddLargeLine,
    RiDoorClosedLine,
    RiGroupLine,
    RiSendPlaneFill,
} from "@remixicon/react";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../config/axios";

import { UserContext } from "../context/user.context";

export default function Project() {
    const location = useLocation();
    const project = location.state.project;

    const { user } = useContext(UserContext);

    console.log(project);

    const users = [
        { username: "john_doe", email: "john.doe@example.com" },
        { username: "jane_smith", email: "jane.smith@example.com" },
        { username: "alice_wonderland", email: "alice.wonderland@example.com" },
        { username: "bob_builder", email: "bob.builder@example.com" },
        { username: "charlie_brown", email: "charlie.brown@example.com" },
        { username: "diana_prince", email: "diana.prince@example.com" },
        { username: "edward_elric", email: "edward.elric@example.com" },
        { username: "fiona_gallagher", email: "fiona.gallagher@example.com" },
        { username: "george_foreman", email: "george.foreman@example.com" },
        { username: "hannah_montana", email: "hannah.montana@example.com" },
        { username: "ian_somerhalder", email: "ian_somerhalder@example.com" },
        { username: "ian_somerhalder", email: "ian_somerhalder@example.com" },
        { username: "ian_somerhalder", email: "ian_somerhalder@example.com" },
        { username: "ian_somerhalder", email: "ian_somerhalder@example.com" },
    ];

    const [showMembers, setShowMembers] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

    const handleButtonClick = () => {
        setShowMembers(true);
    };

    const handleClose = () => {
        setShowMembers(false);
    };

    const handleUsersButtonClick = async (email) => {
        setShowUsers(true);
        setShowMembers(false);
        console.log(email);
        const res = await Axios.get("/api/users/get-all-users");
        console.log(res.data);
    };

    const handleUsersClose = () => {
        setShowUsers(false);
    };

    const handleAddUserToProject = async (user) => {
        //TODO: Logic to add user to the project
        console.log(`Adding ${user} to the project`);
    };

    return (
        <main className="w-full h-screen flex text-white bg-gradient-to-r from-gray-900 to-gray-800">
            <section className="chat-container bg-gray-900 bg-opacity-60 backdrop-filter backdrop-blur-lg h-full w-1/4 shadow-lg flex flex-col border-r border-gray-700">
                <header className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-60 border-b border-gray-700">
                    <span className="text-lg font-bold">Logo</span>
                    <span className="flex items-center gap-2">
                        <h1 className="font-semibold text-xl">Chat</h1>
                    </span>
                    <button
                        className="flex items-center justify-center gap-2 text-gray-400 hover:text-white p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition duration-300"
                        onClick={handleButtonClick}
                    >
                        <RiGroupLine size={24} />
                    </button>
                </header>

                <div className="chat-box bg-gray-800 bg-opacity-60 flex-grow overflow-y-auto">
                    <div className="p-4">
                        <div className="flex items-start gap-4 mb-4">
                            <img
                                src="https://randomuser.me/api/portraits/men/1.jpg"
                                alt="User"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h1 className="font-semibold">John Doe</h1>
                                <p className="text-sm text-gray-400">Online</p>
                                <div className="bg-gray-700 p-2 rounded-lg mt-2">
                                    <p>Hello! How are you?</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end justify-end gap-4 mb-4">
                            <div>
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <p>I&apos;m good, thanks!</p>
                                </div>
                            </div>
                            <img
                                src="https://randomuser.me/api/portraits/men/2.jpg"
                                alt="User"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                <footer className="bg-gray-800 bg-opacity-60 border-t border-gray-700">
                    <div className="p-4 flex items-center">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-grow p-2 rounded-l-md bg-gray-700 text-white focus:outline-none"
                        />
                        <button className="flex items-center justify-center p-2 px-3 bg-blue-600 rounded-r-md text-white hover:bg-blue-700">
                            <RiSendPlaneFill />
                        </button>
                    </div>
                </footer>
            </section>
            <section className="code-container bg-gray-900 bg-opacity-60 backdrop-filter backdrop-blur-lg h-full w-3/4 p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
                    {project?.title.toUpperCase()}
                </h2>
                <div className="bg-gray-800 bg-opacity-60 p-4 rounded-lg shadow-inner border border-gray-700">
                    <pre className="text-sm text-gray-300">
                        {JSON.stringify(project, null, 2)}
                    </pre>
                </div>
            </section>

            {showMembers && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 border border-gray-700">
                        <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                            Project Members
                        </h2>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            {project?.members.map((member, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        src={`https://randomuser.me/api/portraits/men/${
                                            index + 3
                                        }.jpg`}
                                        alt={member}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    {member}
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-end gap-2">
                            <button
                                className="flex items-center justify-center gap-2 mt-4 p-2 bg-green-600 rounded text-white hover:bg-green-700 transition duration-300"
                                onClick={() =>
                                    handleUsersButtonClick(user.email)
                                }
                            >
                                Add Collaborators <RiAddLargeLine />
                            </button>
                            <button
                                className="flex items-center justify-center gap-1 mt-4 p-2 bg-red-600 rounded text-white hover:bg-red-700 transition duration-300"
                                onClick={handleClose}
                            >
                                Exit <RiDoorClosedLine />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showUsers && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 border border-gray-700">
                        <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 h-full">
                            Registered Users
                        </h2>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 max-h-96 overflow-y-auto">
                            {users.map((user, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        src={`https://randomuser.me/api/portraits/men/${
                                            index + 10
                                        }.jpg`}
                                        alt={user}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    {user.username} - {user.email}
                                    <span className="ml-auto"></span>
                                    <button
                                        className="ml-auto p-1 rounded text-white hover:bg-zinc-900 transition duration-300"
                                        onClick={() =>
                                            handleAddUserToProject(user)
                                        }
                                    >
                                        <RiAddLargeLine />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-end">
                            <button
                                className="flex items-center justify-center gap-1 mt-4 p-2 bg-red-600 rounded text-white hover:bg-red-700 transition duration-300"
                                onClick={handleUsersClose}
                            >
                                Close <RiDoorClosedLine />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

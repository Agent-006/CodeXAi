/* eslint-disable react/prop-types */

import { RiGroupLine, RiSendPlaneFill } from "@remixicon/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Project() {
    const location = useLocation();
    const project = location.state.project;

    console.log(project);

    const [showMembers, setShowMembers] = useState(false);

    const handleButtonClick = () => {
        setShowMembers(true);
    };

    const handleClose = () => {
        setShowMembers(false);
    };

    return (
        <main className="w-full h-screen flex text-white bg-gradient-to-r from-gray-900 to-gray-800">
            <section className="chat-container bg-gray-900 bg-opacity-60 backdrop-filter backdrop-blur-lg h-full w-1/4 shadow-lg flex flex-col">
                <header className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-60 border-b border-gray-700">
                    <span className="text-lg font-bold">Logo</span>
                    <span className="flex items-center gap-2">
                        <h1 className="font-semibold text-xl">Chat</h1>
                    </span>
                    <button
                        className="flex items-center justify-center gap-2 text-gray-400 hover:text-white"
                        onClick={handleButtonClick}
                    >
                        <RiGroupLine size={24} />
                    </button>
                </header>

                <div className="chat-box bg-gray-800 bg-opacity-60 flex-grow overflow-y-auto">
                    <div className="p-4">
                        <div className="flex items-start gap-4">
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
                        <div className="flex items-end justify-end gap-4 mt-4">
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
                <h2 className="text-2xl font-bold mb-4">
                    {project?.title.toUpperCase()}
                </h2>
                <div className="bg-gray-800 bg-opacity-60 p-4 rounded-lg shadow-inner">
                    <pre className="text-sm text-gray-300">
                        {JSON.stringify(project, null, 2)}
                    </pre>
                </div>
            </section>

            {showMembers && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            Project Members
                        </h2>
                        <ul className="list-disc list-inside text-gray-300">
                            {project?.members.map((member, index) => (
                                <li key={index}>{member}</li>
                            ))}
                        </ul>
                        <div className="flex justify-end">
                            <button
                                className="mt-4 p-2 bg-red-600 rounded text-white hover:bg-red-700"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

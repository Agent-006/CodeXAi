import { RiAddLargeFill, RiLink } from "@remixicon/react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalTrigger,
} from "./ui/animated-modal";
import { useState } from "react";
import axios from "../config/axios";

export function AnimatedModal() {
    const [name, setName] = useState("");

    const handleCreateProject = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/projects/create-project", {
                name,
            });

            if (res.status === 200) {
                console.log("Project created successfully");
            }

            setName("");
        } catch (error) {
            console.error("Error: ", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <Modal className="text-white">
                <ModalTrigger className="bg-zinc-950 border border-zinc-600 antialiased font-semibold text-white flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 flex gap-2 items-center justify-center p-1">
                        New Project <RiLink />
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        <RiAddLargeFill />
                    </div>
                </ModalTrigger>
                <ModalBody className="bg-zinc-950 text-white border border-zinc-800 rounded-md w-96">
                    <ModalContent>
                        <form
                            onSubmit={handleCreateProject}
                            className="flex flex-col gap-4 justify-between w-full h-full"
                        >
                            <h4 className="text-lg md:text-2xl text-zinc-200 font-bold text-center mb-8">
                                Create your project
                            </h4>

                            <div className="relative flex flex-col justify-between h-60 w-full gap-4">
                                <div className="flex flex-col gap-2">
                                    <label
                                        className="text-sm text-zinc-400"
                                        htmlFor="projectName"
                                    >
                                        Project Name
                                    </label>
                                    <input
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        type="text"
                                        id="projectName"
                                        name="projectName"
                                        className="px-3 py-2 bg-zinc-900 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600"
                                        placeholder="Enter project name"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="absolute bottom-0 right-0 bg-zinc-950 border border-zinc-700 antialiased text-white text-sm px-2 py-2 rounded-md w-28 font-semibold"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    );
}

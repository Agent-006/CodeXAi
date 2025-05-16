/* eslint-disable no-unused-vars */

import {
    RiAddLargeLine,
    RiDoorClosedLine,
    RiGroupLine,
    RiSendPlaneFill,
    RiSubtractLine,
    RiFileCopyLine,
    RiSave3Fill,
    RiPlayLargeLine,
    RiStopLargeFill,
    RiStopLargeLine,
} from "@remixicon/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../config/axios";

import { UserContext } from "../context/user.context";

import {
    initializeSocket,
    receiveMessage,
    sendMessage,
} from "../config/socket";

import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import hljs from "highlight.js";

import { getWebContainer } from "../config/webContainer";

export default function Project() {
    const location = useLocation();
    const projectId = location.state.project._id;

    const [project, setProject] = useState(null);

    const { user } = useContext(UserContext);
    console.log(user);

    const [users, setUsers] = useState([]);

    const [showMembers, setShowMembers] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const [message, setMessage] = useState("");

    const messageBox = useRef();

    const [messages, setMessages] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);

    const [fileTree, setFileTree] = useState({});

    const [webContainer, setWebContainer] = useState(null);

    const [iframeUrl, setIframeUrl] = useState(null);

    const [runProcess, setRunProcess] = useState(null);

    const handleButtonClick = () => {
        setShowMembers(true);
    };

    const handleClose = () => {
        setShowMembers(false);
    };

    const handleUsersButtonClick = async () => {
        setShowUsers(true);
        setShowMembers(false);
        try {
            const res = await Axios.post("/api/users/get-all-users", {
                email: user.email,
            });
            setUsers(res.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleUsersClose = () => {
        setShowUsers(false);
    };

    const handleSelectUsers = (userId) => {
        if (!selectedUsers.includes(userId)) {
            setSelectedUsers([...selectedUsers, userId]);

            setIsAdded((prev) => !prev);
        }
    };

    const handleDeSelectUsers = (userId) => {
        if (selectedUsers.includes(userId)) {
            selectedUsers.pop(userId);

            setIsAdded((prev) => !prev);
        }
    };

    const handleAddUsersToProject = async () => {
        try {
            const res = await Axios.put("/api/projects/add-user-to-project", {
                projectId: projectId,
                users: selectedUsers,
            });
            setProject(res.data.updatedProject);
            setShowUsers(false);
        } catch (error) {
            console.error("Error adding users to project:", error);
        }
    };

    const handleSendMessage = () => {
        sendMessage("project-message", {
            message,
            sender: user._id,
        });

        appendOutgoingMessage(message);

        setMessage("");
    };

    const appendIncomingMessage = (messageObject) => {
        const { message, sender } = messageObject;

        const newMessage = {
            type: "incoming",
            message,
            sender,
            id: Date.now(), // unique id for each message
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const appendOutgoingMessage = (message) => {
        const newMessage = {
            type: "outgoing",
            message,
            sender: user,
            id: Date.now(),
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const scrollToBottom = () => {
        const messageContainer = messageBox.current;
        messageContainer.scrollTop = messageContainer.scrollHeight;
    };

    const writeXaiMessage = (message) => {
        const messageObject = JSON.parse(message);

        return (
            <div className="md:w-72 w-[80vw]">
                <Markdown
                    options={{
                        overrides: {
                            code: {
                                component: ({ className, children }) => {
                                    const language = className
                                        ? className.replace("language-", "")
                                        : "javascript";

                                    const handleCopy = () => {
                                        navigator.clipboard.writeText(children);
                                    };

                                    return (
                                        <div className="my-2 relative group">
                                            <button
                                                onClick={handleCopy}
                                                className="absolute right-2 top-2 p-2 rounded bg-zinc-950 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                                                title="Copy code"
                                            >
                                                <RiFileCopyLine size={20} />
                                            </button>
                                            <SyntaxHighlighter
                                                language={language}
                                                style={vscDarkPlus}
                                                customStyle={{
                                                    padding: "1rem",
                                                    borderRadius: "0.375rem",
                                                    fontSize: "0.875rem",
                                                }}
                                                className="rounded-md"
                                            >
                                                {children}
                                            </SyntaxHighlighter>
                                        </div>
                                    );
                                },
                            },
                            pre: {
                                component: ({ children }) => (
                                    <div>{children}</div>
                                ),
                            },
                        },
                    }}
                >
                    {messageObject.text}
                </Markdown>

                {/* Add file tree rendering */}
                {messageObject.fileTree && (
                    <div className="mt-4">
                        {Object.entries(messageObject.fileTree).map(
                            ([fileName, fileData]) => (
                                <div key={fileName} className="mb-4">
                                    <h4 className="text-lg font-bold mb-2 text-gray-300">
                                        {fileName}
                                    </h4>
                                    <div className="relative group">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    fileData.file.contents
                                                );
                                            }}
                                            className="absolute right-2 top-2 p-2 rounded bg-zinc-950 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                                            title="Copy code"
                                        >
                                            <RiFileCopyLine size={20} />
                                        </button>
                                        <SyntaxHighlighter
                                            language="javascript"
                                            style={vscDarkPlus}
                                            customStyle={{
                                                padding: "1rem",
                                                borderRadius: "0.375rem",
                                                fontSize: "0.875rem",
                                            }}
                                            className="rounded-md"
                                        >
                                            {fileData.file.contents}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        );
    };

    const saveFileTree = async (fileTree) => {
        try {
            const res = await Axios.put("/api/projects/update-filetree", {
                projectId,
                fileTree,
            });
            console.log(res.data);
        } catch (error) {
            console.error("Error saving file tree:", error);
        }
    };

    useEffect(() => {
        // socket initialization
        initializeSocket(projectId);

        if (!webContainer) {
            getWebContainer()
                .then((container) => {
                    console.log("entered container");
                    setWebContainer(container);
                    console.log("container started");
                })
                .catch((error) => {
                    console.error("Error starting web container:", error);
                });
        }

        receiveMessage("project-message", (data) => {
            const message = JSON.parse(data.message);
            console.log("data: ", message);

            webContainer?.mount(message.fileTree);

            if (message && message.fileTree) {
                setFileTree(message.fileTree);
            }

            appendIncomingMessage(data);
        });

        (async () => {
            try {
                const res = await Axios.get(
                    `/api/projects/get-project/${projectId}`
                );
                setProject(res.data.project[0]);
                setFileTree(res.data.project[0].fileTree);
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        })();
    }, [projectId, setProject, webContainer, setWebContainer]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <main className="w-full min-h-screen flex flex-col md:flex-row text-white bg-gradient-to-r from-gray-900 to-gray-800">
            <section className="chat-container bg-gray-900 bg-opacity-60 backdrop-filter backdrop-blur-lg h-screen w-full md:w-1/4 shadow-lg flex flex-col border-r border-gray-700">
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

                <div
                    ref={messageBox}
                    className="chat-box bg-gray-800 bg-opacity-60 overflow-y-auto overflow-x-hidden w-full h-full px-2 py-4"
                >
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-${
                                msg.type === "outgoing"
                                    ? "end justify-end"
                                    : "start"
                            } gap-4 mb-4`}
                        >
                            {msg.type === "incoming" && (
                                <img
                                    src="https://randomuser.me/api/portraits/men/1.jpg"
                                    alt="User"
                                    className="w-10 h-10 rounded-full"
                                />
                            )}

                            <div
                                className={`${
                                    msg.type === "outgoing"
                                        ? "flex flex-col items-end"
                                        : "flex flex-col items-start"
                                }`}
                            >
                                <>
                                    <h1 className="font-semibold">
                                        {msg.sender.email.split("@")[0]}
                                    </h1>
                                    <p className="text-sm text-gray-400">
                                        Online
                                    </p>
                                </>

                                <div
                                    className={`${
                                        msg.type === "outgoing"
                                            ? "bg-blue-600"
                                            : "bg-gray-700"
                                    } p-2 rounded-lg mt-2 overflow-x-auto`}
                                >
                                    {msg.sender._id === "xai" ? (
                                        writeXaiMessage(msg.message)
                                    ) : (
                                        <>
                                            <p>{msg.message}</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {msg.type === "outgoing" && (
                                <img
                                    src="https://randomuser.me/api/portraits/men/1.jpg"
                                    alt="User"
                                    className="w-10 h-10 rounded-full"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <footer className="bg-gray-800 bg-opacity-60 border-t border-gray-700">
                    <div className="p-4 flex items-center">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            placeholder="Type your message..."
                            className="flex-grow py-2 px-4 rounded-l-md bg-gray-700 text-white focus:outline-none"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="flex items-center justify-center p-2 px-3 bg-blue-600 rounded-r-md text-white hover:bg-blue-700"
                        >
                            <RiSendPlaneFill />
                        </button>
                    </div>
                </footer>
            </section>
            <section className="code-container flex flex-col bg-gray-900 bg-opacity-60 backdrop-filter backdrop-blur-lg h-[100vh] w-full md:w-3/4 p-8 shadow-lg gap-1">
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
                    {project?.title.toUpperCase()}
                </h2>
                <div className="flex gap-1">
                    <div className="file-tree bg-gray-800 text-white p-4 rounded-l-lg shadow-inner border border-gray-700 md:min-h-[680px] w-1/4">
                        <h3 className="text-lg font-bold mb-2 border-b border-gray-700 pb-1">
                            File Tree
                        </h3>
                        <ul className="space-y-2">
                            {fileTree ? Object.entries(fileTree).map(
                                ([fileName], index) => (
                                    <li
                                        key={index}
                                        className="cursor-pointer hover:text-blue-400"
                                        onClick={() =>
                                            setSelectedFile(fileName)
                                        }
                                    >
                                        {fileName}
                                    </li>
                                )
                            ) : []}
                        </ul>
                    </div>
                    <div className="code-editor bg-gray-900 text-white px-4 py-2 rounded-r-lg shadow-inner border border-gray-700 min-h-96 w-3/4 overflow-y-auto">
                        {selectedFile && (
                            <div className="file-contents">
                                <div>
                                    <div className="flex justify-between items-center text-lg font-bold mb-2 border-b border-gray-700 pb-1">
                                        <div className="flex items-center gap-2">
                                            {selectedFile}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={async () => {
                                                    await webContainer.mount(
                                                        fileTree
                                                    );

                                                    const installProcess =
                                                        await webContainer.spawn(
                                                            "npm",
                                                            ["install"]
                                                        );

                                                    installProcess.output.pipeTo(
                                                        new WritableStream({
                                                            write(chunk) {
                                                                console.log(
                                                                    chunk.toString()
                                                                );
                                                            },
                                                        })
                                                    );

                                                    if (runProcess) {
                                                        runProcess.kill();
                                                    }

                                                    let tempRunProcess =
                                                        await webContainer.spawn(
                                                            "npm",
                                                            ["start"]
                                                        );

                                                    tempRunProcess.output.pipeTo(
                                                        new WritableStream({
                                                            write(chunk) {
                                                                console.log(
                                                                    chunk.toString()
                                                                );
                                                            },
                                                        })
                                                    );

                                                    setRunProcess(
                                                        tempRunProcess
                                                    );

                                                    webContainer.on(
                                                        "server-ready",
                                                        (port, url) => {
                                                            console.log(
                                                                port,
                                                                url
                                                            );
                                                            setIframeUrl(url);
                                                        }
                                                    );
                                                }}
                                                className="p-2 rounded text-white hover:text-gray-300 transition duration-300"
                                            >
                                                <RiPlayLargeLine />
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    if (runProcess) {
                                                        runProcess.kill();
                                                    }
                                                }}
                                                className="p-2 rounded text-white hover:text-gray-300 transition duration-300"
                                            >
                                                <RiStopLargeLine />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <pre className="rounded-md hljs max-h-[600px] overflow-y-auto bg-gray-950/50 text-md font-semibold p-4 text-zinc-200">
                                    <code
                                        className="language-javascript"
                                        contentEditable={true}
                                        suppressContentEditableWarning
                                        onBlur={(e) => {
                                            const updatedContent =
                                                e.target.innerText;
                                            const ft = {
                                                ...fileTree,
                                                [selectedFile]: {
                                                    ...fileTree[selectedFile],
                                                    file: {
                                                        ...fileTree[
                                                            selectedFile
                                                        ].file,
                                                        contents:
                                                            updatedContent,
                                                    },
                                                },
                                            };
                                            setFileTree(ft);
                                            saveFileTree(ft);
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: hljs.highlight(
                                                "javascript",
                                                fileTree[selectedFile]?.file
                                                    ?.contents
                                            ).value,
                                        }}
                                        style={{
                                            whiteSpace: "pre-wrap",
                                            wordWrap: "break-word",
                                            paddingBottom: "1rem",
                                            counterSet: "line-numbering",
                                            outline: "none",
                                        }}
                                    />
                                </pre>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center w-1/2 gap-1">
                        <div className="address-bar bg-gray-900 text-white p-2 rounded-lg shadow-inner border border-gray-700 w-full">
                            <input
                                type="text"
                                onChange={(e) => setIframeUrl(e.target.value)}
                                value={iframeUrl}
                                className="w-full bg-gray-900 text-white focus:outline-none"
                            />
                        </div>
                        <iframe
                            src={iframeUrl}
                            className="w-full h-full rounded-lg shadow-lg border border-gray-700 bg-gray-100"
                        ></iframe>
                    </div>
                </div>
            </section>

            {showMembers && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 border border-gray-700">
                        <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                            Collaborators
                        </h2>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 max-h-96 overflow-y-auto py-2">
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
                                onClick={handleUsersButtonClick}
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
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 border border-gray-700">
                        <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 h-full">
                            Registered Users
                        </h2>
                        <ul className="list-disc list-inside text-gray-300 space-y-4 max-h-96 overflow-y-auto">
                            {users.map((user, index) => (
                                <li
                                    key={user._id}
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        src={`https://randomuser.me/api/portraits/men/${
                                            index + 10
                                        }.jpg`}
                                        alt={user}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    {user.email.split("@")[0]}
                                    <span className="ml-auto"></span>
                                    <button
                                        className="ml-auto p-1 rounded text-white hover:bg-zinc-900 transition duration-300"
                                        onClick={() => {
                                            selectedUsers.includes(user._id)
                                                ? handleDeSelectUsers(user._id)
                                                : handleSelectUsers(user._id);
                                        }}
                                    >
                                        {selectedUsers.includes(user._id) ? (
                                            <RiSubtractLine />
                                        ) : (
                                            <RiAddLargeLine />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-end gap-4">
                            <button
                                className="flex items-center justify-center gap-1 mt-4 p-2 bg-green-600 rounded text-white hover:bg-green-700 transition duration-300"
                                onClick={handleAddUsersToProject}
                            >
                                Add <RiAddLargeLine />
                            </button>
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

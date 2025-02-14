/* eslint-disable react/prop-types */
import { RiAdminLine, RiGroupLine } from "@remixicon/react";
import { cn } from "../../lib/utils";

export const BentoGrid = ({ className, children }) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl w-full mx-auto p-4",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    toProject,
    className,
    title,
    owner,
    description,
    userCount,
}) => {

    return (
        <div
            onClick={toProject}
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-lg bg-zinc-950/40 border border-zinc-500 flex flex-col space-y-4 cursor-pointer",
                className
            )}
        >
            <div className="group-hover/bento:translate-x-2 transition duration-200 h-full w-full flex flex-col justify-between items-start">
                <div className="flex flex-col space-y-2">
                    <h1 className="font-sans font-bold text-zinc-100 text-2xl mb-2 mt-2">
                        {title}
                    </h1>
                    <h2 className="flex gap-2 w-full font-sans font-medium text-zinc-200 text-lg mb-2">
                        <span className="text-blue-500">
                            <RiAdminLine />
                        </span>{" "}
                        <span className="text-md font-normal">{owner}</span>
                    </h2>
                    <p className="font-sans font-normal text-zinc-300 text-md mb-4">
                        {description}
                    </p>
                </div>
                <div className="flex items-center justify-start space-x-2">
                    <div className="text-xl text-emerald-500">
                        <RiGroupLine />
                    </div>
                    <div className="font-sans font-semibold text-zinc-200 text-md">
                        Collaborators: {userCount}
                    </div>
                </div>
            </div>
        </div>
    );
};

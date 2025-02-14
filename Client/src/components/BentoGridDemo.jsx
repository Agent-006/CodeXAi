/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

export function BentoGridDemo({ projects }) {
    console.log(projects);

    const navigate = useNavigate();

    return (
        <BentoGrid className="max-w-4xl w-full">
            {projects.map((project, i) => (
                <BentoGridItem
                    toProject={() => {
                        navigate(`/project/${project._id}`, {
                            state: { project },
                        });
                    }}
                    key={project._id}
                    projectId={project._id}
                    title={project.title || "Project Name"}
                    owner={project.owner.email.split("@")[0] || "Owner"}
                    description={project.description || "Project Description"}
                    userCount={project.members.length || 0}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                />
            ))}
        </BentoGrid>
    );
}

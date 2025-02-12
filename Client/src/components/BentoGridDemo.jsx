/* eslint-disable react/prop-types */
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

export function BentoGridDemo({ projects }) {
    console.log(projects);
    return (
        <BentoGrid className="max-w-4xl w-full">
            {projects.map((item, i) => (
                <BentoGridItem
                    key={item._id}
                    title={item.title || "Project Name"}
                    owner={item.owner.email.split("@")[0] || "Owner"}
                    description={item.description || "Project Description"}
                    userCount={item.members.length || 0}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                />
            ))}
        </BentoGrid>
    );
}

import mongoose from "mongoose";
import Project from "../models/project.model.js";

// Create a new project

export const createProject = async ({ title, description, ownerId }) => {
    try {
        if (!title || !description || !ownerId) {
            throw new Error("title, description and ownerId are required");
        }

        const existingProject = await Project.findOne({
            title,
        });

        if (existingProject) {
            throw new Error("Project name must be unique");
        }

        const project = await Project.create({
            title,
            description,
            owner: ownerId,
            members: [ownerId],
        });
        return project;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Project name must be unique");
        } else if (error.name === "ValidationError") {
            throw new Error("Validation error");
        } else {
            throw new Error(error.message);
        }
    }
};

// Get all projects by user id

export const getProjectsByUserId = async ({ userId }) => {
    if (!userId) {
        throw new Error("User id is required");
    }

    const projects = await Project.aggregate([
        {
            $match: {
                $or: [{ owner: userId }, { members: userId }],
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            email: 1,
                            // name: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$owner",
        },
    ]);

    return projects;
};

// Add user to project

export const addUserToProject = async ({ projectId, users, userId }) => {
    if (!projectId || !users || !userId) {
        throw new Error("Project ID, users array and user ID are required");
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Project ID is invalid");
    }

    if (!users.every((user) => mongoose.Types.ObjectId.isValid(user))) {
        throw new Error("Users array contains invalid user IDs");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("User ID is invalid");
    }

    const project = await Project.findById(projectId);

    if (!project) {
        throw new Error("Project not found");
    }

    // check if user is alredy in the project
    if (!project.members.includes(userId)) {
        throw new Error("User not authorized to add users to project");
    }

    // update project with new users
    const updatedProject = await Project.findByIdAndUpdate(
        {
            _id: projectId,
        },
        {
            $addToSet: {
                members: {
                    $each: users,
                },
            },
        },
        {
            new: true,
        }
    );

    return updatedProject;
};

// Get project by id

export const getProjectById = async ({ projectId }) => {
    if (!projectId) {
        throw new Error("Project ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Project ID is invalid");
    }

    const project = await Project.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(projectId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            email: 1,
                            // name: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$owner",
        },
    ]);
    // console.log(project)

    if (!project) {
        throw new Error("Project not found");
    }

    return project;
};

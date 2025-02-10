import mongoose from "mongoose";
import Project from "../models/project.model.js";

// Create a new project

export const createProject = async ({ name, userId }) => {
    if (!name || !userId) {
        throw new Error("Name and userId are required");
    }

    const project = await Project.create({
        name,
        users: [userId],
    });

    return project;
};

// Get all projects by user id

export const getProjectsByUserId = async ({ userId }) => {
    if (!userId) {
        throw new Error("User id is required");
    }

    const projects = await Project.find({
        users: userId,
    });

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
    if (!project.users.includes(userId)) {
        throw new Error("User not authorized to add users to project");
    }

    // update project with new users
    const updatedProject = await Project.findByIdAndUpdate(
        {
            _id: projectId,
        },
        {
            $addToSet: {
                users: {
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

    const project = await Project.findById(projectId);

    if (!project) {
        throw new Error("Project not found");
    }

    return project;
};

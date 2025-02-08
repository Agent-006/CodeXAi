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

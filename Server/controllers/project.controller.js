import { validationResult } from "express-validator";
import User from "../models/user.models.js";
import {
    addUserToProject,
    createProject,
    getProjectById,
    getProjectsByUserId,
    updateFileTree,
} from "../services/project.service.js";

export const createProjectController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required",
            });
        }

        const loggedInUser = await User.findOne({
            email: req.user.email,
        });
        const ownerId = loggedInUser._id;
        const newProject = await createProject({ title, description, ownerId });
        return res.status(200).json({
            newProject,
            message: "Project created successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            error:
                error.message ||
                "Some error occurred while creating the project",
        });
    }
};

export const getAllUserProjectsController = async (req, res) => {
    try {
        const loggedInUser = await User.findOne({
            email: req.user.email,
        });

        const userId = loggedInUser._id;

        const projects = await getProjectsByUserId({ userId });
        return res.status(200).json({
            projects,
            message: "Projects fetched successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            error:
                error.message || "Some error occurred while fetching projects",
        });
    }
};

export const addUserToProjectController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        const { projectId, users } = req.body;

        const loggedInUser = await User.findOne({
            email: req.user.email,
        });

        const userId = loggedInUser._id;

        const updatedProject = await addUserToProject({
            projectId,
            users,
            userId,
        });

        if (!updatedProject) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        return res.status(200).json({
            updatedProject,
            message: "User added to project successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            error:
                error.message ||
                "Some error occurred while adding user to project",
        });
    }
};

// get project by id

export const getProjectByIdController = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!projectId) {
            return res.status(400).json({
                message: "Project ID is required",
            });
        }

        const project = await getProjectById({ projectId });

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        return res.status(200).json({
            project,
            message: "Project fetched successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            error:
                error.message ||
                "Some error occurred while fetching the project",
        });
    }
};

// update file tree

export const updateFileTreeController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        const { projectId, fileTree } = req.body;

        const project = await updateFileTree({
            projectId,
            fileTree,
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        return res.status(200).json({
            project,
            message: "File tree updated successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            error:
                error.message || "Some error occurred while updating file tree",
        });
    }
};

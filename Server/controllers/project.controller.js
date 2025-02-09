import { validationResult } from "express-validator";
import User from "../models/user.models.js";
import {
    addUserToProject,
    createProject,
    getProjectsByUserId,
} from "../services/project.service.js";

export const createProjectController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        const { name } = req.body;
        const loggedInUser = await User.findOne({
            email: req.user.email,
        });

        const userId = loggedInUser._id;

        const newProject = await createProject({ name, userId });

        return res.status(200).json({
            newProject,
            message: "Project created successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            error: error.message,
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
            error: error.message,
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
            error: error.message,
        });
    }
};

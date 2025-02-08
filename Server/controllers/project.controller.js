import { validationResult } from "express-validator";
import User from "../models/user.models.js";
import { createProject, getProjectsByUserId } from "../services/project.service.js";

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
        console.log(error);
        return res.status(500).send({
            error: error.message,
        });
    }
};

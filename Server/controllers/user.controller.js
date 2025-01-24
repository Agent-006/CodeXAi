import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";

// Create a new user

export const createUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        const user = await userService.createUser(req.body);

        const token = await user.generateJWT();

        res.status(201).json({
            user,
            token,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Login a user

export const loginUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        const user = await userService.loginUser(req.body);

        if (!user) {
            return res.status(404).json({
                error: "User not found or password is incorrect",
            });
        }

        const token = await user.generateJWT();

        return res.status(200).json({
            user,
            token,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get a user profile

export const getUserProfileController = async (req, res) => {
    return res.status(200).json({
        user: req.user,
    });
};

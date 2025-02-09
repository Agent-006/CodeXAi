import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";

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

        res.status(200).json({
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

// Logout a user

export const logoutUserController = async (req, res) => {
    try {
        const token =
            req.cookies.token || req.headers.authorization.split(" ")[1];

        redisClient.set(token, "logged out", "EX", 60 * 60 * 24);

        res.status(200).json({
            message: "User logged out successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get all users

export const getAllUsersController = async (req, res) => {
    // TODO: Implement functionality to get all users
};

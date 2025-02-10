import {
    createUser,
    getAllUsers,
    loginUser,
} from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";
import User from "../models/user.models.js";

// Create a new user

export const createUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        const user = await createUser(req.body);

        const token = await user.generateJWT();

        res.status(200).json({
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error:
                error.message || "Something went wrong while creating a user",
        });
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
        const user = await loginUser(req.body);

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
        console.log(error);
        return res.status(500).json({
            error:
                error.message || "Something went wrong while logging in a user",
        });
    }
};

// Get a user profile

export const getUserProfileController = async (req, res) => {
    try {
        return res.status(200).json({
            user: req.user,
        });
    } catch (error) {
        return res.status(500).json({
            error:
                error.message ||
                "Something went wrong while fetching user profile",
        });
    }
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
        return res.status(500).json({
            error:
                error.message ||
                "Something went wrong while logging out a user",
        });
    }
};

// Get all users

export const getAllUsersController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                error: "Email is required",
            });
        }

        const loggedInUser = await User.findOne({
            email,
        });

        if (!loggedInUser) {
            return res.status(401).json({
                error: "User not found",
            });
        }

        const userId = loggedInUser._id;

        const users = await getAllUsers({
            userId,
        });

        if (!users) {
            return res.status(404).json({
                error: "No users found",
            });
        }

        return res.status(200).json({
            users,
            message: "All users fetched successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error:
                error.message ||
                "Something went wrong while fetching all users",
        });
    }
};

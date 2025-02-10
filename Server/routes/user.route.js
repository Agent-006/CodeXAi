import { Router } from "express";
import {
    createUserController,
    getAllUsersController,
    getUserProfileController,
    loginUserController,
    logoutUserController,
} from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

// POST /api/user/register
// Register a new user
router.post(
    "/register",
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be at least 3 characters long"),
    createUserController
);

// POST /api/user/login
// Login user
router.post(
    "/login",
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be at least 3 characters long"),
    loginUserController
);

// GET /api/user/:id
// Get a user profile

router.get("/profile", authUser, getUserProfileController);

router.get("/logout", authUser, logoutUserController);

// get all users
router.get("/get-all-users", authUser, getAllUsersController);

export default router;

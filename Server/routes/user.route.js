import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// POST /api/user/register
// Register a new user
router.post(
    "/register",
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be at least 3 characters long"),
    userController.createUserController
);

// POST /api/user/login
// Login user
router.post(
    "/login",
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be at least 3 characters long"),
    userController.loginUserController
);


// GET /api/user/:id
// Get a user profile

router.get("/profile", authMiddleware.authUser, userController.getUserProfileController);

export default router;

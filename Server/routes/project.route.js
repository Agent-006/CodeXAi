import { Router } from "express";
import { body } from "express-validator";
import {
    addUserToProjectController,
    createProjectController,
    getAllUserProjectsController,
    getProjectByIdController,
} from "../controllers/project.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/create-project",
    authUser,
    body("name").isString().withMessage("Name must be a string"),
    createProjectController
);

router.get("/get-all-userprojects", authUser, getAllUserProjectsController);

router.put(
    "/add-user-to-project",
    authUser,
    body("projectId").isString().withMessage("Project ID must be a string"),
    body("users")
        .isArray({ min: 1 })
        .withMessage("Users must be an array of strings")
        .bail()
        .custom((users) => {
            return users.every((user) => typeof user === "string");
        })
        .withMessage("Users must be an array of strings"),
    addUserToProjectController
);

router.get("/get-project/:projectId",
    authUser,
    getProjectByIdController
)

export default router;

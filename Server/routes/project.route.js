import { Router } from "express";
import { body } from "express-validator";
import { createProjectController } from "../controllers/project.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/create-project",
    authUser,
    body("name").isString().withMessage("Name must be a string"),
    createProjectController
);

export default router;

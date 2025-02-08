import { Router } from "express";
import { body } from "express-validator";
import { createProjectController, getAllUserProjectsController } from "../controllers/project.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/create-project",
    authUser,
    body("name").isString().withMessage("Name must be a string"),
    createProjectController
);

router.get("/get-all-userprojects",
    authUser,
    getAllUserProjectsController
)

export default router;

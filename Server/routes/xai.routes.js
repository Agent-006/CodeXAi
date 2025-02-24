import { Router } from "express";
import { getXaiResultController } from "../controllers/xai.controller.js";

const router = Router();

router.get("/", getXaiResultController)

export default router;
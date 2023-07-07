import { Router } from "express";
import { createComment } from "./commentController";

const router = Router();

router.post("/create", createComment);

export default router;

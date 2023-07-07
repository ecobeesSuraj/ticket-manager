import { Router } from "express";
import { createBoard } from "./boardController";

const router = Router();

router.post("/create", createBoard);

export default router;

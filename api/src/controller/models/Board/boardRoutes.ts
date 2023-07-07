import { Router } from "express";
import { boardById, createBoard, updateBoard } from "./boardController";

const router = Router();

router.get("/board/:id", boardById);

router.post("/create", createBoard);

router.patch("/update/:id", updateBoard);

export default router;

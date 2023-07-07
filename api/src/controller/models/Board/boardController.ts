import { RequestHandler } from "express";
import { prisma } from "./../../../utils/prismaHelper";
import { Board } from "@prisma/client";

export const createBoard: RequestHandler = async (req, res) => {
  try {
    const { name, adminId } = req.body;

    const board: Board = await prisma.board.create({
      data: {
        name,
        adminId,
      },
    });

    return res.status(201).json(board);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const boardById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await prisma.board.findUnique({ where: { id } });
    return res.status(200).json(board);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateBoard: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const board: Board = await prisma.board.update({
      where: { id },
      data: {
        name,
      },
    });

    return res.status(201).json(board);
  } catch (error) {
    return res.status(400).json(error);
  }
};

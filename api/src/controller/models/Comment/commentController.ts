import { RequestHandler } from "express";
import { prisma } from "../../../utils/prismaHelper";
import { Comment } from "@prisma/client";

export const createComment: RequestHandler = async (req, res) => {
  try {
    const { comment, userId } = req.body;

    const newComment: Comment = await prisma.comment.create({
      data: {
        comment,
        userId,
      },
    });

    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(400).json(error);
  }
};

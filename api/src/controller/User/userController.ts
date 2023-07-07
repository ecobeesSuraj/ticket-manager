import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { ProjectError } from "../../utils/errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface userData {
  name: string;
  pwd: string;
  email: string;
}

export const home: RequestHandler = async (_req, res) => {
  try {
    const allUsers = res.locals.data;
    res.status(201).json({ allUsers });
  } catch (error) {
    res.status(401).json(
      new ProjectError({
        name: "Request Error",
        message: "You are not logged in",
      })
    );
  }
};

export const register: RequestHandler = async (req, res) => {
  const { name, pwd, email }: userData = req.body;
  const hashedPassword = await bcrypt.hash(pwd, 10);

  const data: userData = {
    name,
    pwd: hashedPassword,
    email,
  };
  try {
    const user = await prisma.user.create({
      data,
    });
    res.status(201).json({ user });
  } catch (error) {
    res.status(401).json(
      new ProjectError({
        name: "Post Error",
        message: "Invalid Request",
      })
    );
  }
};

export const edit: RequestHandler = async (req, res) => {
  const id: string = req.params.id;
  const { email, name }: userData = req.body;
  try {
    const update = await prisma.user.update({
      where: { id },
      data: { email, name },
    });
    res.status(201).json(update);
  } catch (error) {
    res.status(401).json(
      new ProjectError({
        name: "Request Error",
        message: "User does not exist",
      })
    );
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    const comparePassword: boolean = await bcrypt.compare(pwd, user.pwd);
    if (comparePassword) {
      var signedToken = jwt.sign({ user }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });
      res
        .status(201)
        .cookie("jwt", signedToken, {
          httpOnly: true,
          maxAge: 2 * 24 * 60 * 60 * 1000,
        })
        .redirect("/api/home");
    } else {
      throw new Error("Post Error");
    }
  } catch (error) {
    res.status(401).json(
      new ProjectError({
        name: "Post Error",
        message: "Email or Password is invalid",
      })
    );
  }
};

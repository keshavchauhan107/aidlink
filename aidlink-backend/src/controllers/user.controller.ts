import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { createUserSchema } from "../schemas/user.schema";

export const createUser = async (req: Request, res: Response) => {
  const data = createUserSchema.parse(req.body);

  const user = await prisma.user.create({ data });

  res.status(201).json(user);
};

import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { createPostSchema } from "../schemas/post.schema";

/**
 * CREATE POST
 */
export const createPost = async (req: Request, res: Response) => {
  const data = createPostSchema.parse(req.body);

  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      userId: data.userId
    }
  });

  res.status(201).json(post);
};

/**
 * GET ALL POSTS
 */
export const getPosts = async (_req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  res.json(posts);
};

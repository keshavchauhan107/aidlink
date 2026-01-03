import { Router } from "express";
import { createPost, getPosts } from "../controllers/post.controller";

const router = Router();

router.post("/", createPost); // POST /posts
router.get("/", getPosts);    // GET /posts

export default router;

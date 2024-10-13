import express from "express";
import { authMiddleware } from "../middleware/authenticationMiddleware";
import { likeAPost } from "../controllers/LikeController";
const router = express.Router();

router.post("/like/post/:id", authMiddleware, likeAPost);

export default router;

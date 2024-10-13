import express from "express";
import { getAllCommentsOfAPost, getAllPost } from "../controllers/PostController";
const router = express.Router();

router.get("/all", getAllPost);
router.get("/comments/:id",getAllCommentsOfAPost)

export default router;

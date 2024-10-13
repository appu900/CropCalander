import express from "express";
import { getAllCommentsOfAPost, getAllPost, getAPost } from "../controllers/PostController";
const router = express.Router();

router.get("/all", getAllPost);
router.get("/comments/:id",getAllCommentsOfAPost)
router.get("/:id",getAPost)


export default router;

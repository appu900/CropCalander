import express from "express";
import { getAllPost } from "../controllers/PostController";
const router = express.Router();

router.get("/all", getAllPost);

export default router;

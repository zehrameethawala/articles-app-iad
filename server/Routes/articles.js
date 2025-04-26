import express from "express";
import { getArticle, createArticle } from "../Controller/articles.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getArticle);
router.post("/create-article", verifyToken, createArticle);

export default router;
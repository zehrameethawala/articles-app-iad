import express from "express";
import { register, login, updateProfilePicture } from "../Controller/auth.js";
import { verifyToken } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile-picture", verifyToken, upload.single('profilePicture'), updateProfilePicture);

export default router;
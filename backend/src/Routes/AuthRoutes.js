import express from "express";
import { registerUser, loginUser ,updateUserProfile} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", updateUserProfile);

export default router;
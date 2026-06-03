import express from 'express';
import { loginController, registerController, getUserController, updateUserController } from '../controllers/authController.js';
import { googleAuth } from "../controllers/authController.js";
const router = express.Router();
import upload from "../middleware/uploadProfile.js";

router.post('/login', loginController);
router.post('/register', registerController);
router.post("/google", googleAuth);
router.get("/user/:id", getUserController);
router.put(
    "/user/:id",
    upload.single("photo"),
    updateUserController
);

export default router;

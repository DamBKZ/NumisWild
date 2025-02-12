import express from "express";
import { verifyingPassword } from "../middlewares/argon2.middleware";
import { getUserByEmail } from "../middlewares/user.middleware";
import { login } from "../modules/auth/authActions";

const router = express.Router();

router.post("/login", getUserByEmail, verifyingPassword, login);

export default router;

import express from "express";
import { comparePassword } from "../middlewares/argon2.middleware";
import { getUserByEmail } from "../middlewares/user.middleware";
import {
  checkingToken,
  login,
  readRoleWithToken,
  verifyToken,
} from "../modules/auth/authActions";

const router = express.Router();
router.post("/api/auth", getUserByEmail, comparePassword, login);

router.use(verifyToken);
router.get("/admin", readRoleWithToken);
router.get("/authentified", checkingToken);

export default router;

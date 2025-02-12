import express from "express";
import { hashPassword } from "../middlewares/argon2.middleware";
import userActions from "../modules/user/userActions";

const router = express.Router();

router.get("/api/user", userActions.browse);

router.post(
  "/api/user",
  userActions.validateData,
  hashPassword,
  userActions.checkEmail,
  userActions.add,
);

router.get("/api/user/:id", userActions.read);
router.put(
  "/api/user/:id",
  userActions.modifiedData,
  hashPassword,
  userActions.edit,
);

router.get("/api/user/role", userActions.readRoleFromToken);

router.delete("/api/user/:id", userActions.destroy);

export default router;

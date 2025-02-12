import express from "express";
import { hashingPassword } from "../middlewares/argon2.middleware";
import userActions from "../modules/user/userActions";

const router = express.Router();

router.get("/api/user", userActions.browse);
router.post(
  "/api/user",
  userActions.validateData,
  hashingPassword,
  userActions.checkEmail,
  userActions.add,
);

router.get("/api/user", userActions.browse);
router.get("/api/user/:id", userActions.read);
router.put(
  "/api/user/:id",
  userActions.modifiedData,
  hashingPassword,
  userActions.edit,
);

router.delete("/api/user/:id", userActions.destroy);

export default router;

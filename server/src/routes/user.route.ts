import express from "express";
import {
  hashModifiedPassword,
  hashPassword,
} from "../middlewares/argon2.middleware";
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

router.get("/user/:id", userActions.read);
router.put(
  "/user/:id",
  userActions.modifiedData,
  hashPassword,
  userActions.edit,
);

router.get("/role", userActions.readRoleFromToken);

router.delete("/user/:id", userActions.destroy);

router.get("/me", userActions.getCurrentUser);
router.put(
  "/me",
  userActions.modifiedData,
  hashModifiedPassword,
  userActions.edit,
);

export default router;

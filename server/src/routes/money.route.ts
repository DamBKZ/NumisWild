import express from "express";
import { verifyToken } from "../modules/auth/authActions";
import moneyActions from "../modules/money/moneyAction";

const router = express.Router();

router.get("/money", verifyToken, moneyActions.browse);

router.get("/money/:id", verifyToken, moneyActions.read);

router.post("/money", verifyToken, moneyActions.add);

router.put("/money/:id", verifyToken, moneyActions.edit);

router.delete("/money/:id", verifyToken, moneyActions.destroy);

export default router;

import express from "express";
import { verifyToken } from "../modules/auth/authActions";
import moneyActions from "../modules/money/moneyAction";

const router = express.Router();

router.get("/api/money", verifyToken, moneyActions.browse);

router.get("/api/money/:id", verifyToken, moneyActions.read);

router.post("/api/money", verifyToken, moneyActions.add);

router.put("/api/money/:id", verifyToken, moneyActions.edit);

router.delete("/api/money/:id", verifyToken, moneyActions.destroy);

export default router;

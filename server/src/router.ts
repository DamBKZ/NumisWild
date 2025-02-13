import express from "express";

const router = express.Router();

import AuthRoute from "./routes/auth.route";
import moneyRoute from "./routes/money.route";
import UserRoute from "./routes/user.route";

router.use("/", UserRoute);
router.use("/", AuthRoute);
router.use("/", moneyRoute);
export default router;

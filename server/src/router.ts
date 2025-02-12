import express from "express";

const router = express.Router();

import AuthRoute from "./routes/auth.route";
import UserRoute from "./routes/user.route";

router.use("/", AuthRoute);
router.use("/", UserRoute);

export default router;

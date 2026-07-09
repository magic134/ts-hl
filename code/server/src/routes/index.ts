import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import petRouter from "./pet";

const router = Router();
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/pet", petRouter);

export default router;

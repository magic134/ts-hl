import { Router } from "express";
import { AuthService } from "../services/AuthService";
import { success, fail } from "../utils/response";

const router = Router();
const authService = new AuthService();

/**
 * POST /auth/login
 * 登录并返回 JWT + 用户信息
 */
router.post("/login", async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.json(success(result));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

/**
 * POST /auth/register
 * 注册新账号、用户、宠物，并返回 JWT + 用户信息
 */
router.post("/register", async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.json(success(result));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

export default router;

import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { UserRankService } from "../services/UserRankService";
import { AuthService } from "../services/AuthService";
import { success, fail } from "../utils/response";

import { UserLeaderboardService } from "../services/UserLeaderboardService";

const router = Router();
const userRankService = new UserRankService();
const userLeaderboardService = new UserLeaderboardService();
const authService = new AuthService();

/**
 * POST /user/findRank
 * 获取人物排行榜
 */
router.post("/findRank", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const data = await userRankService.findRank(req.body || {});
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

/**
 * POST /user/info
 * 获取单个用户信息
 */
router.post("/info", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const data = await authService.info(req.body || {});
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

/**
 * POST /user/leaderboard
 * 获取 WWW不加密 风格的人物排行榜（红利/功德/幻币）
 */
router.post("/leaderboard", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const { type } = req.body || {};
        const data = await userLeaderboardService.findLeaderboard(type);
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

export default router;

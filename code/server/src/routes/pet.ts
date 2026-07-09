import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { PetRankService } from "../services/PetRankService";
import { success, fail } from "../utils/response";

import { PetLeaderboardService } from "../services/PetLeaderboardService";

const router = Router();
const petRankService = new PetRankService();
const petLeaderboardService = new PetLeaderboardService();

/**
 * POST /pet/findPetRank
 * 获取宠物排行榜
 */
router.post("/findPetRank", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const data = await petRankService.findPetRank(req.body || {});
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

/**
 * POST /pet/leaderboard
 * 获取 WWW不加密 风格的宠物排行榜（所有宠物/不可进化宠）
 */
router.post("/leaderboard", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const { type } = req.body || {};
        const data = await petLeaderboardService.findLeaderboard(type);
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

export default router;

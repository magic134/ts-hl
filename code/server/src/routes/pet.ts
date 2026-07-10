import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { SnapshotPetRankService } from "../services/SnapshotPetRankService";
import { SnapshotPetLeaderboardService } from "../services/SnapshotPetLeaderboardService";
import { success, fail } from "../utils/response";

const router = Router();
const snapshotPetRankService = new SnapshotPetRankService();
const snapshotPetLeaderboardService = new SnapshotPetLeaderboardService();

/**
 * POST /pet/findPetRank
 * 获取宠物排行榜（从快照表读取）
 */
router.post("/findPetRank", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const data = await snapshotPetRankService.findPetRank(req.body || {});
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

/**
 * POST /pet/leaderboard
 * 获取 WWW不加密 风格的宠物排行榜（所有宠物/不可进化宠），从快照表读取
 */
router.post("/leaderboard", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const { type } = req.body || {};
        const data = await snapshotPetLeaderboardService.findLeaderboard(type);
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

export default router;

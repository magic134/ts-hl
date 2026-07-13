import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { UserItemService } from "../services/UserItemService";
import { UserPetService } from "../services/UserPetService";
import { BaoBaoNangService } from "../services/BaoBaoNangService";
import { QianKunDaiService } from "../services/QianKunDaiService";
import { SnapshotUserInfoService } from "../services/SnapshotUserInfoService";
import { SnapshotUserRankService } from "../services/SnapshotUserRankService";
import { SnapshotUserLeaderboardService } from "../services/SnapshotUserLeaderboardService";
import { success, fail } from "../utils/response";

const router = Router();
const snapshotUserRankService = new SnapshotUserRankService();
const snapshotUserInfoService = new SnapshotUserInfoService();
const snapshotUserLeaderboardService = new SnapshotUserLeaderboardService();
const userItemService = new UserItemService();
const userPetService = new UserPetService();
const baoBaoNangService = new BaoBaoNangService();
const qianKunDaiService = new QianKunDaiService();

/**
 * POST /user/findRank
 * 获取人物排行榜（从快照表读取）
 */
router.post("/findRank", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const data = await snapshotUserRankService.findRank(req.body || {});
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

/**
 * POST /user/info
 * 获取单个用户信息（从快照表读取）
 */
router.post("/info", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const { user_id } = req.body || {};
        const data = await snapshotUserInfoService.getInfo(Number(user_id));
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

/**
 * POST /user/leaderboard
 * 获取 WWW不加密 风格的人物排行榜（红利/功德/幻币），从快照表读取
 */
router.post("/leaderboard", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const { type } = req.body || {};
        const data = await snapshotUserLeaderboardService.findLeaderboard(type);
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

/**
 * POST /user/equipment
 * 获取玩家身上穿戴的装备
 */
router.post("/equipment", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const { user_id } = req.body || {};
        const data = await userItemService.findEquippedItems(Number(user_id));
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

/**
 * POST /user/backpack
 * 获取玩家背包物品（排除身上穿戴）
 */
router.post("/backpack", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const { user_id } = req.body || {};
        const data = await userItemService.findBackpackItems(Number(user_id));
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

/**
 * POST /user/pets
 * 获取玩家宠物列表
 */
router.post("/pets", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const { user_id } = req.body || {};
        const data = await userPetService.findPets(Number(user_id));
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

/**
 * POST /user/baobaonang
 * 查询百宝囊内物品
 */
router.post("/baobaonang", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const { item_ids } = req.body || {};
        const data = await baoBaoNangService.getItems(item_ids);
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

/**
 * POST /user/qiankundai
 * 查询乾坤袋内宠物
 */
router.post("/qiankundai", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const { item_ids } = req.body || {};
        const data = await qianKunDaiService.getPets(item_ids);
        res.json(success(data));
    } catch (e: any) {
        res.json(fail(1, e.message));
    }
});

export default router;

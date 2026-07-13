import { TargetDbClient } from "../dbClient/TargetDbClient";
import { DbClient } from "../dbClient/DbClient";
import { UserRankService } from "./UserRankService";
import { UserLeaderboardService } from "./UserLeaderboardService";
import { PetRankService } from "./PetRankService";
import { PetLeaderboardService } from "./PetLeaderboardService";
import { RANK_TYPE_MAP, PET_RANK_FILTERS } from "../config";

interface BulkInsertResult {
    sql: string;
    params: any[];
}

function buildBulkInsertSql(table: string, rows: Record<string, any>[]): BulkInsertResult {
    if (rows.length === 0) {
        return { sql: "", params: [] };
    }
    const keys = Object.keys(rows[0]);
    const placeholders: string[] = [];
    const params: any[] = [];
    for (const row of rows) {
        placeholders.push(`(${keys.map(() => "?").join(", ")})`);
        params.push(...keys.map(key => row[key]));
    }
    const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES ${placeholders.join(", ")}`;
    return { sql, params };
}

/**
 * 数据同步服务
 * 同步客户端需要的快照数据：
 * - 个人信息（完整 yx_user + qq）
 * - 人物通用排行榜（findRank）
 * - 人物红利榜 / 功德榜 / 幻币榜（leaderboard）
 * - 宠物等级排行榜（findPetRank，多组过滤）
 * - 宠物总榜 / 不可进化宠榜（leaderboard）
 */
export class SyncService {
    private userRankService = new UserRankService();
    private userLeaderboardService = new UserLeaderboardService();
    private petRankService = new PetRankService();
    private petLeaderboardService = new PetLeaderboardService();

    /**
     * 同步排行榜快照
     */
    async syncLeaderboards(): Promise<void> {
        const sourceDb = new DbClient();
        await sourceDb.connect();
        const targetDb = new TargetDbClient();
        await targetDb.connect();
        const snapshotTime = Math.floor(Date.now() / 1000);
        try {
            // 1. 人物通用排行榜（findRank）
            await targetDb.query("TRUNCATE TABLE sync_user_rank");
            const userRankRows: Record<string, any>[] = [];
            for (const rankType of Object.keys(RANK_TYPE_MAP)) {
                const mapping = RANK_TYPE_MAP[rankType];
                const rows = await this.userRankService.findRank({ rankType }, sourceDb);
                rows.forEach((r, idx) => {
                    userRankRows.push({
                        rank_type: rankType,
                        rank_type_name: mapping.title,
                        rank: idx + 1,
                        user_id: r.id || 0,
                        name: r.name || "",
                        level: r.level || 0,
                        metempsychosis: r.metempsychosis || 0,
                        additional_point: r.additional_point || 0,
                        degree_lev: r.degree_lev || 0,
                        money: r.money || 0,
                        deed: r.deed || 0,
                        exp_medicine: r.exp_medicine || 0,
                        exp_creative: r.exp_creative || 0,
                        repute: r.repute || 0,
                        exp_smith: r.exp_smith || 0,
                        exp_steal: r.exp_steal || 0,
                        love: r.love || 0,
                        hongli: r.additional_point || 0,
                        toutaishu: r.metempsychosis || 0,
                        qq: r.qq || "",
                        snapshot_time: snapshotTime
                    });
                });
            }
            if (userRankRows.length > 0) {
                const { sql, params } = buildBulkInsertSql("sync_user_rank", userRankRows);
                await targetDb.query(sql, params);
            }

            // 2. 人物红利榜 / 功德榜 / 幻币榜（leaderboard）
            await targetDb.query("TRUNCATE TABLE sync_user_leaderboard");
            const userLeaderboardRows: Record<string, any>[] = [];
            for (const type of ["hongli", "deed", "money"] as const) {
                const rows = await this.userLeaderboardService.findLeaderboard(type, sourceDb);
                rows.forEach(r => {
                    userLeaderboardRows.push({
                        type,
                        rank: r.rank,
                        name: r.name || "",
                        look: r.look || 0,
                        level: r.level || 0,
                        metempsychosis: r.metempsychosis || 0,
                        toutai: r.toutai || 0,
                        degree_lev: r.degree_lev || 0,
                        money: r.money || 0,
                        hongli: r.hongli || 0,
                        deed: r.deed || 0,
                        total_money: r.total_money || 0,
                        snapshot_time: snapshotTime
                    });
                });
            }
            if (userLeaderboardRows.length > 0) {
                const { sql, params } = buildBulkInsertSql("sync_user_leaderboard", userLeaderboardRows);
                await targetDb.query(sql, params);
            }

            // 3. 宠物等级排行榜（findPetRank，多组过滤）
            await targetDb.query("TRUNCATE TABLE sync_pet_rank");
            const petRankRows: Record<string, any>[] = [];
            for (const filter of PET_RANK_FILTERS) {
                const rows = await this.petRankService.findPetRank({
                    catena: filter.catena,
                    isEvolution: filter.isEvolution
                }, sourceDb);
                rows.forEach((r, idx) => {
                    petRankRows.push({
                        filter_catena: filter.catena || "",
                        filter_is_evolution: filter.isEvolution || "",
                        rank: idx + 1,
                        pet_id: r.id || 0,
                        owner_name: r.owner_name || "",
                        pet_origin_name: r.pet_origin_name || "",
                        pet_name: r.pet_name || "",
                        prop: r.prop || "",
                        grow_rate: r.grow_rate || "",
                        grow_point: r.grow_point || 0,
                        level: r.level || 0,
                        attack: r.attack || 0,
                        defence: r.defence || 0,
                        dexterity: r.dexterity || 0,
                        life: r.life || 0,
                        generation: r.generation || 0,
                        medal_attack: r.medal_attack || 0,
                        medal_defence: r.medal_defence || 0,
                        medal_dexterity: r.medal_dexterity || 0,
                        treasure_id: r.treasure_id || 0,
                        pet_treasure: r.pet_treasure || "",
                        snapshot_time: snapshotTime
                    });
                });
            }
            if (petRankRows.length > 0) {
                const { sql, params } = buildBulkInsertSql("sync_pet_rank", petRankRows);
                await targetDb.query(sql, params);
            }

            // 4. 宠物总榜 / 不可进化宠榜（leaderboard）
            await targetDb.query("TRUNCATE TABLE sync_pet_leaderboard");
            const petLeaderboardRows: Record<string, any>[] = [];
            for (const type of ["all", "nonEvolution"] as const) {
                const rows = await this.petLeaderboardService.findLeaderboard(type, sourceDb);
                rows.forEach(r => {
                    petLeaderboardRows.push({
                        type,
                        rank: r.rank,
                        owner_name: r.owner_name || "",
                        pet_name: r.pet_name || "",
                        class: r.class || 0,
                        className: r.className || "",
                        level: r.level || 0,
                        grow: r.grow || 0,
                        generation: r.generation || 0,
                        snapshot_time: snapshotTime
                    });
                });
            }
            if (petLeaderboardRows.length > 0) {
                const { sql, params } = buildBulkInsertSql("sync_pet_leaderboard", petLeaderboardRows);
                await targetDb.query(sql, params);
            }

            console.log(`[SyncService] 排行榜同步完成，写入 ${userRankRows.length + userLeaderboardRows.length + petRankRows.length + petLeaderboardRows.length} 行`);
        } finally {
            await targetDb.close();
            await sourceDb.close();
        }
    }

    /**
     * 同步完整角色信息（含 qq）
     */
    async syncUsers(): Promise<void> {
        const sourceDb = new DbClient();
        await sourceDb.connect();
        let users: any[] = [];
        try {
            users = await sourceDb.query("SELECT * FROM yx_user", []);
        } finally {
            await sourceDb.close();
        }

        const targetDb = new TargetDbClient();
        await targetDb.connect();
        const snapshotTime = Math.floor(Date.now() / 1000);
        try {
            await targetDb.query("DELETE FROM sync_user_full");

            const rows = users.map(u => ({
                ...u,
                snapshot_time: snapshotTime
            }));

            if (rows.length > 0) {
                const { sql, params } = buildBulkInsertSql("sync_user_full", rows);
                await targetDb.query(sql, params);
            }

            console.log(`[SyncService] 角色信息同步完成，写入 ${rows.length} 行`);
        } finally {
            await targetDb.close();
        }
    }
}
